/**
 * Gaming library configuration.
 *
 * Live sources (optional — each one falls back gracefully when unset):
 *   - RAWG_API_KEY        → https://rawg.io/apidocs (free)
 *   - STEAM_WEB_API_KEY   → https://steamcommunity.com/dev/apikey (free, 1 click)
 *   - STEAM_ID            → your 64-bit Steam ID. If unset, `vanityUrl` below is resolved automatically.
 *                          (Your profile URL is steamcommunity.com/id/Artag-chris)
 *
 * Curated lists (Epic / GOG) contain the RAWG slugs of games you own on those stores.
 * Epic and GOG don't expose a public "my library" API, so this list is maintained by hand.
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
  curated: {
    // ⚠️ CURRENT STATE: Steam-only.
    // Epic/GOG are empty until account access is recovered (RAWG key + owned-game slugs).
    // Reactivation: add your keys to .env (docs/gaming-library-keys.md), then put the
    // RAWG slugs of games you own on each store here. The UI re-enables Epic/GOG tabs automatically.
    epic: [],
    gog: [],
  },
} as const

export function isSteamConfigured(): boolean {
  return Boolean(GAMES_CONFIG.steam.apiKey)
}

export function isRawgConfigured(): boolean {
  return Boolean(GAMES_CONFIG.rawg.apiKey)
}