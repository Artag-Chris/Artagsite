# Epic Games Integration — Feasibility Study

**Status:** partially implemented (2026-09) — library client `src/lib/games/epic.ts` wired into
the aggregator; **pending**: your `EPIC_REFRESH_TOKEN` to validate live + achievements (GraphQL).
**Verdict:** It *is* possible to show your real Epic library, but **there is no official public API**. The only working path is Epic's **private launcher endpoints** (the same ones the community tools Legendary, Heroic and Playnite use). Unofficial = can break without notice and a minor ToS gray zone, though it's read-only metadata for personal use.

---

## What you get / don't get

| Data | Available? | Source |
|---|---|---|
| Owned game list (entitlements) | ✅ Yes | Private EPIC API |
| Title + cover art + description | ✅ Yes | `library/api/public/items` returns full metadata |
| Achievements (per-user, per game) | ✅ Yes | `launcher.store.epicgames.com/graphql` (`egl_game_achievements_user_query`) |
| Playtime | ❌ **No** | Epic doesn't expose it anywhere (private or public) |
| Library *screenshots* / background art | ⚠️ Partial | Catalog metadata includes key images |

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
pip install legendary
legendary auth          # opens Epic login in browser
legendary auth --status  # after login, shows account_id + token info
# token lives at ~/.config/legendary/user.json  (refresh_token + account_id)
```

Then set in `.env.local` / Vercel:

```
EPIC_REFRESH_TOKEN=...        # from user.json (for now quote it if it has /
EPIC_ACCOUNT_ID=...
```

Our server uses the refresh token to mint a short-lived access token on demand (cached), exactly like `steam.ts` caches Steam responses.

### 2. Fetch the library

```
GET https://library-service.live.use1a.on.epicgames.com/library/api/public/items?includeMetadata=true
Authorization: bearer <access_token>
# paginated via responseMetadata.nextCursor
```

Each record includes `title`, `namespace`, `catalogItemId`, and `offer` metadata with `keyImages` (covers) — enough to build a card without extra calls. Fallback source if this rotates: `GET entitlement-public-service-prod08.ol.epicgames.com/entitlement/api/account/{accountId}/entitlements?start=0&count=1000` (raw entitlements, no metadata → then resolve via `catalog-public-service-prod06.../catalog/api/shared/namespace/{ns}/bulk/items?id=...`).

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
   - `getEpicOwnedGames()` → paginates `library/api/public/items` (cursor) → maps to `Game[]`, games-only, covers picked from preferred keyImage types → cached 24h
2. **`src/lib/games/merge.ts`** — calls `epic.ts` when the token is set; curated Epic list now only used as fallback when Epic isn't live
3. **`src/lib/games/config.ts`** — `epic` section (token + overrideable unofficially-public launcher client + endpoints)
4. **UI labels** — registry-driven: the Epic tab reappears automatically once items are non-empty; status pill distinguishes `steamEpicLiveNote` (Steam + Epic live) from `liveNote` (live + curated GOG) from `steamOnlyNote`
5. **Images** — `**.epicgames.com` whitelisted in `next.config.ts` `images.remotePatterns`

### Integrity rules
- **No playtime** → the playtime stat on Epic cards is hidden (Epic has no public playtime)
- Achievements (GraphQL) are **not wired yet** → Epic cards show no achievements button until then
- UI still says exactly what the data is: *live-synced* vs *curated*

---

## Risks & caveats (be honest with yourself)

- **Unofficial APIs can break without notice** — mitigations: in-memory caching + token failures return empty and the merge layer falls back gracefully. Worst case the Epic tab just hides.
- **ToS gray zone** — it's *your own* library, read-only, no scraping/anonymizing. Legendary/Heroic/Playnite have run this same pattern for 5+ years. Acceptable for a personal site, but it's a judgment call.
- **Token expiry** — refresh tokens last a long time but do eventually expire; re-run `legendary auth` occasionally. Epic rejects it cleanly (no crash, Epic just hides).
- **No playtime** — inherent limitation, not a bug.

---

## Prerequisites / block on

**Unblocked as of 2026-09.** Library client is implemented and merged. The only pending item is
your **`EPIC_REFRESH_TOKEN`** in `.env.local` / Vercel (see `docs/gaming-library-keys.md` section 3)
to validate live — plus the achievements step below as a follow-up.

---

## Remaining work

1. ✅ Provide `EPIC_REFRESH_TOKEN` (`.env.local` + Vercel env) and restart the dev server → validate live Epic library
2. **Achievements GraphQL** (`launcher.store.epicgames.com/graphql`, `egl_game_achievements_user_query`) → reuse `AchievementsExpand` (the achievements route will dispatch by source: Steam `appid` / Epic `namespace`)
3. Test happy path + fallback (kill token → Epic tab hides, nothing breaks)