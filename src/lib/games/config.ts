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
 *   - RAWG_API_KEY        → https://rawg.io/apidocs (free). Enriches curated games (GOG, etc.).
 *
 * Curated lists contain the RAWG slugs of games you own on stores without a live integration.
 * GOG has no public "my library" API and the account isn't accessible — its list stays empty
 * for now (tab auto-hides).
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
  },
  curated: {
    // ⚠️ CURRENT STATE: Steam + Epic live. GOG empty (account not accessible).
    // Reactivation: add your key to .env (docs/gaming-library-keys.md), then put the
    // RAWG slugs of games you own on GOG here. The GOG tab re-enables automatically.
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

export function isRawgConfigured(): boolean {
  return Boolean(GAMES_CONFIG.rawg.apiKey)
}