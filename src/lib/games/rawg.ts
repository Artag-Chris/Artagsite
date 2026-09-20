/**
 * RAWG client — game database enrichment (covers, genres, rating, achievements count).
 * Used only for curated Epic/GOG lists, keeping API usage small (160 req/min free tier).
 */

import { GAMES_CONFIG, isRawgConfigured } from "./config"
import { withCache } from "./cache"

export interface RawgGame {
  id: number
  slug: string
  name: string
  background_image?: string | null
  rating?: number
  metacritic?: number | null
  released?: string | null
  genres: { name: string }[]
  platforms: { platform: { name: string } }[]
  stores: { store: { slug: string } }[]
  achievements_count?: number
  playtime?: number
  description_raw?: string
}

async function rawgGet<T>(path: string): Promise<T | null> {
  if (!isRawgConfigured()) return null
  try {
    const url = `${GAMES_CONFIG.rawg.baseUrl}${path}${path.includes("?") ? "&" : "?"}key=${GAMES_CONFIG.rawg.apiKey}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch (error) {
    console.warn("[rawg] request failed:", path, error)
    return null
  }
}

/** Single game by RAWG slug. Cached 60 min (metadata rarely changes). */
export async function getRawgGameBySlug(slug: string): Promise<RawgGame | null> {
  const clean = slug.trim().toLowerCase()
  if (!clean || clean.includes("/")) return null
  return withCache(`rawg:game:${clean}`, () => rawgGet<RawgGame>(`/games/${clean}`), 60 * 60 * 1000)
}

/** Fetch several slugs in parallel (deduped by cache). Returns only successful lookups. */
export async function getRawgGamesBySlugs(slugs: readonly string[]): Promise<RawgGame[]> {
  const unique = [...new Set(slugs.map((s) => s.trim().toLowerCase()).filter(Boolean))]
  const results = await Promise.all(unique.map((slug) => getRawgGameBySlug(slug)))
  return results.filter((game): game is RawgGame => Boolean(game))
}