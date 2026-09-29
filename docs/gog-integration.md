# GOG Integration — Feasibility Study

**Status:** ✅ **implemented** — the library client in `src/lib/games/gog.ts` is wired into the
aggregator and the platform registry. It needs a `GOG_REFRESH_TOKEN` to go live; without it the
GOG tab stays hidden and nothing breaks. **Pending:** a real-account validation pass + screenshot.
**Verdict:** It *is* possible to show your real GOG library, but **there is no official public API**.
The only working path is GOG's **private storefront/Galaxy endpoints** (the same ones GOG Galaxy,
Heroic, Minigalaxy and lgogdownloader have used for ~10 years). Unofficial = can break without
notice and a minor ToS gray zone, though it's read-only metadata for personal use.

---

## What you get / don't get

| Data | Available? | Source |
|---|---|---|
| Owned game list | ✅ Yes | `embed.gog.com/account/getFilteredProducts?mediaType=1` |
| Title + cover art | ✅ Yes | Same endpoint (`title`, `image`) |
| Slug + store page link | ✅ Yes | Same endpoint (`slug` → `gog.com/game/<slug>`) |
| Category (genre-ish) | ✅ Yes | Same endpoint (`category`) |
| Platform availability | ✅ Yes | Same endpoint (`worksOn`) — not surfaced on cards yet |
| Playtime | ❌ **No** | Not on the storefront endpoint (only the Galaxy `galaxy-library` API, undocumented/fragile) |
| Achievements | ❌ **No** | GOG exposes none for third parties |
| Rating | ⚠️ **Omitted** | The endpoint's `rating` uses an undocumented scale, so it's skipped rather than corrupting the library-wide average |

> You get a **live GOG library with titles, covers and store links**. The missing playtime is the
> same honest handling we already do for Epic — GOG cards simply show no hours stat.

---

## How it works (verified against multiple open-source clients)

### 1. Auth — one-time

GOG's auth server speaks OAuth2 with an effectively **public** client (the "GOG Galaxy" app):

```
client_id:     46899977096215655
client_secret: 9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9
redirect_uri:  https://embed.gog.com/on_login_success?origin=client   (must match exactly)
```

The easiest way to obtain a refresh token is the bundled helper:

```bash
npm run gog:token
# → prints the GOG login URL and opens the browser
# → after login GOG redirects to embed.gog.com; paste that redirect URL back
# → it extracts the `code`, exchanges it and prints:  GOG_REFRESH_TOKEN=...
```

> **Why paste the URL instead of a localhost callback?** GOG validates `redirect_uri`
> against its registered list and rejects `http://localhost:...` with
> `redirect_uri_mismatch`. Only the registered `embed.gog.com` URI is accepted, so the
> code has to be read from the address bar after the redirect (the same manual fallback
> Heroic / gog-cli document).

Set in `.env.local` / Vercel:

```
GOG_REFRESH_TOKEN=...   # long-lived credential — treat it like a password
```

Our server mints a short-lived access token from the refresh token on demand (cached to ~80% of
its TTL), exactly like `epic.ts`.

> **Token exchange uses GET with query params**, not a POST body — non-standard OAuth, but it's
> what GOG expects (confirmed by Heroic / Minigalaxy / lgogdownloader).

### 2. Fetch the library (single stage)

```
GET https://embed.gog.com/account/getFilteredProducts?mediaType=1&page=1
Authorization: Bearer <access_token>
# → { productsPerPage: 100, totalPages, products: [{ id, title, slug, image, category, url, worksOn }] }
```

The pipeline in `gog.ts`:

1. Fetch page 1 to learn `totalPages`
2. Fetch the remaining pages in parallel (bounded by a `MAX_PAGES` safety valve)
3. Drop movies / non-games, dedupe by product id
4. Normalize covers (GOG returns protocol-relative `//images-N.gog.com/<hash>`)
5. Whole result is cached 24h (in-memory) + 15 min via the API response header

### 3. Useful extras (not wired)

| Endpoint | Host | Purpose |
|---|---|---|
| `GET /userData.json` | `embed.gog.com` | `userId`, `username`, `avatar` → used once to link the profile button (`gog.com/u/<username>`) |
| `GET /user/data/games` | `embed.gog.com` | Bare owned product ids (no metadata) |
| `GET /products/{id}?expand=...` | `api.gog.com` | Product detail / download metadata |
| `GET /v1/{userId}/owned` | `galaxy-library.gog.com` | Galaxy library **with playtime** — undocumented and fragile |

All endpoints above are unofficial/reverse-engineered. Reference-checked 2026-09 against
[gog-cli's API notes](https://github.com/aleksandarristic/gog-cli/blob/main/docs/gog-api-notes.md)
and [the community GOG-API docs](https://gogapidocs.readthedocs.io/en/latest/auth.html).

---

## How it plugs into the current architecture (done)

Built with the platform registry (`src/lib/games/platforms.ts`) as designed:

1. **`src/lib/games/gog.ts`** — client mirroring `epic.ts`:
   - `getGogAccessToken()` mints short-lived access tokens from `GOG_REFRESH_TOKEN` (cached under GOG's TTL)
   - `getGogOwnedGames()` → paginates `getFilteredProducts` → dedupes → cached 24h
2. **`src/lib/games/merge.ts`** — calls `gog.ts` when the token is set; the curated GOG list is now only a fallback when GOG isn't live
3. **`src/lib/games/config.ts`** — `gog` section (token + overrideable public Galaxy client + endpoints)
4. **UI labels** — registry-driven: the GOG tab reappears automatically once items are non-empty; the status pill uses `liveNote` for any live non-Steam store
5. **Images** — `**.gog.com` and `**.gog-statics.com` whitelisted in `next.config.ts` `images.remotePatterns`

### Integrity rules
- **No playtime** → GOG cards show no hours stat
- **No achievements** → GOG cards show no achievements button
- **No rating** → omitted (undocumented scale) so `avgRating` stays honest
- UI still says exactly what the data is: *live-synced* vs *curated*

---

## Risks & caveats (be honest with yourself)

- **Unofficial APIs can break without notice** — mitigations: in-memory caching + token failures return empty and the merge layer falls back gracefully. Worst case the GOG tab just hides.
- **ToS gray zone** — it's *your own* library, read-only. Heroic/Minigalaxy/GOG Galaxy have run this same pattern for years. Acceptable for a personal site, but it's a judgment call.
- **Token refresh tokens** — GOG may return a rotated refresh token; we keep the freshest one in memory for the process. If GOG ever invalidates the stored one, re-run `npm run gog:token`.
- **Missing playtime / rating** — inherent limitations, not bugs.

---

## Remaining work

1. **Provide `GOG_REFRESH_TOKEN`** (`.env.local` + Vercel env) → live library validates: `status.gog: true`, GOG tab auto-shows
2. ✅ **GOG profile linked** — `https://www.gog.com/u/Artag_Chris`, resolved once via `userData.json`. `GamePlatformsSection` now also shows live owned-game counts pulled from `/api/games`
3. Optional: surface `worksOn` (Windows/Mac/Linux) on GOG cards
4. Test happy path + fallback (kill the token → GOG tab hides, nothing breaks)
