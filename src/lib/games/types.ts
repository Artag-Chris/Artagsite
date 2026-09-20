/**
 * Shared types for the unified game library
 * (Steam live + curated Epic/GOG enriched via RAWG).
 */

export type PlatformSource = "steam" | "epic" | "gog"
export type PlatformFilter = "all" | PlatformSource
export type SortOption = "playtime" | "rating" | "title"
export type GameSource = PlatformSource | "fallback"

export interface Game {
  /** Unique across sources: `${source}:${sourceId}` */
  id: string
  title: string
  source: GameSource
  /** Steam appid | RAWG slug | local id */
  sourceId: string
  coverUrl?: string
  genres: string[]
  /** RAWG community rating, 0-5 */
  rating?: number
  playtimeMinutes?: number
  achievementsTotal?: number
  achievementsUnlocked?: number
  /** Completion percentage 0-100 (fallback data) */
  achievementsProgress?: number
  year?: number
  description?: string
  storeUrl?: string
  /** True when Steam profile has public stats → can open achievements modal */
  hasDetails?: boolean
}

export interface SourceCounts {
  steam: number
  epic: number
  gog: number
}

export interface LibraryTotals {
  games: number
  playtimeHours: number
  avgRating: number | null
}

export interface LibraryStatus {
  /** At least one live source (Steam/RAWG) was configured */
  live: boolean
  steam: boolean
  rawg: boolean
  /** Response is backed by the static fallback list */
  usingFallback: boolean
}

export interface LibraryResponse {
  items: Game[]
  total: number
  page: number
  perPage: number
  totalPages: number
  sourceCounts: SourceCounts
  totals: LibraryTotals
  status: LibraryStatus
}

export interface SteamAchievement {
  apiname: string
  name: string
  description?: string
  achieved: boolean
  unlocktime?: number
  icon?: string
  icongray?: string
}

export interface SteamAchievementsResult {
  appId: number
  title: string
  unlocked: number
  total: number
  achievements: SteamAchievement[]
}