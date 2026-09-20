/**
 * Steam Web API client — the only source with REAL user library data
 * (owned games, exact playtime minutes, achievements).
 *
 * Requires: free API key + public profile. Library privacy is respected:
 * private profiles return empty results and the UI falls back gracefully.
 */

import { GAMES_CONFIG, isSteamConfigured } from "./config"
import { withCache } from "./cache"
import type { SteamAchievement, SteamAchievementsResult } from "./types"

interface SteamOwnedGameRaw {
  appid: number
  name: string
  playtime_forever: number
  playtime_2weeks?: number
  img_icon_url?: string
  img_logo_url?: string
  has_community_visible_stats?: boolean
}

export interface SteamOwnedGame {
  appid: number
  name: string
  playtimeMinutes: number
  iconUrl?: string
  headerUrl: string
  hasStats: boolean
}

async function steamGet<T>(path: string): Promise<T | null> {
  if (!isSteamConfigured()) return null
  try {
    const url = `${GAMES_CONFIG.steam.baseUrl}${path}${path.includes("?") ? "&" : "?"}key=${GAMES_CONFIG.steam.apiKey}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch (error) {
    console.warn("[steam] request failed:", path, error)
    return null
  }
}

interface ResolveVanityResponse {
  response: { success: number; steamid?: string; message?: string }
}

/**
 * Resolve the 64-bit Steam ID.
 * Uses STEAM_ID when set, otherwise resolves the vanity URL from config.
 */
export async function resolveSteamId(): Promise<string | null> {
  if (GAMES_CONFIG.steam.steamId) return GAMES_CONFIG.steam.steamId

  const vanity = GAMES_CONFIG.steam.vanityUrl
  if (!vanity) return null

  return withCache(
    `steam:vanity:${vanity}`,
    async () => {
      const data = await steamGet<ResolveVanityResponse>(
        `/ISteamUser/ResolveVanityURL/v1/?vanityurl=${vanity}`
      )
      if (data?.response?.success === 1 && data.response.steamid) {
        return data.response.steamid
      }
      console.warn("[steam] could not resolve vanity URL:", vanity, data?.response?.message)
      return null
    },
    60 * 60 * 1000
  )
}

/**
 * Full owned-game library with playtime. Cached 15 min.
 * Empty result usually means private profile or wrong Steam ID.
 */
export async function getSteamOwnedGames(): Promise<SteamOwnedGame[]> {
  const steamId = await resolveSteamId()
  if (!steamId) return []

  return withCache(`steam:owned:${steamId}`, async () => {
    const data = await steamGet<{ response: { games?: SteamOwnedGameRaw[] } }>(
      `/IPlayerService/GetOwnedGames/v1/?steamid=${steamId}&include_appinfo=true&include_played_free_games=true`
    )
    const games = data?.response?.games ?? []

    return games.map((g) => ({
      appid: g.appid,
      name: g.name,
      playtimeMinutes: g.playtime_forever || 0,
      iconUrl: g.img_icon_url
        ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
        : undefined,
      headerUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
      hasStats: Boolean(g.has_community_visible_stats),
    }))
  }, 15 * 60 * 1000)
}

interface PlayerAchievementsResponse {
  playerstats?: {
    success?: boolean
    achievements?: { apiname: string; achieved: number; unlocktime?: number }[]
  }
}

interface SchemaResponse {
  game?: {
    gameName?: string
    availableGameStats?: {
      achievements?: {
        name: string
        displayName?: string
        description?: string
        icon?: string
        icongray?: string
      }[]
    }
  }
}

/**
 * Real achievements for one Steam game (unlocked count + full list).
 * Cached 30 min; called on-demand (modal open), never for the whole library at once.
 */
export async function getSteamAchievements(appId: number): Promise<SteamAchievementsResult | null> {
  const steamId = await resolveSteamId()
  if (!steamId) return null

  return withCache(
    `steam:achievements:${appId}`,
    async () => {
      const [player, schema] = await Promise.all([
        steamGet<PlayerAchievementsResponse>(
          `/ISteamUserStats/GetPlayerAchievements/v1/?steamid=${steamId}&appid=${appId}`
        ),
        steamGet<SchemaResponse>(
          `/ISteamUserStats/GetSchemaForGame/v2/?appid=${appId}`
        ),
      ])

      const achieved = player?.playerstats?.achievements ?? []
      const schemaItems = schema?.game?.availableGameStats?.achievements ?? []
      const schemaByName = new Map(schemaItems.map((a) => [a.name, a]))

      const unlockedCount = achieved.filter((a) => a.achieved === 1).length
      const total = schemaItems.length > 0 ? schemaItems.length : achieved.length

      const achievements: SteamAchievement[] = achieved.map((a) => {
        const meta = schemaByName.get(a.apiname)
        return {
          apiname: a.apiname,
          name: meta?.displayName || a.apiname,
          description: meta?.description,
          achieved: a.achieved === 1,
          unlocktime: a.unlocktime,
          icon: meta?.icon,
          icongray: meta?.icongray,
        }
      })

      return {
        appId,
        title: schema?.game?.gameName ?? String(appId),
        unlocked: unlockedCount,
        total,
        achievements,
      }
    },
    30 * 60 * 1000
  )
}