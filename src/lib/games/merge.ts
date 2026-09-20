/**
 * Unified game library aggregator.
 * Combines live sources into a single paginated, sortable response:
 *   - Steam  → real owned games + real playtime (official Web API)
 *   - Epic   → real owned games (unofficial launcher API; no playtime)
 *   - GOG    → curated slug list enriched via RAWG (no public API)
 *   - Fallback → static favorites when no live source is configured/available
 */

import { favoriteGames } from "@/data/games/gamesDataCore"
import { isRawgConfigured, isSteamConfigured, isEpicConfigured, GAMES_CONFIG } from "./config"
import { getSteamOwnedGames } from "./steam"
import { getEpicOwnedGames } from "./epic"
import type { EpicOwnedGame } from "./epic"
import { getRawgGamesBySlugs } from "./rawg"
import type {
  Game,
  LibraryResponse,
  PlatformFilter,
  SortOption,
} from "./types"

const PER_PAGE_DEFAULT = 12

export interface LibraryOptions {
  platform?: PlatformFilter
  sort?: SortOption
  page?: number
  perPage?: number
  /** Case/diacritics-insensitive, tokenized full-text filter over title + genres */
  query?: string
}

function steamToGame(g: {
  appid: number
  name: string
  playtimeMinutes: number
  iconUrl?: string
  headerUrl: string
  hasStats: boolean
}): Game {
  return {
    id: `steam:${g.appid}`,
    title: g.name,
    source: "steam",
    sourceId: String(g.appid),
    coverUrl: g.headerUrl || g.iconUrl,
    genres: [],
    playtimeMinutes: g.playtimeMinutes,
    hasDetails: g.hasStats,
    storeUrl: `https://store.steampowered.com/app/${g.appid}`,
  }
}

function rawgToGame(source: "epic" | "gog", g: {
  slug: string
  name: string
  background_image?: string | null
  rating?: number
  released?: string | null
  genres: { name: string }[]
  achievements_count?: number
  description_raw?: string
}): Game {
  return {
    id: `${source}:${g.slug}`,
    title: g.name,
    source,
    sourceId: g.slug,
    coverUrl: g.background_image ?? undefined,
    genres: g.genres?.map((genre) => genre.name) ?? [],
    rating: g.rating,
    achievementsTotal: g.achievements_count,
    year: g.released ? new Date(g.released).getFullYear() : undefined,
    description: g.description_raw ? `${g.description_raw.slice(0, 220)}…` : undefined,
  }
}

function epicToGame(g: EpicOwnedGame): Game {
  return {
    id: `epic:${g.catalogItemId}`,
    title: g.title,
    source: "epic",
    sourceId: g.catalogItemId,
    coverUrl: g.coverUrl,
    genres: [],
    // Epic exposes no playtime; achievements (GraphQL) not wired yet → no details button.
    storeUrl: `https://store.epicgames.com/p/${g.catalogItemId}`,
  }
}

function fallbackToGame(g: (typeof favoriteGames)[number]): Game {
  const minutes = parseInt(g.hours.replace("+", ""), 10) * 60
  return {
    id: `fallback:${g.id}`,
    title: g.title,
    source: "fallback",
    sourceId: String(g.id),
    coverUrl: g.imageUrl,
    genres: [g.genre],
    rating: g.rating,
    playtimeMinutes: Number.isFinite(minutes) ? minutes : undefined,
    achievementsProgress: g.achievements,
    year: parseInt(g.year, 10) || undefined,
    description: g.description,
  }
}

function sortGames(list: Game[], sort: SortOption): Game[] {
  switch (sort) {
    case "playtime":
      return [...list].sort(
        (a, b) => (b.playtimeMinutes ?? 0) - (a.playtimeMinutes ?? 0)
      )
    case "rating":
      return [...list].sort(
        (a, b) =>
          (b.rating ?? 0) - (a.rating ?? 0) ||
          a.title.localeCompare(b.title)
      )
    case "title":
    default:
      return [...list].sort((a, b) => a.title.localeCompare(b.title))
  }
}

/** Lowercase + strip diacritics so "Pokémon" matches "pokemon". */
function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

/** Remove punctuation/whitespace for "yugioh" → "Yu-Gi-Oh!" style matching. */
function compactForSearch(value: string): string {
  return value.replace(/[^a-z0-9]/g, "")
}

/**
 * Two-tier search:
 *   1. Compact substring — "yugioh" matches "Yu-Gi-Oh!", "pokemon" → "Pokémon"
 *   2. Token AND — every query word must appear in title or genres
 *      (e.g. "monster wilds" needs both words, in any order)
 */
function applySearchFilter(list: Game[], query: string): Game[] {
  const trimmed = query.trim().slice(0, 100)
  if (!trimmed) return list

  const normalized = normalizeForSearch(trimmed)
  const queryCompact = compactForSearch(normalized)
  if (!queryCompact) return list

  const tokens = normalized.split(/\s+/).filter(Boolean)

  return list.filter((g) => {
    const haystackRaw = [g.title, ...g.genres].join(" ")
    const haystack = normalizeForSearch(haystackRaw)
    if (queryCompact.length > 0 && compactForSearch(haystack).includes(queryCompact)) {
      return true
    }
    return tokens.every((token) => haystack.includes(token))
  })
}

export async function getUnifiedLibrary(
  options: LibraryOptions = {}
): Promise<LibraryResponse> {
  const perPage = options.perPage ?? PER_PAGE_DEFAULT
  const page = Math.max(1, options.page ?? 1)
  const platform = options.platform ?? "all"
  const sort = options.sort ?? "playtime"

  const steamConfigured = isSteamConfigured()
  const rawgConfigured = isRawgConfigured()
  const epicConfigured = isEpicConfigured()

  let games: Game[] = []

  // 1. Steam — real library with playtime
  if (steamConfigured) {
    const owned = await getSteamOwnedGames()
    games.push(...owned.map(steamToGame))
  }

  // 2a. Epic — real owned library (unofficial API, no playtime)
  if (epicConfigured) {
    const owned = await getEpicOwnedGames().catch(() => [])
    games.push(...owned.map(epicToGame))
  }

  // 2b. Curated GOG (and Epic list as fallback when Epic isn't live) — via RAWG
  if (rawgConfigured) {
    const gog = await getRawgGamesBySlugs(GAMES_CONFIG.curated.gog)
    games.push(...gog.map((g) => rawgToGame("gog", g)))

    if (!epicConfigured) {
      const epicCurated = await getRawgGamesBySlugs(GAMES_CONFIG.curated.epic)
      games.push(...epicCurated.map((g) => rawgToGame("epic", g)))
    }
  }

  // 3. Fallback — nothing live configured or everything returned empty
  const live = steamConfigured || rawgConfigured || epicConfigured
  const usingFallback = games.length === 0
  if (usingFallback) {
    games = favoriteGames.map(fallbackToGame)
  }

  const sourceCounts = {
    steam: games.filter((g) => g.source === "steam").length,
    epic: games.filter((g) => g.source === "epic").length,
    gog: games.filter((g) => g.source === "gog").length,
  }

  const totals = {
    games: games.length,
    playtimeHours: Math.round(
      games.reduce((acc, g) => acc + (g.playtimeMinutes ?? 0), 0) / 60
    ),
    avgRating: (() => {
      const rated = games.filter((g) => g.rating != null)
      if (rated.length === 0) return null
      const sum = rated.reduce((acc, g) => acc + (g.rating ?? 0), 0)
      return Math.round((sum / rated.length) * 10) / 10
    })(),
  }

  const filtered =
    platform === "all" ? games : games.filter((g) => g.source === platform)
  const searched = applySearchFilter(filtered, options.query ?? "")
  const sorted = sortGames(searched, sort)

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const items = sorted.slice(start, start + perPage)

  return {
    items,
    total,
    page: Math.min(page, totalPages),
    perPage,
    totalPages,
    sourceCounts,
    totals,
    status: {
      live,
      steam: steamConfigured,
      rawg: rawgConfigured,
      epic: epicConfigured,
      usingFallback,
    },
  }
}