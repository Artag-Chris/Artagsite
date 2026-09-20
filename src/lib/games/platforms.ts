import type { PlatformSource } from "./types"

/**
 * PLATFORM REGISTRY — single source of truth for which stores exist.
 *
 * Adding a new store (e.g. PlayStation, Xbox) is a 3-step change:
 *   1. Add the id to the `PlatformSource` union in `types.ts`
 *   2. Add a client fetcher in `src/lib/games/` (like `steam.ts`) and wire it in `merge.ts`
 *   3. Add a label here + to `games.platforms` in both i18n dictionaries
 *
 * Label keys resolve under `games.platforms` (e.g. `platforms.steam`).
 */
export const PLATFORM_LABEL_KEYS: Record<PlatformSource, string> = {
  steam: "platforms.steam",
  epic: "platforms.epic",
  gog: "platforms.gog",
}

/** Tab order in the library (used by LibraryTabs + API route validation). */
export const PLATFORM_ORDER: PlatformSource[] = ["steam", "epic", "gog"]