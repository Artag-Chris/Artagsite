# Plan de crecimiento real — artagdev.com.co
**Fecha:** 2026-10-29
**Objetivo:** pasar de “tráfico que no existe” a tráfico medible, con intención (reclutadores, clientes, devs) y conversiones reales (CV, contacto, LinkedIn/GitHub).
**Horizonte:** 90 días, con revisión semanal y decisiones mensuales.

> **Estado de implementación:** Fases 0, 1, 2, 3 y 5 completadas en código (ver `docs/seo/ESTADO-Y-TRASPASO.md`). Fase 4 (distribución) y la configuración manual de GA4/GTM/Search Console quedan pendientes.

---

## 1. Lectura honesta de tus datos

### 1.1 Lo primero: esos 170 usuarios no son tráfico real

Los números de GA4 no cuadran con un sitio que tiene 0 clics orgánicos:

| Señal | Dato | Lectura |
|---|---|---|
| Fuente principal | `(direct) / (none)` = 161 de 170 usuarios | Un portfolio sin marca no recibe tráfico directo |
| Ciudades | Flint Hill 35, San Jose 27, Phoenix 23, Frankfurt 16, Des Moines 6, Ashburn 4 | Son regiones de datacenter (AWS/Azure/GCP), no personas |
| Ciudad real | Pereira 5 | Tu única audiencia humana identificable |
| Dispositivo | 95,9 % desktop, Windows 144 | Los portfolios reales rondan 50–70 % móvil |
| Resoluciones | 1366x768, 800x600, 1600x1200, 1920x890 | Huella típica de bots, monitores de uptime y crawlers |
| Tiempo medio | 20 s | Compatible con rebote automático, no con lectura |
| Referral | `vercel.com / referral` 1 usuario + Bing 10 sesiones | Previews de Vercel y crawlers de Bing |

**Conclusión:** la mayor parte de esos “usuarios” son monitores de uptime, crawlers, unfurlers de WhatsApp/LinkedIn/Facebook, escáneres de seguridad, previews de Vercel y probablemente tus propias visitas. El tráfico humano real está en el orden de **decenas, no cientos**.

Eso también explica el “no veo mejora”: estás mirando una métrica inflada por bots, así que cualquier cambio real queda invisible.

### 1.2 Search Console: el sitio prácticamente no existe en Google

| Métrica (≈3 meses) | Valor |
|---|---|
| Impresiones | 636 |
| Clics | 0 |
| CTR | 0 % |
| Posición media | 9,95 |
| Consultas distintas | 15 |
| “artag” | 576 impresiones (90,6 %) · posición 8,82 · 0 clics |
| “artag.ir” | 15 impresiones · posición 7,07 |
| Resto | “altasierra web development”, “arqtag”, “artagartag”, “arcdotdev”, “devtalles”… |

**Lectura:**
- El 100 % de tus impresiones son **de marca o casi-marca** (`artag`, `arqtag`, `artagartag`). No hay una sola consulta informativa (“cómo…”, “qué es…”, “arquitectura de…”).
- 636 impresiones en 90 días ≈ 7 al día. Eso no es un problema de CTR: es un problema de **superficie indexable y de contenido**.
- “artag” con 576 impresiones y 0 clics y posición 8,8 significa que apareces al final de la página 1 para una palabra que se disputan otras entidades (artag.ir, marcas “Artag”), y nadie te elige.
- No apareces para **“Christian Henao”**. Tu nombre no está construido como entidad en Google.

### 1.3 Por qué no hay tráfico (causas reales, en orden de impacto)

1. **Solo tienes 6 rutas × 2 idiomas, y ninguna tiene demanda de búsqueda.** `/my-faith`, `/favorites`, `/private-servers` no los busca nadie. La home compite por “full stack developer”, una de las consultas más saturadas del mundo.
2. **Tus 4 proyectos de IA no son indexables.** Solo existen como tarjeta + modal: no hay URL, no hay título, no hay contenido que Google pueda rankear ni que alguien pueda compartir.
3. **Cero contenido técnico.** No hay ni un artículo que responda una pregunta real; por tanto no hay ninguna consulta long-tail que puedas ganar.
4. **Entidad confusa.** El schema dice `Person: "Artag Dev"`, `sameAs` apunta a `github.com/artag` (tu cuenta real es `Artag-Chris`) y el Twitter sigue en placeholder. Google no sabe que “Artag”, “Christian Henao” y `artagdev.com.co` son la misma persona.
5. **Señales técnicas contradictorias.** `/private-servers` está en el sitemap, con `index: true` y a la vez bloqueada en `robots.txt`: Google no puede leer el `noindex` porque el `Disallow` le impide rastrear. El sitemap además usa `lastModified: new Date()` en cada petición, así que le dices a Google “todo cambió hoy” todos los días y aprende a ignorar tu `lastmod`.
6. **Medición duplicada y sin filtros.** `GoogleTagManager.tsx` carga GTM **y** `gtag.js` con `config(GA_ID)`, y `GTMPageView.tsx` empuja otro `page_view`. Resultado: pageviews duplicadas, eventos inflados y previews de Vercel contaminando producción.
7. **Conversión rota o sin medir.** El CTA del hero abre un menú de contacto en vez de llevar a proyectos/CV; el email del formulario llega con “user” en lugar del nombre (bug reportado en el workflow de n8n). Si alguien llega, no tienes forma de saber si convirtió.

### 1.4 La verdad estratégica

Un portfolio personal **no gana tráfico por SEO de keywords genéricas**. Lo gana por:
1. **Superficie indexable con intención** (casos de estudio que responden “cómo se construye X”).
2. **Entidad clara** (tu nombre, tu GitHub, tu LinkedIn, tus proyectos conectados).
3. **Distribución** (LinkedIn, GitHub, comunidades, dev.to) — que durante los primeros 6 meses rendirá 10–50× más que Google.

Este plan ataca las tres, en ese orden. El SEO es consecuencia del contenido y de la entidad, no al revés.

---

## 2. Objetivos y KPIs

### 2.1 Lo que se mide (baseline → meta a 90 días)

| KPI | Baseline hoy | Meta 30 d | Meta 60 d | Meta 90 d |
|---|---|---|---|---|
| URLs indexadas | ~12 (6 rutas × 2) | 20 | 24 | 28+ |
| Clics orgánicos / mes | 0 | 5 | 20 | 40–60 |
| Impresiones no-marca / mes | 0 | 150 | 500 | 1.000 |
| CTR marca (“artag”) | 0 % | 2 % | 4 % | 5 % |
| Sesiones humanas reales / mes (post-filtros) | ~15–30 (estimado) | 40 | 80 | 150 |
| Sesiones referral LinkedIn/GitHub / mes | 0 | 20 | 60 | 100 |
| Tiempo medio interacción | 20 s | 40 s | 60 s | 90 s |
| Rebote `/es` | 69 % | 55 % | 45 % | < 40 % |
| `cv_download` / mes | 0 (sin evento) | evento activo | 5 | 15 |
| `contact_submitted` / mes | desconocido | evento activo | 2 | 5 |

> Nota: las metas son deliberadamente conservadoras. Un portfolio nuevo suele tardar 4–6 meses en salir de 0 clics; la distribución social da resultados en semanas y el SEO en trimestres.

### 2.2 Lo que **no** es objetivo

- No perseguir “full stack developer” ni “desarrollador full stack” como keyword principal.
- No comprar enlaces ni publicar 20 artículos generados en masa.
- No crear páginas vacías (Engineering Notes solo cuando exista el primer artículo real).
- No “arreglar” el loader de 3 s ni quitar el video del hero: son decisión de marca. Se compensan con `poster`, `preload` y prioridad de la H1.

---

## 3. Fase 0 — Limpiar la medición (día 1–3)

Sin esto, cualquier mejora es invisible o falsa.

1. **GA4 → Admin → Data filters**
   - Crear filtro **Internal traffic** con tu IP (y la de tu casa/oficina) → estado *Testing* y luego *Active*.
   - Crear filtro **Developer traffic** (`debug_mode`) y excluirlo de los informes.
2. **GTM → condición de hostname**: bloquear el tag de GA4 cuando `Page Hostname != www.artagdev.com.co`. Eso elimina previews de Vercel y dominios de staging.
3. **Fuera la duplicación**, una sola vía:
   - Opción recomendada: GTM como única vía (tag GA4 + page_view gestionado por GTM) y **eliminar** el `gtag.js` directo de `src/components/google/GoogleTagManager.tsx`.
   - Mantener el push de `GTMPageView` **solo** si el contenedor no dispara page_view por sí solo. Verificar en Tag Assistant que hay **1** page_view por navegación, no 2 ni 3.
4. **Marcar conversiones**: `cv_download` y `contact_submitted` como eventos clave. Nada más.
5. **Search Console**: verificar propiedad de dominio completo (`artagdev.com.co`) + propiedad de prefijo `https://www.artagdev.com.co`. Confirmar que el sitemap está enviado y sin errores. Enviar también a **Bing Webmaster Tools** (hoy Bing manda más sesiones que Google, aunque sean bots).
6. **Baseline real**: anotar sesiones humanas de los últimos 28 días después de aplicar filtros. Ese es el punto de partida honesto.

**Criterio de aceptación:** en GA4 Realtime, una visita tuya con el filtro activo **no** aparece; una visita desde el móvil de otra persona **sí** aparece una sola vez.

---

## 4. Fase 1 — Entidad, indexación y técnica (semana 1–2)

### 4.1 Identidad y schema

Archivos: `src/app/[locale]/layout.tsx`, `src/data/socialLinks.ts`, `src/app/[locale]/page.tsx`.

- [ ] `Person.name` → **“Christian Henao”**, con `alternateName: "Artag"` y `jobTitle` “Full-Stack Developer & AI Engineer”.
- [ ] `sameAs` reales y verificados: `https://github.com/Artag-Chris`, `https://www.linkedin.com/in/artag/`, `https://www.youtube.com/@Artag888`, `https://www.instagram.com/artagdev/`. **Quitar** `twitter.com/artagdev` si la cuenta no existe o no se usa.
- [ ] Corregir `sameAs` del `Organization` (hoy apunta a `github.com/artag`).
- [ ] Quitar el placeholder `https://twitter.com/yourusername` de `socialLinks.ts`.
- [ ] Añadir `Person.knowsAbout` alineado al nuevo posicionamiento (RAG, agentes, NestJS, Rust, Redis, seguridad) y `alumniOf`/`worksFor` solo con datos verificables.
- [ ] Mover los `<script type="application/ld+json">` a `<head>` (hoy van en `<body>`, antes del contenido).

### 4.2 Metadata y CTR

- [ ] Home: title/description nuevos, sin “Software Architect” ni “32K+ usuarios / 99,99 % uptime” (afirmaciones que no se pueden verificar y que además no son lo que buscan reclutadores).
  - EN: `Christian Henao (Artag) — Full-Stack Developer & AI Engineer`
  - ES: `Christian Henao (Artag) — Desarrollador Full-Stack e IA`
  - Description: qué construyes + prueba concreta + CTA (“4 sistemas de IA en producción, casos de estudio con arquitectura y decisiones”). ≤ 155 caracteres.
- [ ] `x-default` en `alternates.languages` (hoy solo `en`/`es`).
- [ ] Verificar que cada página conserva su canonical propio (no hereda el de la home).
- [ ] Comprobar que `/es` no duplica la home: canonical correcto y `hreflang` recíproco.

### 4.3 Sitemap y robots (contradicción actual)

- [ ] `src/app/sitemap.ts`: quitar `/private-servers`; `lastModified` desde `lastUpdated` real por contenido, no `new Date()`.
- [ ] `public/robots.txt`: **quitar** `Disallow: /private-servers` (si está bloqueada, Google nunca verá el `noindex`).
- [ ] `src/app/[locale]/private-servers/page.tsx`: `robots: { index: false, follow: true }`.
- [ ] Añadir al sitemap las rutas nuevas (`/projects` y los 8 detalles) cuando existan, con sus alternates.

### 4.4 Enlaces internos y rastreo

- [ ] Enlazar home ↔ proyectos ↔ about-me ↔ studies con anchors descriptivos (hoy el `llms.txt` no sustituye enlaces reales).
- [ ] `BreadcrumbList` en páginas internas y en casos de estudio.
- [ ] 404 real en slug inexistente.
- [ ] Revisar que no haya `noindex` accidental ni `Disallow` en rutas nuevas.

### 4.5 Performance que sí afecta al usuario real

- [ ] `poster` del video ya existe: añadir `fetchpriority="high"` a la imagen/poster del hero y `preload="metadata"` correcto.
- [ ] Comprobar LCP móvil en PageSpeed Insights. El loader de 3 s es intencional; el objetivo es que **después** del loader no haya otro bloqueo (fuentes, video, JS de terceros).
- [ ] Diferir píxeles (Meta/TikTok) hasta después de la interacción o `lazyOnload` si no se usan para campañas activas.

**Criterio de aceptación:** Search Console → “Páginas” sin errores nuevos, sitemap leído, `/private-servers` reportada como “Excluida por noindex”, y una sola page_view por navegación en Tag Assistant.

---

## 5. Fase 2 — Superficie indexable: los 4 casos de estudio (semana 2–6)

Esto ya está empezado en el repo (plan `artag-ai-portfolio-reorganization.md`, y en el working tree están `docs/portfolio/`, `src/data/projects.*.json`, `src/components/projects/` y `scripts/check-project-content.mjs`). Es el movimiento de mayor impacto: convierte 4 tarjetas en 8 URLs con contenido real.

- [ ] Crear `src/app/[locale]/projects/page.tsx` (índice, Server Component, metadata localizada).
- [ ] Crear `src/app/[locale]/projects/[slug]/page.tsx` con `generateStaticParams`, `generateMetadata` y `notFound()`.
- [ ] Contenido por caso: problema → resultado → arquitectura → 3–4 decisiones con trade-offs → seguridad/costos → limitaciones honestas → repo/demo si existe.
- [ ] Estados honestos: Atiende “temporalmente offline”; Social/Doc “validado con mock / pendiente de validación real”. Nada de “en producción” si no lo está.
- [ ] Añadir al sitemap las 8 URLs nuevas con `lastUpdated` real.
- [ ] Enlazar desde la home y desde el índice.

**Criterio de aceptación:** 8 URLs nuevas devuelven 200, aparecen en el sitemap, tienen H1, canonical, hreflang y JSON-LD `Article` + `BreadcrumbList`, y son enlazables desde LinkedIn sin depender de un modal.

---

## 6. Fase 3 — Contenido que puede rankear (semana 4–12)

Regla: **un artículo = una consulta concreta + una respuesta verificable**. Nada de “10 tips para ser full stack”.

### 6.1 Los primeros 4 artículos (Engineering Notes)

| # | Artículo | Consulta objetivo | Por qué puede ganar |
|---|---|---|---|
| 1 | Caché exacto + semántico para bajar costo de LLM (con medición) | `llm semantic cache cost reduction`, `reducir costos llm` | Nadie publica números reales; tú tienes el caso de Atiende |
| 2 | Arquitectura de un agente de WhatsApp con RAG y escalación humana | `whatsapp ai agent architecture`, `agente whatsapp ia` | Alta intención, poca oferta en español |
| 3 | Match híbrido + ATS determinístico: cómo puntuar una vacante sin alucinar | `ats score algorithm`, `cómo funciona un ats` | Demanda alta de candidatos + credibilidad técnica |
| 4 | Redis Streams vs BullMQ para pipelines event-driven (con benchmark) | `redis streams vs bullmq`, `nestjs bullmq rust` | Long-tail técnico, comunidad dev activa |

Formato de cada nota:
- H1 con la consulta, respuesta directa en las primeras 60 palabras.
- Diagrama (HTML/CSS o imagen real), código, benchmark reproducible.
- Sección “qué no funcionó / límites”.
- `Article` + `FAQPage` si aplica, `datePublished`/`dateModified` reales.
- Enlaces internos al caso de estudio correspondiente.

### 6.2 Calendario editorial realista

- 2 notas al mes (no más). Cada nota: 1.200–2.000 palabras, 1 diagrama, 1 tabla de resultados.
- Cada nota se publica en el sitio **y** se distribuye: LinkedIn (post resumen + enlace), GitHub (README del repo), dev.to/Hashnode (con `rel=canonical` al sitio).
- Español primero si el objetivo son oportunidades en LATAM/España; inglés para el resto. Traducir solo las 2 notas con mejor rendimiento.

**Criterio de aceptación a 60 días:** 2 notas publicadas, indexadas, con al menos 1 impresión no-marca cada una y 1 enlace externo real (GitHub/LinkedIn/comunidad).

---

## 7. Fase 4 — Distribución (semana 1–12, en paralelo)

Esto es lo que mueve la aguja antes que Google.

### 7.1 LinkedIn (tu canal #1)

- [ ] Headline: `Full-Stack Developer & AI Engineer · RAG · agentes multicanal · NestJS + Rust`.
- [ ] Destacados: los 4 casos de estudio + CV.
- [ ] 2 posts/semana durante 8 semanas:
  1. Caso de estudio con diagrama (no captura de código).
  2. Decisión técnica + trade-off (“por qué Redis Streams y no BullMQ aquí”).
- [ ] Cada enlace con UTM: `?utm_source=linkedin&utm_medium=social&utm_campaign=case-study-<slug>`.
- [ ] Comentar en 5 posts/semana de reclutadores/devs de tu nicho (esto trae perfil, no tráfico, pero abre puertas).

### 7.2 GitHub

- [ ] Perfil `Artag-Chris`: README con bio, stack, enlaces a los 4 casos y al CV.
- [ ] Fijar los 4 repos; cada README con: problema, arquitectura, cómo correr, enlace al caso de estudio del sitio.
- [ ] Añadir el enlace del sitio en la sección “Website” del perfil.

### 7.3 Terceros (enlaces reales, no spam)

- [ ] dev.to / Hashnode: cross-post con canonical.
- [ ] 1 “Show HN” por proyecto, cuando el README esté listo (no antes).
- [ ] Comunidades: Discord/Slack de Next.js, NestJS, Rust; foros en español (MiduDev, comunidades LATAM). Aportar antes de promocionar.
- [ ] Directorios de portafolios dev (solo los que indexan y no son granjas de enlaces).

### 7.4 Lo que no harás

- Comprar backlinks, comentarios masivos, DMs automatizados, publicar el mismo texto en 10 sitios sin canonical.

---

## 8. Fase 5 — Conversión y decisiones (semana 4–12)

- [ ] Hero: CTA principal → `/projects`; secundario → `/resume.pdf` (hoy abre menú de contacto).
- [ ] CV como `<a href="/resume.pdf" download>` real, con evento `cv_download`.
- [ ] Arreglar el bug del formulario: el correo al admin debe llevar el nombre real (revisar workflow n8n, no solo el frontend).
- [ ] Definir eventos: `select_project`, `project_outbound_click`, `cv_download`, `contact_submitted`. Solo los dos últimos como conversión.
- [ ] Revisión mensual (primer lunes de cada mes), 30 min:
  - ¿Qué páginas ganaron impresiones no-marca?
  - ¿Qué post de LinkedIn trajo sesiones?
  - ¿Qué caso de estudio recibe clics a repo/CV?
  - Duplicar lo que funcione; matar lo que no.

---

## 9. Orden de ejecución (resumen accionable)

| Semana | Foco | Entregable verificable |
|---|---|---|
| 1 | Medición | GA4 sin duplicados, filtros activos, baseline real, GSC + Bing verificados |
| 1–2 | Técnica y entidad | Schema correcto, metadata nueva, sitemap/robots coherentes, 1 page_view por navegación |
| 2–4 | Casos de estudio | `/projects` + 4 casos (8 URLs) indexables y enlazables |
| 3–6 | Home y conversión | Hero reposicionado, CTA a proyectos/CV, formulario arreglado, eventos activos |
| 4–8 | Contenido | Nota 1 (caché LLM) y nota 2 (agente WhatsApp) publicadas y distribuidas |
| 6–12 | Distribución | 16 posts LinkedIn, 4 READMEs, 2 cross-posts, 1 Show HN |
| 12 | Revisión | Comparar KPIs vs baseline y decidir el siguiente trimestre |

---

## 10. Riesgos y supuestos

- **Supuesto:** el objetivo es empleo/colaboración, no vender servicios de agencia. Si el objetivo cambia, cambian las keywords y los CTAs.
- **Riesgo:** el loader de 3 s y el video del hero mantienen el LCP alto; se acepta por marca, pero hay que vigilar móvil.
- **Riesgo:** el tráfico de bots seguirá apareciendo si no se filtran los previews de Vercel; el filtro de hostname es obligatorio.
- **Riesgo:** si el formulario sigue roto, el tráfico nuevo no convierte y el plan parecerá un fracaso sin serlo.
- **Realidad:** SEO en un dominio con 3 meses de datos y 636 impresiones no da resultados en 30 días. Los primeros clics orgánicos realistas llegan entre el día 45 y el 90; la distribución social llega antes.

---

## 11. Verificación final del plan

- [ ] `npx tsc --noEmit` sin errores.
- [ ] `npm run lint` (si falla por el bug conocido de ESLint 9, registrarlo como preexistente).
- [ ] `npm run build` nunca con el dev server corriendo.
- [ ] Rich Results Test sobre home y 2 casos de estudio.
- [ ] PageSpeed móvil del home y de un caso.
- [ ] Tag Assistant: 1 page_view, 1 `cv_download`, 1 `contact_submitted`.
- [ ] Search Console: sitemap leído, 0 errores nuevos, `/private-servers` excluida.
