/**
 * Epic Games Store client — live owned-game library via Epic's private launcher
 * endpoints (unofficial; the same interfaces used by Legendary / Heroic / Playnite).
 *
 * Requires: EPIC_REFRESH_TOKEN. Get one by running `legendary auth` once
 * (https://github.com/legendary-gl/legendary), then copying the `refresh_token`
 * value from ~/.config/legendary/user.json into .env.local.
 *
 * ⚠️ Unofficial APIs can change without notice. Every fetch is wrapped in
 * try/catch and the merge layer falls back to curated/steam-only automatically.
 *
 * Pipeline (two stages):
 *   1. `library-service` → bare records (namespace + catalogItemId + productId +
 *      sandboxName). These records DO NOT carry a playable title — appName is an
 *      internal codename (e.g. "Boga" for Death Stranding, random UUIDs for DLC).
 *   2. `catalog` (store metadata, bearer token auth) → enrich each record with the
 *      real title, key images (cover) and categories. Only items categorized as
 *      `games` are kept; then records are grouped by productId and the best
 *      representative is picked (so Death Stranding OST/artbook/wallpaper/DLC don't
 *      each become a "game" card).
 *
 * Known limitations (Epic-side, not bugs):
 *   - No playtime data is exposed anywhere → Epic cards have no hours stat.
 *   - Achievements exist via a separate GraphQL endpoint (launcher.store.epicgames.com)
 *     — not wired yet. Cards show no achievements button until then.
 *   - Enrichment makes the first cold load slower (~4s for ~400 games with
 *     concurrency); afterwards the aggregate is cached 24h in memory + 15 min via
 *     the API response header.
 */

import { GAMES_CONFIG, isEpicConfigured } from "./config"
import { getCache, setCache, withCache } from "./cache"

const ACCESS_TOKEN_FALLBACK_TTL_MS = 50 * 60 * 1000
const LIBRARY_CACHE_KEY = "epic:owned:v2" // v2 = catalog-enriched pipeline
const CATALOG_CACHE_TTL_MS = 24 * 60 * 60 * 1000
const LIBRARY_CACHE_TTL_MS = 24 * 60 * 60 * 1000
/** Parallel catalog lookups; keeps cold loads fast without hammering the API. */
const ENRICH_CONCURRENCY = 10
const CATALOG_LOCALE = "en-US"
// User locale (from the Epic account's country field) — used only for the catalog
// lookup, which is language-neutral for titles in practice.
const CATALOG_COUNTRY = "CO"

export interface EpicOwnedGame {
  catalogItemId: string
  namespace: string
  appName: string
  title: string
  coverUrl?: string
}

interface EpicTokenResponse {
  access_token?: string
  account_id?: string
  expires_in?: number
  errorCode?: string
  errorMessage?: string
}

/** Record as returned by the library-service endpoint (no playable title inside). */
interface EpicLibraryRecord {
  catalogItemId?: string
  namespace?: string
  appName?: string
  productId?: string
  sandboxName?: string
  recordType?: string
}

/** Item metadata from the store catalog endpoint (title, images, categories). */
interface EpicCatalogItem {
  id?: string
  title?: string
  status?: string
  keyImages?: { type?: string; url?: string }[]
  categories?: { path?: string }[]
}

/** Cover art preference order (first available type wins). */
const PREFERRED_COVER_TYPES = [
  "DieselGameBoxTall",
  "OfferImageWide",
  "DieselStoreFrontWide",
  "TallImage",
  "VaultClosed",
  "DieselGameBox",
]

/**
 * Titles that are content products rather than standalone games. Used only when a
 * product has multiple catalog items, so a lone "Game: Definitive Edition" card is
 * never dropped — only bundled OSTs / art books / wallpapers / beta builds.
 */
const JUNK_TITLE_PATTERN =
  /\b(ost|soundtrack|art ?book|wallpaper|screensaver|avatar|theme|season ?pass|expansion|content|beta|demo|preorder|preload|bonus|dlc)\b/i

async function epicPost<T>(
  url: string,
  data: URLSearchParams,
  headers?: HeadersInit
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    body: data.toString(),
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Epic API error ${res.status}: ${url}`)
  return (await res.json()) as T
}

async function epicGet<T>(url: string, accessToken: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `bearer ${accessToken}` },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Epic API error ${res.status}: ${url}`)
  return (await res.json()) as T
}

/**
 * Short-lived access token, minted from the stored refresh token.
 * Cached below Epic's expiry; returns null when unconfigured/invalid/network error —
 * callers treat null as "no Epic source available".
 */
export async function getEpicAccessToken(): Promise<string | null> {
  if (!isEpicConfigured()) return null

  const cached = getCache<string>("epic:access_token")
  if (cached) return cached

  try {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: GAMES_CONFIG.epic.refreshToken,
      token_type: "eg1",
    })
    const basic = Buffer.from(
      `${GAMES_CONFIG.epic.clientId}:${GAMES_CONFIG.epic.clientSecret}`
    ).toString("base64")

    const data = await epicPost<EpicTokenResponse>(
      `${GAMES_CONFIG.epic.oauthBaseUrl}/account/api/oauth/token`,
      body,
      { Authorization: `Basic ${basic}` }
    )

    if (!data.access_token || data.errorCode) {
      console.warn(
        "[epic] token refresh rejected:",
        data.errorCode ?? "no access_token"
      )
      return null
    }

    // Cache a bit under the server TTL so we refresh before expiry.
    const ttl =
      typeof data.expires_in === "number" && data.expires_in > 0
        ? Math.max(60_000, Math.floor(data.expires_in * 0.8) * 1000)
        : ACCESS_TOKEN_FALLBACK_TTL_MS
    setCache("epic:access_token", data.access_token, ttl)
    if (data.account_id) setCache("epic:account_id", data.account_id, ttl)
    return data.access_token
  } catch (error) {
    console.warn("[epic] access token request failed:", error)
    return null
  }
}

/**
 * Maps a list through an async worker with a bounded concurrency pool.
 * Many small reads (catalog lookups) run a lot faster parallel, but we cap it so
 * Epic doesn't get hammered.
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let nextIndex = 0
  const run = async () => {
    while (nextIndex < items.length) {
      const i = nextIndex++
      results[i] = await worker(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run))
  return results
}

/** Every record of the owned library, paginated over the library-service endpoint. */
async function fetchLibraryRecords(accessToken: string): Promise<EpicLibraryRecord[]> {
  const records: EpicLibraryRecord[] = []
  let cursor: string | undefined

  do {
    const params = new URLSearchParams({ includeMetadata: "true" })
    if (cursor) params.set("cursor", cursor)
    const data = await epicGet<{
      records?: EpicLibraryRecord[]
      responseMetadata?: { nextCursor?: string }
    }>(
      `${GAMES_CONFIG.epic.libraryBaseUrl}/library/api/public/items?${params.toString()}`,
      accessToken
    )

    records.push(...(data.records ?? []))
    cursor = data.responseMetadata?.nextCursor
    // Safety valve against broken pagination loops.
    if (records.length > 5000) break
  } while (cursor)

  return records
}

/**
 * Store metadata for one catalog item (real title, cover, categories).
 * Cached 24h. Returns null on failure — such records get skipped upstream.
 */
async function fetchCatalogItem(
  namespace: string,
  catalogItemId: string,
  accessToken: string
): Promise<EpicCatalogItem | null> {
  const cacheKey = `epic:catalog:${namespace}:${catalogItemId}`
  const cached = getCache<EpicCatalogItem>(cacheKey)
  if (cached) return cached

  try {
    const url = `${GAMES_CONFIG.epic.catalogBaseUrl}/catalog/api/shared/namespace/${namespace}/items/${catalogItemId}?country=${CATALOG_COUNTRY}&locale=${CATALOG_LOCALE}`
    const data = await epicGet<EpicCatalogItem>(url, accessToken)
    setCache(cacheKey, data, CATALOG_CACHE_TTL_MS)
    return data
  } catch (error) {
    console.warn(
      `[epic] catalog lookup failed ${namespace}/${catalogItemId}:`,
      error
    )
    return null
  }
}

/** Only base catalog items categorized as games (drops pure `addons` etc.). */
function isGameItem(catalog: EpicCatalogItem | null): boolean {
  return Boolean(
    catalog?.categories?.some((category) => category.path === "games")
  )
}

function pickCover(catalog: EpicCatalogItem): string | undefined {
  const images = catalog.keyImages ?? []
  for (const type of PREFERRED_COVER_TYPES) {
    const found = images.find((img) => img.type === type && img.url)
    if (found?.url) return found.url
  }
  return images.find((img) => img.url)?.url
}

/** Lowercase + strip diacritics + collapse non-alphanumerics (for matching). */
function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

/**
 * How well a catalog title matches the product's sandboxName (the human-readable
 * product name Epic exposes on the library record, e.g. "Death Stranding").
 * Used to pick the base-game item out of an edition/DLC/OST bundle.
 */
function nameSimilarity(title: string, sandbox: string): number {
  const t = normalizeName(title)
  const s = normalizeName(sandbox)
  if (!t || !s) return 0
  if (t === s) return 3
  if (t.startsWith(s) || s.startsWith(t)) return 2
  const words = new Set(t.split(" "))
  let overlap = 0
  for (const word of s.split(" ")) if (words.has(word)) overlap++
  return overlap / Math.max(new Set(s.split(" ")).size, 1)
}

interface EnrichedRecord {
  record: EpicLibraryRecord
  catalog: EpicCatalogItem | null
}

/**
 * Chooses the single best catalog item to represent a product group (all records
 * sharing a productId). Skips OSTs/art books/wallpapers/betas and prefers the item
 * whose title matches the product name (shortest match wins ties).
 */
function pickRepresentative(group: EnrichedRecord[]): EnrichedRecord | null {
  const clean = group.filter(
    (entry) => entry.catalog && !JUNK_TITLE_PATTERN.test(entry.catalog.title ?? "")
  )
  if (clean.length === 0) return null

  const sandbox = clean[0].record.sandboxName ?? ""
  const sorted = [...clean].sort((a, b) => {
    const aScore = nameSimilarity(a.catalog!.title ?? "", sandbox)
    const bScore = nameSimilarity(b.catalog!.title ?? "", sandbox)
    if (bScore !== aScore) return bScore - aScore
    const aLen = normalizeName(a.catalog!.title ?? "").length
    const bLen = normalizeName(b.catalog!.title ?? "").length
    if (aLen !== bLen) return aLen - bLen
    return (a.catalog!.title ?? "").localeCompare(b.catalog!.title ?? "")
  })
  return sorted[0]
}

function catalogToGame(entry: EnrichedRecord): EpicOwnedGame | null {
  const { record, catalog } = entry
  if (!record.catalogItemId || !record.namespace) return null
  if (!catalog) return null
  return {
    catalogItemId: record.catalogItemId,
    namespace: record.namespace,
    appName: record.appName ?? "",
    title: catalog.title?.trim() || record.sandboxName || record.appName || record.catalogItemId,
    coverUrl: pickCover(catalog),
  }
}

/**
 * Owned games from the account behind the refresh token: library records →
 * catalog enrichment → games-only filter → product-group dedupe.
 * Cached 24h (a library rarely changes). Empty result = unconfigured, invalid
 * token, or network failure → graceful fallback upstream.
 */
export async function getEpicOwnedGames(): Promise<EpicOwnedGame[]> {
  if (!isEpicConfigured()) return []

  const accessToken = await getEpicAccessToken()
  if (!accessToken) return []

  return withCache(LIBRARY_CACHE_KEY, async () => {
    const records = await fetchLibraryRecords(accessToken)

    // Dedupe records before enrichment (paginated payloads can repeat items).
    const unique = new Map<string, EpicLibraryRecord>()
    for (const record of records) {
      if (!record.catalogItemId || !record.namespace) continue
      unique.set(`${record.namespace}/${record.catalogItemId}`, record)
    }

    const enriched = await mapWithConcurrency(
      [...unique.values()],
      ENRICH_CONCURRENCY,
      async (record) => ({
        record,
        catalog: await fetchCatalogItem(
          record.namespace!,
          record.catalogItemId!,
          accessToken
        ),
      })
    )

    // Group by product (all editions/DLC/OST of the same title share a productId).
    const groups = new Map<string, EnrichedRecord[]>()
    for (const entry of enriched) {
      if (!isGameItem(entry.catalog)) continue
      const key =
        entry.record.productId || `${entry.record.namespace}/${entry.record.catalogItemId}`
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(entry)
    }

    const games: EpicOwnedGame[] = []
    for (const group of groups.values()) {
      const representative = pickRepresentative(group)
      const game = representative ? catalogToGame(representative) : null
      if (game) games.push(game)
    }
    return games
  }, LIBRARY_CACHE_TTL_MS)
}