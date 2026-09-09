# SEO Pendientes y Recomendaciones — Artag (artagdev.com.co)

> Última actualización: 2026-09-09
> Estado de la auditoría: Fixes críticos aplicados. Pendientes organizados por prioridad.

---

## ✅ Completado en la última pasada (2026-09-09)

| Item | Archivo |
|------|---------|
| robots.txt — resuelto conflicto `anthropic-ai` Allow/Disallow, eliminados tokens obsoletos (`Claude-Web`, `Slurp`, `Crawl-delay`) | `public/robots.txt` |
| Metadata completa en `/favorites` (title, description, keywords, OG, twitter, canonical, robots) | `src/app/[locale]/favorites/page.tsx` |
| Metadata completa en `/private-servers` | `src/app/[locale]/private-servers/page.tsx` |
| OG + twitter + canonicals + keywords en `/about-me` | `src/app/[locale]/about-me/page.tsx` |
| OG + twitter + canonicals + keywords en `/my-faith` | `src/app/[locale]/my-faith/page.tsx` |
| OG images + twitter defaults (`summary_large_image`, `@artagdev`) en layout | `src/app/[locale]/layout.tsx` |
| OG image en `/currentStudies` (ya tenía el resto) | `src/app/[locale]/currentStudies/page.tsx` |
| `llms.txt` para AI crawlers | `public/llms.txt` |
| Header HSTS (`max-age=63072000; includeSubDomains; preload`) | `src/middleware.ts` |
| 3 skills SEO reescritas (`seo-content-auditor`, `seo-authority-builder`, `seo-content-writer`) | `.agents/skills/` |

---

## 🔴 ACCIÓN NECESARIA — Crear imágenes OpenGraph (bloqueante para social sharing)

Sin estas imágenes, ningún link compartido en WhatsApp, LinkedIn, Facebook, Twitter, Discord mostrará preview visual. Generar 1200x630px PNG.

| Archivo | Ruta esperada | Página |
|---------|---------------|--------|
| `og-home.png` | `public/og-home.png` | `/` |
| `og-about.png` | `public/og-about.png` | `/about-me` |
| `og-studies.png` | `public/og-studies.png` | `/currentStudies` |
| `og-faith.png` | `public/og-faith.png` | `/my-faith` |
| `og-favorites.png` | `public/og-favorites.png` | `/favorites` |
| `og-servers.png` | `public/og-servers.png` | `/private-servers` |

**Notas:**
- El código YA referencia estas rutas (no compila errores de runtime, pero sin archivo la imagen devolverá 404 y el preview se rompe)
- Usar la identidad visual: fondo oscuro `#0a0a0a`, cyan `#06b6d4`, indigo `#6366f1`, Space Grotesk
- Opcional: añadir nombre + tagline + logo
- Verificar con https://developers.facebook.com/tools/debug/ y el card validator de Twitter/X tras subirlas

---

## 🟠 PRIORIDAD ALTA — próxima semana

| # | Item | Detalle |
|---|------|---------|
| 1 | JSON-LD locale-aware | Los schemas Organization/Person en `layout.tsx` usan solo inglés incluso en `/es`. Duplicar para es_CO o usar traducciones. |
| 2 | JSON-LD → `<head>` | Actualmente inyectados en `<body>`. Mover a `<head>` (via `scripts` en metadata es la vía correcta). |
| 3 | `generateViewport()` + `theme-color` | Añadir en `layout.tsx`: `export const viewport` con `themeColor: "#0a0a0a"`. Beneficio: barra del navegador móvil coherente, mejor CWV percibido. |
| 4 | `Permissions-Policy` header | Añadir en middleware, p.ej. `geolocation=(), microphone=(), camera=()`. |

---

## 🟡 PRIORIDAD MEDIA — primer mes

| # | Item | Detalle |
|---|------|---------|
| 5 | Breadcrumb structured data | Añadir schema `BreadcrumbList` en páginas internas. |
| 6 | Evaluar `X-XSS-Protection` | Deprecated en Chrome/Edge. Se puede mantener por compat legacy, pero no aporta ranking. |
| 7 | `IndexNow` | Verificar si busca rápido Bing/Yandex. Implementar solo si el tráfico es relevante. |
| 8 | Verificar indexación en GSC | Re-escanear tras cambios de robots.txt; monitorizar errores de rastreo. |
| 9 | Internal linking en content | `llms.txt` no reemplaza links internos reales entre páginas (about-me ↔ studies ↔ home). |
| 10 | Refresh de `lastmod` | El sitemap usa `lastModified: new Date()` dinámico; no hardcodear fechas. Ya correcto. |

---

## 🟢 PRIORIDAD BAJA — backlog

| # | Item | Detalle |
|---|------|---------|
| 11 | Estudio de contenido original | La mayor señal E-E-A-T disponible: datos propios ("estado del panorama dev en LATAM"). |
| 12 | Presencia en review platforms | G2, Clutch, LinkedIn services — si aplica a la oferta. |
| 13 | Wikipedia / terceros | Solo si hay notabilidad real; no forzar. |
| 14 | Entrevistas / guest posts | Para authority: podcasts, roundups de la industria. |
| 15 | Monitoreo AI visibility | Chequear mensualmente citaciones en ChatGPT/Perplexity/AI Overviews con las queries clave. |
| 16 | `twitter`/`og` site handles verificar | Confirmar que `@artagdev` es el handle real en X/Twitter antes de publicar. |

---

## 🧠 Skills SEO actuales (estado)

| Skill | Estado |
|-------|--------|
| `seo-technical` | Sólida, actualizada 2025-2026. Mantener. |
| `ai-seo` | Sólida, con datos Princeton GEO. Mantener. |
| `seo-content-auditor` | ✅ Reescribita con framework de 5 fases + scoring /100. |
| `seo-authority-builder` | ✅ Reescribita con scorecard E-E-A-T + implementación schema. |
| `seo-content-writer` | ✅ Reescribita con estructuras por intent + AI-extractabilidad. |

---

## 📊 Métricas a monitorizar (donde mirar)

- **Google Search Console**: impresiones, CTR, indexación, errores de rastreo
- **PageSpeed Insights / CrUX** (PSI API): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (75th pct)
- **GA4**: tráfico orgánico, referral desde ChatGPT/Perplexity (AI sources)
- **AI visibility**: Otterly AI / Peec AI / manual mensual con 10-20 queries clave