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
 * Known limitations (Epic-side, not bugs):
 *   - No playtime data is exposed anywhere → Epic cards have no hours stat.
 *   - Achievements exist via a separate GraphQL endpoint (launcher.store.epicgames.com)
 *     — not wired yet. Cards show no achievements button until then.
 */

import { GAMES_CONFIG, isEpicConfigured } from "./config"
import { getCache, setCache, withCache } from "./cache"

const ACCESS_TOKEN_FALLBACK_TTL_MS = 50 * 60 * 1000

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

interface EpicLibraryRecord {
  catalogItemId?: string
  namespace?: string
  appName?: string
  offer?: {
    title?: string
    categories?: { path?: string }[]
    keyImages?: { type?: string; url?: string }[]
  }
  metadata?: {
    categories?: { path?: string }[]
    keyImages?: { type?: string; url?: string }[]
  }
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

function pickCover(record: EpicLibraryRecord): string | undefined {
  const images = [
    ...(record.offer?.keyImages ?? []),
    ...(record.metadata?.keyImages ?? []),
  ]
  for (const type of PREFERRED_COVER_TYPES) {
    const found = images.find((img) => img.type === type && img.url)
    if (found?.url) return found.url
  }
  return images.find((img) => img.url)?.url
}

/** Keep base games; skip DLC extras and non-game apps (launchers/software). */
function isGameRecord(record: EpicLibraryRecord): boolean {
  const categories = [
    ...(record.offer?.categories ?? []),
    ...(record.metadata?.categories ?? []),
  ]
    .map((c) => c.path ?? "")
    .filter(Boolean)
  if (categories.length === 0) return true
  return categories.some((path) => path === "games" || path.startsWith("games/"))
}

function mapRecord(record: EpicLibraryRecord): EpicOwnedGame | null {
  if (!record.catalogItemId || !record.namespace) return null
  return {
    catalogItemId: record.catalogItemId,
    namespace: record.namespace,
    appName: record.appName ?? "",
    title: record.offer?.title?.trim() || record.appName || record.catalogItemId,
    coverUrl: pickCover(record),
  }
}

/**
 * Owned games from the account behind the refresh token, paginated over the
 * library-service endpoint. Cached 24h (a library rarely changes). Empty result
 * = unconfigured, invalid token, or network failure → graceful fallback upstream.
 */
export async function getEpicOwnedGames(): Promise<EpicOwnedGame[]> {
  if (!isEpicConfigured()) return []

  const accessToken = await getEpicAccessToken()
  if (!accessToken) return []

  return withCache("epic:owned", async () => {
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
      .filter(isGameRecord)
      .map(mapRecord)
      .filter((g): g is EpicOwnedGame => g !== null)
  }, 24 * 60 * 60 * 1000)
}