# Epic Games Integration — Feasibility Study

**Status:** ✅ **live & validated (2026-09-20)** — the library client in `src/lib/games/epic.ts`
is wired into the aggregator and confirmed against a real account (401 raw entitlements →
351 real owned games after catalog enrichment + product dedupe). **Pending:** achievements
(GraphQL), which is the last Epic feature left.
**Verdict:** It *is* possible to show your real Epic library, but **there is no official public API**. The only working path is Epic's **private launcher endpoints** (the same ones the community tools Legendary, Heroic and Playnite use). Unofficial = can break without notice and a minor ToS gray zone, though it's read-only metadata for personal use.

---

## What you get / don't get

| Data | Available? | Source |
|---|---|---|
| Owned game list (entitlements) | ✅ Yes | Private EPIC API |
| Title + cover art | ✅ Yes | Catalog API (store metadata, bearer auth) |
| Game-vs-DLC classification | ✅ Yes | Catalog `categories` (`games` vs `addons`/`digitalextras`) |
| Achievements (per-user, per game) | ✅ Yes | `launcher.store.epicgames.com/graphql` (`egl_game_achievements_user_query`) — not wired yet |
| Playtime | ❌ **No** | Epic doesn't expose it anywhere (private or public) |
| Store page link | ❌ **No (for now)** | Product pages need a `productSlug` that the catalog-item endpoint doesn't expose; a storeUrl we can't build right would be a broken link |

> This is better than expected: you get a **live Epic library *with* achievements**. The only thing missing is playtime (Epic simply doesn't track it publicly), so Epic cards would show ~0h and hide the hours stat — same honest handling we already do for the "curated" rows.

---

## How it works (verified against Legendary v0.20.38 source)

### 1. Auth — one-time

Epic's OAuth endpoint issues a **refresh token** that we store in env vars:

```
POST https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token
Basic auth: client_id=34a02cf8f4414e29b15921876da36f9a  (the official launcher
             client id, public in every EGS install)
grant_type=exchange_code | refresh_token | authorization_code
token_type=eg1
```

The easiest way to obtain a refresh token is to run the open-source CLI **Legendary** once on your PC:

```bash
pip install legendary-gl       # or grab the standalone legendary.exe from GitHub releases
legendary auth                 # opens Epic login in browser
legendary status               # after login, shows authenticated account
# token lives at ~/.config/legendary/user.json  (refresh_token + account_id)
```

Set in `.env.local` / Vercel:

```
EPIC_REFRESH_TOKEN=...        # from user.json (it's a year-long credential — treat it like a password;
                              # expires ~2027-09, then re-run `legendary auth`)
```

Our server uses the refresh token to mint a short-lived access token on demand (cached), exactly like `steam.ts` caches Steam responses.

### 2. Fetch the library (two stages — verified live)

```
# Stage 1 — bare entitlement records (NO playable title inside!)
GET https://library-service.live.use1a.on.epicgames.com/library/api/public/items
Authorization: bearer <access_token>
# paginated via responseMetadata.nextCursor

# Each record carries only: namespace, catalogItemId, productId, sandboxName
# (human product name), appName (internal codename — "Boga" for Death Stranding,
# UUIDs for DLC). There is no `offer`/`metadata` payload with a title anymore.

# Stage 2 — enrich each record with store metadata (real title, cover, categories)
GET https://catalog-public-service-prod06.ol.epicgames.com/catalog/api/shared/namespace/{ns}/items/{catalogItemId}?country=CO&locale=en-US
Authorization: bearer <access_token>
# returns title, keyImages (DieselGameBoxTall = cover), categories incl. "games"
```

The pipeline in `epic.ts`:
1. Paginate all records, dedupe by `namespace/catalogItemId`
2. Enrich concurrently (pool of 10, ~4s for 400 items) via the catalog endpoint
3. Keep only items with a `games` category (drops `addons`, `digitalextras`, etc.)
4. Group the survivors by `productId` and pick the best representative — skips
   bundled OSTs / art books / wallpapers / beta builds and collapses multi-item
   products (Death Stranding's 5 entitlements → 1 card)
5. Whole result is cached 24h (in-memory) + 15 min via the API response header

Fallback source if this rotates: `GET entitlement-public-service-prod08.ol.epicgames.com/entitlement/api/account/{accountId}/entitlements?start=0&count=1000` (raw entitlements, no metadata → then resolve via the catalog endpoint above).

### 3. Achievements (optional)

```
POST https://launcher.store.epicgames.com/graphql
User-Agent: EpicGamesLauncher/...
query: egl_game_achievements_user_query (sandboxId + epicAccountId + locale)
```

This is the same GraphQL the Epic overlay uses — returns the player's achieved/unachieved list with unlock timestamps, so it could slot straight into our `AchievementsExpand` accordion.

All upstream endpoints above are reference-checked 2026-09 from
[`legendary/api/egs.py`](https://github.com/legendary-gl/legendary/blob/master/legendary/api/egs.py).
Unofficial endpoints rotate — any of the hostnames/numerations can change without warning.

---

## How it plugs into the current architecture (done)

Built with the platform registry (`src/lib/games/platforms.ts`) as designed:

1. **`src/lib/games/epic.ts`** — client mirroring `steam.ts`:
   - `getEpicAccessToken()` mints short-lived access tokens from `EPIC_REFRESH_TOKEN` (cached under Epic's TTL)
   - `getEpicOwnedGames()` → paginates `library/api/public/items` (cursor) → enriches each item via the catalog endpoint (title/cover/categories, ~4s for 400 games with a pool of 10) → games-only filter → dedupes by `productId` picking the base-game card → cached 24h
2. **`src/lib/games/merge.ts`** — calls `epic.ts` when the token is set; curated Epic list now only used as fallback when Epic isn't live
3. **`src/lib/games/config.ts`** — `epic` section (token + overrideable unofficially-public launcher client + endpoints)
4. **UI labels** — registry-driven: the Epic tab reappears automatically once items are non-empty; status pill distinguishes `steamEpicLiveNote` (Steam + Epic live) from `liveNote` (live + curated GOG) from `steamOnlyNote`
5. **Images** — `**.epicgames.com` whitelisted in `next.config.ts` `images.remotePatterns`

### Integrity rules
- **No playtime** → the playtime stat on Epic cards is hidden (Epic has no public playtime)
- Achievements (GraphQL) are **not wired yet** → Epic cards show no achievements button until then
- **No store link** → Epic product pages need a slug the catalog API doesn't give us; emitting a broken link would be worse than none
- UI still says exactly what the data is: *live-synced* vs *curated*

---

## Risks & caveats (be honest with yourself)

- **Unofficial APIs can break without notice** — mitigations: in-memory caching + token failures return empty and the merge layer falls back gracefully. Worst case the Epic tab just hides.
- **ToS gray zone** — it's *your own* library, read-only, no scraping/anonymizing. Legendary/Heroic/Playnite have run this same pattern for 5+ years. Acceptable for a personal site, but it's a judgment call.
- **Token expiry** — refresh tokens last a long time but do eventually expire; re-run `legendary auth` occasionally. Epic rejects it cleanly (no crash, Epic just hides).
- **No playtime** — inherent limitation, not a bug.

---

## Prerequisites / block on

**All unblocked.** `EPIC_REFRESH_TOKEN` is set in `.env.local` and the live library is
**validated** (see below). Remaining work is the optional achievements step.

---

## Remaining work

1. ✅ `EPIC_REFRESH_TOKEN` provided (`.env.local` + Vercel env) → live library validated
   **Live validation summary (2026-09-20):** 401 raw entitlements → 351 real game cards,
   real titles ("Death Stranding", "Fallout: New Vegas", "Apex Legends™", …), DLC/OST/artbook
   duplicates collapsed, covers served from Epic CDNs. `status.epic: true`, Epic tab auto-shows.
   First cold load ~6s (enrichment); afterwards cached 24h.
2. **Achievements GraphQL** (`launcher.store.epicgames.com/graphql`, `egl_game_achievements_user_query`) → reuse `AchievementsExpand` (the achievements route will dispatch by source: Steam `appid` / Epic `namespace`)
3. Test happy path + fallback (kill token → Epic tab hides, nothing breaks)