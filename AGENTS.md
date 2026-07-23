# AGENTS.md

This file provides guidance to AI agents working with code in this repository.

## Build & Development

```bash
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build — production bundle
npm run start    # next start — serve the build
npm run lint     # next lint (ESLint v9). NOTE: disabled in builds via next.config.ts
```

**No test runner configured** — `package.json` has no `test` script and no test files exist. Don't claim to "run the tests" unless one is added first.

### Build Quirks

- `npm run build` can hang indefinitely if `.next` cache is deleted and no previous cache exists
- Fix: kill stuck node processes, then rebuild (warm cache builds in ~20s)
- ESLint is skipped during builds (`eslint.ignoreDuringBuilds: true` in `next.config.ts`) — a build passing does not mean lint is clean. Run `npm run lint` separately
- `package.json` declares `"type": "commonjs"` even though the project ships ESM Next.js code. Don't "fix" this unless you've verified scripts under `scripts/` and the postcss configs still load

## Architecture

### App Router Layout

- `src/app/layout.tsx` — **server** root layout. Owns `Metadata` export, JSON-LD schemas, font loading, analytics mounts
- `src/app/client-layout.tsx` — `"use client"` shell with `next-themes` ThemeProvider and `CityLoader`. **Currently not wired into `layout.tsx`** — pages use `PageWrapper` with `RandomLoader` directly
- `src/app/page.tsx` — home page composes sections from `@/components/page_components/*`. `<FAQ />`, `<Testimonials />`, `<Contact />`, `<N8nChat />` sit outside `max-w-7xl` container (full-bleed)
- Routes: `/`, `/about-me`, `/currentStudies`, `/favorites`, `/my-faith`, `/private-servers`. Each is a single `page.tsx` under `src/app/<route>/`. **When adding a public route, also add it to `src/app/sitemap.ts`** — the sitemap is a static array

### Component Organization

- `src/components/page_components/` — top-level home sections (Hero, Skills, Proyects, About, Contact, Testimonials, HeaderMain)
- `src/components/sub-sections/` — feature blocks composed inside page sections (FAQ, ProjectModal, GitHubStats, UseCases carousel)
- `src/components/ui/` — shadcn/ui primitives (`new-york` style, `neutral` base). Aliases: `@/components/ui`, `@/lib/utils`, `@/hooks`
- `src/components/{google,meta,tiktok}/` — per-provider analytics pixel components
- `src/components/loading/` — multiple loader variants. `PageWrapper` picks `RandomLoader`
- `src/components/timeline/` — interactive book/timeline UI for the about-me journey
- `src/components/animations/` — GSAP / Framer Motion / Three.js wrappers

### Data & Content

Static content lives in `src/data/*.tsx` (e.g. `proyectData.ts`, `skillsData.tsx`, `aboutInfo.tsx`, `cardsContentSections.ts`, `socialLinks.ts`, `navlinks.tsx`, `footerData.ts`). To change copy, projects, or skills, edit these files — no CMS.

### Path Alias

`@/*` → `src/*` (see `tsconfig.json`). Always import via `@/` from `src/`.

## Styling

- Tailwind CSS 3 + `tailwindcss-animate` + `tw-animate-css`. Config in `tailwind.config.js`, base CSS in `src/app/globals.css`
- `styled-components` also active (SSR enabled via `compiler.styledComponents` in `next.config.ts`) — used by some animation components
- **Color system**: Cyan `#06b6d4` (primary), Indigo `#6366f1` (secondary) — NO emerald, violet, or zinc-900
- Theme: dark by default (`bg-zinc-950 text-zinc-100`), accent `indigo-600/4f46e5`
- **Typography**: Space Grotesk (headers), Inter (body), IBM Plex Mono (mono) — all via `next/font/google`
- **Motion**: 8/10 intensity, purposeful
- **Copy tone**: First-person, human, honest — NOT salesy, NOT freelance
- **Language**: English site → `lang="en"`, site URL `https://www.artagdev.com.co`

## Performance Constraints

### Hero Video

- **Video is the brand differentiator** — must remain visible, never hide or remove it
- `public/tech-mobile.mp4` (~1MB, ≤768px) + `public/tech-desktop.mp4` (~5.5MB, >768px) via responsive `<source media>`
- `poster="/technology.webp"` (128KB) provides immediate visual
- `preload="metadata"` loads only headers (~KB), full video plays via JS `useEffect` after page load
- Source file `source-video/tech4k.mp4` (32.5MB) is gitignored

### LCP Design Constraint

- Hero H1 text only renders after the 3-second `RandomLoader` disappears, guaranteeing LCP ≥ 3s by design
- Don't try to "fix" this — it's intentional for brand immersion

### Dynamic Imports

Below-fold components use `next/dynamic` for code splitting: Contact, Testimonials, FAQ, N8nChat, FooterMain

### Image Optimization

- `sizes` prop added to 11 `Image` components using `fill`
- Favicon order: `logosinfondo.png` (40KB) preferred over `logosinfondo.ico` (269KB)

## Contact Form Pipeline

`POST /api/contact` (`src/app/api/contact/route.ts`):
1. `getClientIp` + `checkRateLimit` (in-memory `Map` in `src/lib/rateLimit.ts`, default 1 req / 5 min per IP). **In-memory rate limit does not survive serverless cold starts** — fine for low traffic, replace with Upstash/Redis if traffic grows
2. Zod validation against `contactFormSchema` (`src/lib/validations/contactSchema.ts`)
3. `isSpam` check (`src/lib/anti-spam.ts`) — silently 200s spam to avoid leaking detection
4. `sendContactEmail` via nodemailer + Gmail (`src/lib/email/emailConfig.ts`). Requires `GMAIL_USER` + `GMAIL_PASSWORD` (Gmail App Password) in `.env.local`
5. Origin/Referer validation (CSRF protection), body size limit (15KB), timing check (<3s = bot), honeypot CSS position off-screen

User-facing error messages from this route are **in Spanish** — keep that locale when editing.

## Security Headers / CSP

`middleware.ts` generates a CSP at request time by flattening `ANALYTICS_CONFIG` domain lists, plus sets `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`. The matcher excludes `/api`, `_next/static`, `_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml`. **If a new third-party script gets blocked**, add its domain to the appropriate service in `ANALYTICS_CONFIG` rather than loosening the policy globally.

## n8n Chat Widget

- Mounted on home page only (`<N8nChat {...N8N_CHAT_CONFIG} />`)
- Agent named "Braska", webhook at `n8n.artagdev.com.co`
- All copy, suggestions, and styling in `src/config/n8n-chat.config.ts`
- Webhook URL is `NEXT_PUBLIC_N8N_WEBHOOK_URL`

## Environment Variables

`.env.example` is sparse (just GitHub token). Real config lives in `.env.local` (gitignored). Required for full functionality:

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n chat backend |
| `GMAIL_USER`, `GMAIL_PASSWORD`, `GMAIL_FROM`, `CONTACT_ADMIN_EMAIL` | Contact form SMTP (Gmail App Password) |
| `NEXT_PUBLIC_DOMAIN` | CORS origin for `/api/contact` |
| `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Tracking pixels |
| `NEXT_PUBLIC_GITHUB_TOKEN` | Optional, raises GitHub API rate limit for `GitHubStats` |

## Common Pitfalls

- Don't "fix" the `package.json` `"type": "commonjs"` unless you've verified scripts and postcss configs
- Don't recreate deleted audit/SEO `.md` files at the root — they were intentionally removed
- `.agents/` is gitignored
- Both `postcss.config.js` and `postcss.config.mjs` exist — Next picks one based on its own resolution. If you change PostCSS config, edit both or remove one deliberately
- React 19 + Next 15 — many libraries have peer-dep warnings; check before bumping versions
- `next-i18next` is a dependency but **not currently used** for routing; copy is hand-written per locale (mostly English with Spanish API messages)
- The contact email bug where admin sees "user" instead of entered name is likely in the n8n workflow, not frontend code
