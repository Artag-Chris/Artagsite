# Estado y traspaso — Plan de crecimiento artagdev.com.co

> Documento de continuidad. Cualquier IA que retome el trabajo debe leer este archivo primero.
> Plan original: `docs/seo/plan-crecimiento-2026-10.md`
> Fecha de actualización: 2026-10-29

## 1. Estado global

- **Fase 0 (medición):** completada en código. Falta configuración manual en GA4/GTM/Search Console (ver §3).
- **Fase 1 (entidad, indexación, técnica):** completada en código.
- **Fase 2 (casos de estudio indexables):** completada. 12 URLs generadas (6 slugs × 2 idiomas) y verificadas con `npm run build`.
- **Fase 3 (contenido que rankea):** completada. 2 notas técnicas publicadas en `/engineering-notes` (4 URLs × 2 idiomas) y verificadas con build.
- **Fase 4 (distribución):** pendiente. Manual (LinkedIn, GitHub, comunidades).
- **Fase 5 (conversión y decisiones):** completada en código. Eventos instrumentados; pendiente la marcación de conversiones en GTM y el fix del nombre en el email (n8n).

## 2. Lo que se hizo (Fases 0-5)

### 2.1 Fase 0 — Medición

Archivos: `src/components/google/GoogleTagManager.tsx`, `src/components/google/GTMPageView.tsx`.

- Eliminada la carga duplicada de `gtag.js` cuando existe contenedor GTM. Ahora hay una sola vía: GTM si está configurado, fallback a `gtag.js` (con `send_page_view: false`) solo si no hay GTM.
- `GTMPageView` ahora:
  - solo empuja `page_view` si `window.location.hostname === 'www.artagdev.com.co'` (elimina previews de Vercel, localhost y dominios alternativos);
  - es idempotente por pathname (un `page_view` por navegación);
  - añade `page_location` y `page_title`.
- Pendiente manual: filtros de tráfico interno y de desarrollador en GA4, bloqueo por hostname dentro del contenedor GTM, marcar `cv_download` y `contact_submitted` como eventos clave, verificar en Tag Assistant.

### 2.2 Fase 1 — Entidad, indexación y técnica

Archivos: `src/app/[locale]/layout.tsx`, `src/i18n/dictionaries/en.ts`, `src/i18n/dictionaries/es.ts`, `src/data/socialLinks.ts`, `src/app/sitemap.ts`, `public/robots.txt`, `src/app/[locale]/private-servers/page.tsx`.

- Metadata de la home reescrita: title/description con nombre real, sin “Software Architect” ni “32K+ usuarios / 99,99 % uptime”. Añadido `x-default` en alternates.
- Schema `Person`: `name = "Christian Henao"`, `alternateName = "Artag"`, `jobTitle` Full-Stack Developer & AI Engineer, `sameAs` reales (GitHub `Artag-Chris`, LinkedIn, YouTube, Instagram), `knowsAbout` alineado al nuevo posicionamiento.
- Schema `Organization`: `sameAs` corregido, descripción actualizada.
- `socialLinks.ts`: eliminado el enlace placeholder de Twitter/X.
- `sitemap.ts`: eliminado `/private-servers`; `lastModified` real por ruta (mapa estático + `project.lastUpdated`); añadidas `/projects` y los 8 detalles de casos de estudio; alternates con `x-default`.
- `robots.txt`: eliminado `Disallow: /private-servers` (ahora Google puede leer el `noindex`).
- `private-servers/page.tsx`: `robots: { index: false, follow: true }`.
- JSON-LD se mantiene en el `<body>` (es válido para Google; moverlo a `<head>` no aporta ranking y arriesga hidratación). No es un pendiente bloqueante.

### 2.3 Fase 2 — Casos de estudio indexables

Archivos nuevos: `src/app/[locale]/projects/page.tsx`, `src/app/[locale]/projects/[slug]/page.tsx`, `src/i18n/dictionaries/en.ts` y `es.ts` (namespace `projectPages`), `src/components/projects/ProjectStatusBadge.tsx` (colores).

- Índice `/projects` (server component) con metadata localizada, grid de `ProjectCard`.
- Detalle `/projects/[slug]` con `generateStaticParams`, `generateMetadata`, JSON-LD `Article` + `BreadcrumbList`, secciones: problema, solución, resultados, arquitectura, decisiones, desafíos, aprendizajes, limitaciones, proyecto siguiente, CTA de contacto.
- `projectPages` añadido a ambos diccionarios (estados, disponibilidad, etiquetas de sección).
- `ProjectStatusBadge`: colores ajustados a la paleta cyan/indigo (sin emerald).
- `EnhancedProjectCard`: completados los mapas de estado para todos los `ProjectStatus` (evita error de TS).
- Eliminado `src/components/sub-sections/ProyectCard.tsx` (muerto, causaba error de TS).
- `src/components/page_components/Headermain.tsx`: añadido enlace a `/projects` en el nav externo (usa `next/link`; pendiente usar `@/i18n/navigation` para prefijo de idioma).

Verificación: `npm run content:check` ✅, `npx tsc --noEmit` ✅, `npm run build` ✅ (33 rutas, 12 de proyectos).

### 2.4 Fase 3 — Contenido que rankea (notas de ingeniería)

Archivos nuevos: `src/data/notes.en.json`, `src/data/notes.es.json`, `src/data/notes.ts`, `src/app/[locale]/engineering-notes/page.tsx`, `src/app/[locale]/engineering-notes/[slug]/page.tsx`, `src/i18n/dictionaries/en.ts` y `es.ts` (namespace `engineeringNotes`).

- Modelo de datos `Note` con slug, title, description, datePublished, dateModified, readingTime, tags, intro, sections (heading/body/list/code), relatedProject.
- Índice `/engineering-notes` (server component) con metadata localizada, tarjetas con fecha, tiempo de lectura y tags.
- Detalle `/engineering-notes/[slug]` con `generateStaticParams`, `generateMetadata`, JSON-LD `Article` + `BreadcrumbList`, secciones renderizadas (problema/enfoque/código/benchmark/aprendizajes/límites), enlace al proyecto relacionado y CTA de contacto.
- Namespace `engineeringNotes` añadido a ambos diccionarios.
- Enlace a `/engineering-notes` en el nav del header (icono `FileText`).
- `sitemap.ts`: añadida ruta índice + 2 slugs × 2 idiomas (4 URLs nuevas).
- 2 notas publicadas, en español e inglés:
  1. `llm-semantic-cache-cost-reduction` — caché exacto + semántico, umbrales, medición del ~30%.
  2. `whatsapp-ai-agent-architecture` — pipeline inbound, agente con herramientas, RAG, router con circuit breaker, escalación humana.
- Verificación: `npx tsc --noEmit` ✅, `npm run build` ✅ (39 rutas, 4 de notas).

### 2.5 Fase 5 — Conversión y decisiones (código)

Archivos: `src/lib/analytics.ts`, `src/components/page_components/Hero.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/projects/OutboundLink.tsx`, `src/app/[locale]/projects/[slug]/page.tsx`, `src/hooks/useContactForm.ts`, `src/components/page_components/Headermain.tsx`, `src/functions/handleResumenDownload.ts`, `src/i18n/dictionaries/en.ts`, `src/i18n/dictionaries/es.ts`.

- Helper tipado `trackEvent` en `src/lib/analytics.ts` (solo hostname de producción; solo los 4 eventos del plan).
- Hero: CTA principal → `/projects`, secundario → `/resume.pdf` (descarga real) + evento `cv_download`.
- `ProjectCard`: evento `select_project` al hacer clic en "Ver caso de estudio".
- `OutboundLink` (client): evento `project_outbound_click` en enlaces de repositorio/demo del caso.
- `useContactForm`: evento `contact_submitted` tras respuesta exitosa real del API.
- Header: botón de CV convertido a `<a href="/resume.pdf" download>` con evento `cv_download` (desktop); móvil mantiene el botón con tracking en `handleResumeDownload`.
- Diccionarios: añadidas claves `ctaProjects` y `ctaResume` al namespace `hero`.
- Verificación: `npx tsc --noEmit` ✅, `npm run build` ✅.

### 2.6 Chat de n8n deshabilitado (offline)

Archivos: `src/config/n8n-chat.config.ts`, `src/app/[locale]/page.tsx`, `.env.example`, `.env.local`.

- Añadido `enabled: process.env.NEXT_PUBLIC_N8N_ENABLED === 'true'` (default `false`).
- Home renderiza `<N8nChat>` solo si `enabled` es true.
- Documentado en `.env.example` y `.env.local`.
- Para reactivar: poner `NEXT_PUBLIC_N8N_ENABLED=true` y reiniciar.

## 3. Pendientes manuales (no código)

1. **GA4:** filtros de tráfico interno y de desarrollador; excluir hostname ≠ `www.artagdev.com.co`; marcar `cv_download` y `contact_submitted` como eventos clave; verificar en Tag Assistant que haya 1 `page_view` por navegación.
2. **GTM:** desactivar el envío automático de page view en el tag de configuración GA4 si se mantiene el push manual (o eliminar el push y dejar que GTM lo envíe). Solo uno.
3. **Search Console / Bing:** verificar propiedad de dominio, reenviar sitemap, solicitar indexación de `/`, `/projects` y los 8 casos; confirmar que `/private-servers` quede “Excluida por noindex”.
4. **Handles de redes:** confirmar si existe cuenta real de X/Twitter antes de volver a añadirla al schema y a la metadata.
5. **Bug del formulario:** el correo al admin muestra "user" en lugar del nombre ingresado. Revisar el workflow de n8n (el frontend envía `name` correctamente).
5. **OG images:** ya existen en `public/` (`og-home.png`, etc.). Verificar que las nuevas rutas de proyectos usen una OG propia si se quiere mejor CTR (hoy reutilizan `og-home.png`).

## 4. Fase 3 — completada (siguiente contenido sugerido)

Notas 1 y 2 publicadas. Próximas notas sugeridas por el plan:
- Nota 3: “Match híbrido + ATS determinístico: cómo puntuar una vacante sin alucinar” (`ats-score-algorithm`).
- Nota 4: “Redis Streams vs BullMQ para pipelines event-driven (con benchmark)” (`redis-streams-vs-bullmq`).

Cada nota debe seguir la estructura: respuesta directa en las primeras 60 palabras, diagrama, código, benchmark, sección “qué no funcionó”, enlaces internos al caso de estudio. Distribuir en LinkedIn, GitHub README y dev.to/Hashnode con `rel=canonical`.

## 5. Fase 4 — Distribución (pendiente, manual)

- LinkedIn: headline actualizado, destacados con los 4 casos, 2 posts/semana × 8 semanas con UTM.
- GitHub: README de perfil con enlaces, repos fijados, READMEs de cada repo enlazando al caso de estudio.
- Comunidades: dev.to, Hashnode, Show HN, Discord/Slack de Next.js/NestJS/Rust, comunidades LATAM.
- Directorios de portafolios (solo los que indexan).

## 6. Fase 5 — conversión (pendiente manual)

- Marcar `cv_download` y `contact_submitted` como eventos clave en GTM (los 4 eventos ya se empujan desde el código).
- Fix del bug del formulario: el correo al admin debe llevar el nombre real (revisar workflow de n8n; el frontend envía `name` correctamente, ver `src/app/api/contact/route.ts`).
- Revisión mensual de KPIs vs baseline (primer lunes de cada mes).

## 7. Verificación integral (2026-10-29)

Comandos ejecutados (sin dev server corriendo):
- `npm run content:check` ✅ — 6 proyectos válidos en EN y ES.
- `npx tsc --noEmit` ✅ — sin errores de tipos.
- `npm run build` ✅ — 39 rutas generadas estáticamente.

Rutas verificadas en el build:
- Home EN/ES, about-me, currentStudies, favorites, my-faith, private-servers.
- `/projects` + 6 casos × 2 idiomas (12 URLs).
- `/engineering-notes` + 2 notas × 2 idiomas (4 URLs).
- `/sitemap.xml`, middleware (CSP).

Comprobaciones de SEO:
- `sitemap.xml` excluye `/private-servers`; incluye proyectos y notas; `lastModified` real.
- `robots.txt` no bloquea `/private-servers` (permite leer el `noindex`).
- `/private-servers` con `robots: { index: false, follow: true }`.
- Metadata de home reescrita (sin claims no verificables); schema `Person` con nombre real y `sameAs` correctos.
- JSON-LD `Article` + `BreadcrumbList` en casos de estudio y notas.
- OG images presentes en `public/`.
- GA4 sin carga duplicada (GTM o gtag, no ambos); `page_view` solo en producción y una vez por pathname.
- Chat de n8n oculto (servidor offline).

## 8. Contexto para otra IA

### Arquitectura relevante
- Next.js 15 (App Router), React 19, TypeScript. `@/*` → `src/*`.
- i18n: `next-intl` con `localePrefix: "as-needed"` (inglés en `/`, español en `/es`). Diccionarios en `src/i18n/dictionaries/en.ts` y `es.ts`. Navegación localizada en `src/i18n/navigation.ts`.
- Contenido de proyectos en `src/data/projects.en.json` y `projects.es.json`, validado por `npm run content:check` (`scripts/check-project-content.mjs`). Tipos en `src/data/proyectData.ts`.
- Estilos: Tailwind 3, paleta cyan `#06b6d4` / indigo `#6366f1`. **No usar emerald, violet ni zinc-900 como acento.**
- Componentes nuevos de proyectos: `src/components/projects/ProjectCard.tsx`, `ProjectStatusBadge.tsx`. Home usa `src/components/compontents/EnhancedProjectCard.tsx` y `src/components/page_components/Proyects.tsx` (modal, pendiente de retirar).
- Analytics: `src/components/google/GoogleTagManager.tsx`, `GTMPageView.tsx`, `src/config/analytics.config.ts`.
- Middleware: CSP en `src/middleware.ts`, genera dominios desde `ANALYTICS_CONFIG`.

### Reglas de trabajo (de AGENTS.md)
- No ejecutar `npm run build` mientras `npm run dev` esté corriendo (ambos escriben `.next`).
- `npm run lint` falla por un bug preexistente de ESLint 9 (“Converting circular structure to JSON”); no es causado por cambios de componentes.
- next-intl: `t("missing.key")` renderiza el path crudo; verificar que las claves existan tras renombrar.
- No recrear archivos `.md` de auditoría/SEO en la raíz (fueron eliminados a propósito). Usar `docs/`.
- `package.json` tiene `"type": "commonjs"`; no cambiarlo sin verificar scripts y configs de PostCSS.

### Comandos de verificación
```
npm run content:check
npx tsc --noEmit
npm run build   # solo sin dev server corriendo
npm run lint    # falla por bug preexistente de ESLint 9
```

### Rutas generadas
- `/projects`, `/es/projects`
- `/projects/{atiende,cv-harness,social-harness,doc-harness,whatsapp-automation,artag-portfolio}`
- `/es/projects/{...}`
- `/engineering-notes`, `/es/engineering-notes`
- `/engineering-notes/{llm-semantic-cache-cost-reduction,whatsapp-ai-agent-architecture}`
- `/es/engineering-notes/{...}`

### Archivos clave de datos
- `src/data/projects.en.json`, `src/data/projects.es.json` (6 proyectos, 4 destacados de IA)
- `src/data/proyectData.ts` (tipos + `getProjectBySlug`)
- `src/data/socialLinks.ts`
- `src/i18n/dictionaries/en.ts`, `es.ts` (`projectPages` namespace)

## 9. Criterio de éxito (recordatorio)

Metas a 90 días: 40–60 clics orgánicos/mes, 20–24 URLs indexadas, ~150 sesiones humanas reales/mes, `cv_download` y `contact_submitted` medidos. Los primeros clics orgánicos realistas llegan entre el día 45 y el 90; la distribución social llega antes.
