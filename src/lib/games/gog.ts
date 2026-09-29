/**
 * GOG client — live owned-game library via GOG's private storefront endpoints
 * (unofficial; the same interfaces used by GOG Galaxy, Heroic, Minigalaxy and
 * lgogdownloader for ~10 years).
 *
 * Requires: GOG_REFRESH_TOKEN. Get one once with `npm run gog:token`, then paste
 * the printed value into .env.local. See docs/gog-integration.md.
 *
 * ⚠️ Unofficial APIs can change without notice. Every fetch is wrapped in
 * try/catch and the merge layer falls back to curated/steam-only automatically.
 *
 * Pipeline (single stage):
 *   `embed.gog.com/account/getFilteredProducts?mediaType=1` → the owned library,
 *   paginated, with id, title, slug, cover image and category.
 *
 * Known limitations (GOG-side, not bugs):
 *   - No playtime and no achievements through this endpoint → GOG cards have no
 *     hours stat and no achievements button.
 *   - The `rating` field uses an undocumented scale, so it's omitted rather than
 *     corrupting the library-wide average.
 */

import { GAMES_CONFIG, isGogConfigured } from "./config"
import { getCache, setCache, withCache } from "./cache"

const ACCESS_TOKEN_FALLBACK_TTL_MS = 50 * 60 * 1000
const LIBRARY_CACHE_KEY = "gog:owned:v1"
const LIBRARY_CACHE_TTL_MS = 24 * 60 * 60 * 1000
/** Safety valve against broken pagination loops. */
const MAX_PAGES = 50

export interface GogOwnedGame {
  id: string
  title: string
  slug?: string
  coverUrl?: string
  /** GOG's single category string (e.g. "Action") — treated as a searchable genre. */
  genres: string[]
  storeUrl?: string
}

interface GogTokenResponse {
  access_token?: string
  refresh_token?: string
  expires_in?: number
  user_id?: string
  error?: string
  error_description?: string
}

interface GogProduct {
  id?: number | string
  title?: string
  slug?: string
  image?: string
  url?: string
  category?: string
  isGame?: boolean
  isMovie?: boolean
  isComingSoon?: boolean
}

interface GogProductsResponse {
  page?: number
  totalPages?: number
  products?: GogProduct[]
}

/**
 * Short-lived access token, minted from the stored refresh token.
 * Cached below GOG's expiry; returns null when unconfigured/invalid/network error —
 * callers treat null as "no GOG source available".
 */
export async function getGogAccessToken(): Promise<string | null> {
  if (!isGogConfigured()) return null

  const cached = getCache<string>("gog:access_token")
  if (cached) return cached

  try {
    // GOG may hand back a rotated refresh token; prefer the freshest one in memory.
    const refreshToken =
      getCache<string>("gog:refresh_token") ?? GAMES_CONFIG.gog.refreshToken

    const params = new URLSearchParams({
      client_id: GAMES_CONFIG.gog.clientId,
      client_secret: GAMES_CONFIG.gog.clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    })

    const res = await fetch(
      `${GAMES_CONFIG.gog.authBaseUrl}/token?${params.toString()}`,
      { cache: "no-store" }
    )
    if (!res.ok) throw new Error(`GOG auth error ${res.status}`)

    const data = (await res.json()) as GogTokenResponse
    if (!data.access_token || data.error) {
      console.warn("[gog] token refresh rejected:", data.error ?? "no access_token")
      return null
    }

    // Cache a bit under the server TTL so we refresh before expiry.
    const ttl =
      typeof data.expires_in === "number" && data.expires_in > 0
        ? Math.max(60_000, Math.floor(data.expires_in * 0.8) * 1000)
        : ACCESS_TOKEN_FALLBACK_TTL_MS
    setCache("gog:access_token", data.access_token, ttl)

    if (data.refresh_token && data.refresh_token !== refreshToken) {
      setCache("gog:refresh_token", data.refresh_token, 30 * 24 * 60 * 60 * 1000)
    }

    return data.access_token
  } catch (error) {
    console.warn("[gog] access token request failed:", error)
    return null
  }
}

/** One page of the owned library. */
async function fetchLibraryPage(
  accessToken: string,
  page: number
): Promise<GogProductsResponse> {
  const params = new URLSearchParams({ mediaType: "1", page: String(page) })
  const res = await fetch(
    `${GAMES_CONFIG.gog.embedBaseUrl}/account/getFilteredProducts?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  )
  if (!res.ok) throw new Error(`GOG API error ${res.status}: page ${page}`)
  return (await res.json()) as GogProductsResponse
}

/**
 * GOG returns protocol-relative cover hashes (`//images-2.gog-statics.com/<hash>`).
 * The image service needs a format suffix — the bare hash 404s. `<hash>.jpg` is the
 * wide product banner (1600×740), which matches the card cover aspect (~2.2:1).
 */
function normalizeCover(image?: string): string | undefined {
  if (!image) return undefined
  const withProtocol = image.startsWith("//")
    ? `https:${image}`
    : image.startsWith("http")
      ? image
      : `https://${image}`
  return /\.(jpe?g|png|webp|avif)$/i.test(withProtocol)
    ? withProtocol
    : `${withProtocol}.jpg`
}

/**
 * Owned games from the account behind the refresh token.
 * Cached 24h (a library rarely changes). Empty result = unconfigured, invalid
 * token, or network failure → graceful fallback upstream.
 */
export async function getGogOwnedGames(): Promise<GogOwnedGame[]> {
  if (!isGogConfigured()) return []

  const accessToken = await getGogAccessToken()
  if (!accessToken) return []

  return withCache(
    LIBRARY_CACHE_KEY,
    async () => {
      const first = await fetchLibraryPage(accessToken, 1)
      const totalPages = Math.min(Math.max(1, first.totalPages ?? 1), MAX_PAGES)

      // With 100 products per page most libraries fit in one request; the rest
      // are fetched in parallel (bounded by MAX_PAGES).
      const rest =
        totalPages > 1
          ? await Promise.all(
              Array.from({ length: totalPages - 1 }, (_, i) =>
                fetchLibraryPage(accessToken, i + 2).catch((error) => {
                  console.warn(`[gog] library page ${i + 2} failed:`, error)
                  return { products: [] } as GogProductsResponse
                })
              )
            )
          : []

      const products: GogProduct[] = [
        ...(first.products ?? []),
        ...rest.flatMap((page) => page.products ?? []),
      ]

      const games: GogOwnedGame[] = []
      const seen = new Set<string>()

      for (const product of products) {
        // Older payloads may omit isGame/isMovie; only drop explicit non-games.
        if (product.isMovie || product.isGame === false) continue

        const id = product.id != null ? String(product.id) : undefined
        if (!id || seen.has(id)) continue
        seen.add(id)

        games.push({
          id,
          title: (product.title ?? "").trim() || id,
          slug: product.slug,
          coverUrl: normalizeCover(product.image),
          genres: product.category ? [product.category] : [],
          storeUrl: product.slug
            ? `https://www.gog.com/game/${product.slug}`
            : undefined,
        })
      }

      return games
    },
    LIBRARY_CACHE_TTL_MS
  )
}
