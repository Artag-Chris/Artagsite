/**
 * Gaming library configuration.
 *
 * Live sources (optional — each one falls back gracefully when unset):
 *   - STEAM_WEB_API_KEY   → https://steamcommunity.com/dev/apikey (free, 1 click)
 *   - STEAM_ID            → your 64-bit Steam ID. If unset, `vanityUrl` below is resolved automatically.
 *                          (Your profile URL is steamcommunity.com/id/Artag-chris)
 *   - EPIC_REFRESH_TOKEN  → your Epic owned-games library. Unofficial interface (same one the
 *                          community tools Legendary/Heroic/Playnite use). Get the token once:
 *                          `pip install legendary && legendary auth`, then copy `refresh_token`
 *                          from ~/.config/legendary/user.json. See docs/epic-integration.md.
 *   - GOG_REFRESH_TOKEN   → your GOG owned-games library. Unofficial interface (same one GOG
 *                          Galaxy/Heroic/Minigalaxy use). Get the token once: `npm run gog:token`.
 *                          See docs/gog-integration.md.
 *   - RAWG_API_KEY        → https://rawg.io/apidocs (free). Enriches curated games.
 *
 * Curated lists contain the RAWG slugs of games you own on stores without a live integration.
 * They act as a fallback: a curated store's list is only used when that store has no live token
 * configured (Steam, Epic and GOG all have live integrations — the fallback is for future stores).
 * ⚠️ EDIT ME: replace/augment these slugs with YOUR games.
 * Find a slug: search https://rawg.io and copy it from the game URL, e.g. rawg.io/games/hades → "hades".
 */

export const GAMES_CONFIG = {
  rawg: {
    apiKey: process.env.RAWG_API_KEY || "",
    baseUrl: "https://api.rawg.io/api",
  },
  steam: {
    apiKey: process.env.STEAM_WEB_API_KEY || "",
    steamId: process.env.STEAM_ID || "",
    /** Resolved automatically when STEAM_ID is not set (free vanity → 64-bit ID) */
    vanityUrl: "Artag-chris",
    baseUrl: "https://api.steampowered.com",
  },
  epic: {
    refreshToken: process.env.EPIC_REFRESH_TOKEN || "",
    /**
     * Unofficial Epic launcher client (public in every EGS install / Legendary source).
     * Can be overridden via env if Epic rotates them.
     */
    clientId:
      process.env.EPIC_CLIENT_ID || "34a02cf8f4414e29b15921876da36f9a",
    clientSecret:
      process.env.EPIC_CLIENT_SECRET || "daafbccc737745039dffe53d94fc76cf",
    oauthBaseUrl:
      process.env.EPIC_OAUTH_BASE_URL ||
      "https://account-public-service-prod03.ol.epicgames.com",
    libraryBaseUrl:
      process.env.EPIC_LIBRARY_BASE_URL ||
      "https://library-service.live.use1a.on.epicgames.com",
    /** Store metadata (titles, covers, categories) — used to enrich library records. */
    catalogBaseUrl:
      process.env.EPIC_CATALOG_BASE_URL ||
      "https://catalog-public-service-prod06.ol.epicgames.com",
  },
  gog: {
    refreshToken: process.env.GOG_REFRESH_TOKEN || "",
    /**
     * Unofficial GOG Galaxy OAuth client (public in every GOG client / Heroic source).
     * Can be overridden via env if GOG ever rotates them.
     */
    clientId: process.env.GOG_CLIENT_ID || "46899977096215655",
    clientSecret:
      process.env.GOG_CLIENT_SECRET ||
      "9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9",
    authBaseUrl: process.env.GOG_AUTH_BASE_URL || "https://auth.gog.com",
    embedBaseUrl: process.env.GOG_EMBED_BASE_URL || "https://embed.gog.com",
  },
  curated: {
    // ⚠️ CURRENT STATE: Steam + Epic + GOG all live. These lists stay empty and are
    // only used as a fallback for stores with no live token. Reactivation: put the RAWG
    // slugs of games you own on that store here (docs/gaming-library-keys.md); the
    // store's tab re-enables automatically.
    epic: [],
    gog: [],
  },
} as const

export function isSteamConfigured(): boolean {
  return Boolean(GAMES_CONFIG.steam.apiKey)
}

export function isEpicConfigured(): boolean {
  return Boolean(GAMES_CONFIG.epic.refreshToken)
}

export function isGogConfigured(): boolean {
  return Boolean(GAMES_CONFIG.gog.refreshToken)
}

export function isRawgConfigured(): boolean {
  return Boolean(GAMES_CONFIG.rawg.apiKey)
}