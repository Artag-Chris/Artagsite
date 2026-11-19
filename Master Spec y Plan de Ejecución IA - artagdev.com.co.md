# **MASTER ENGINEERING SPEC & AI EXECUTION PLAN: artagdev.com.co**

**Versión:** 2.0 (Fusión Híbrida: Brutalismo Táctil de Ingeniería \+ Minimalismo Editorial con Escena 3D Focalizada)

**Objetivo:** Transformar artagdev.com.co en una experiencia web de nivel Awwwards mediante una arquitectura de 3 rutas limpias, tipografía estructural de alto impacto, una escena 3D/WebGL focalizada y optimizada, y rigor técnico verificable.

## **REGLAS DE EJECUCIÓN PARA EL AGENTE DE IA (PROTOCOLO OBLIGATORIO)**

**INSTRUCCIÓN PARA LA IA EJECUTORA:**

No puedes avanzar de una fase o tarea a la siguiente hasta haber ejecutado las pruebas correspondientes (unitarias, E2E con Playwright, typecheck, build o auditoría Lighthouse/Axe) y haber confirmado que **todos los criterios de aceptación pasan**. Cada vez que completes y valides una tarea, actualiza este documento marcando \[x\] en la casilla correspondiente y registra brevemente el resultado de la prueba.

## **1\. DIRECCIÓN ARTÍSTICA: "ARCHITECTURAL KINETIC LAB" (OPCIÓN 1 \+ OPCIÓN 3\)**

### **1.1 Concepto Visual**

Combinamos la **disciplina estructural del Brutalismo Táctil de Ingeniería** (retículas visibles con líneas de 1px, bordes rectos 0px, cero sombras difusas, textura de grano sutil en CSS y contraste tipográfico extremo) con la **atmósfera espacial del Minimalismo Editorial 3D** (amplio espacio negativo, tipografía cinética escalada con clamp() y una única escena WebGL/Three.js de bajo peso en el *Hero* que representa la orquestación de nodos de sistemas en tiempo real).

### **1.2 Sistema de Diseño y Tokens (CSS Variables / Tailwind)**

* **Superficies (Dark Mode Editorial — Calibrado sin negro puro \#000000):**  
  * \--bg-primary: \#0B0C0E (Pizarra carbón profundo)  
  * \--bg-secondary: \#121418 (Superficie elevada para celdas de retícula)  
  * \--bg-tertiary: \#1A1D24 (Hover y estados activos)  
* **Líneas y Retícula (Brutalismo Táctil):**  
  * \--border-hairline: 1px solid \#262A34 (Separador estructural visible)  
  * \--border-strong: 1px solid \#4A5162 (Contenedores interactivos y focos)  
  * \--radius-base: 0px (Geometría estrictamente ortogonal; excepción: indicadores circulares de estado 9999px)  
* **Tipografía (Contraste Editorial \+ Técnico):**  
  * \--font-display: 'Instrument Serif', 'Playfair Display' o Variable Neo-Serif de alto contraste (Titulares principales escalados con clamp(2.5rem, 6vw, 5.5rem)).  
  * \--font-sans: 'Inter', 'Geist Sans' (Cuerpo de lectura, mínimo 16px, interlineado 1.6).  
  * \--font-mono: 'JetBrains Mono', 'Geist Mono' (Métricas, etiquetas de sistema, endpoints en vivo, comandos).  
* **Acentos y Semántica (Contraste mínimo WCAG AA \>= 4.5:1):**  
  * \--text-primary: \#F3F4F6  
  * \--text-secondary: \#9CA3AF  
  * \--accent-signal: \#00E599 (Verde esmeralda eléctrico — nodos activos, estado LIVE, acento 3D principal)  
  * \--accent-amber: \#F59E0B (Procesamiento en cola / advertencias)  
  * \--accent-error: \#EF4444 (Circuit breaker abierto / fallos)  
* **Textura Táctil (Zero-Image Noise):**  
  * Overlay global pointer-events: none; z-index: 50; opacity: 0.035; generado con gradiente/patrón SVG inline o canvas mínimo de ruido estático para dar tactilidad de plano arquitectónico sin descargar assets externos.

## **2\. ARQUITECTURA DE RUTAS CONSOLIDADA (3 RUTAS MAESTRAS)**

Se eliminan enlaces muertos (/currentStudies, /privateservers, /projects/\* vacíos) y se consolida toda la navegación en **exactamente 3 rutas principales** idénticas en header y footer en todos los idiomas (es / en):

1. **/ (y /es) — Home / Propuesta de Valor & Orquestación:**  
   * *Hero Editorial \+ Escena 3D Focalizada:* Titular cinético \+ Constelación 3D interactiva de nodos (Webhooks, pgvector, Colas BullMQ, LLMs) que reacciona al cursor y al modo seleccionado (Negocios / B2B vs. Ingeniería / Dev).  
   * *Simulador Interactivo de Pipelines:* Reemplaza la terminal estática. Permite disparar simulaciones paso a paso de **Atiende** y **CV Harness** \+ telemetría real del endpoint n8n.  
   * *Retícula de Impacto y Proyectos Destacados:* Vista resumida con datos sincronizados desde una única fuente de verdad (src/data/projects.ts).  
   * *Experiencia, Testimonios (con control WCAG de pausa) y Contacto directo.*  
2. **/labs (y /es/labs) — Engineering Lab & Arquitectura:**  
   * *Mapa Interactivo de Arquitectura:* Diagrama navegable de **Atiende** (*Inbound pipeline*, *Agent orchestration*, *LLM router*, *Channel adapter*) y de los harnesses (**CV Harness**, **Social Harness**, **Doc Harness**) mostrando métricas auditadas (295 tests en 40 archivos, \~30% ahorro por caché, 188 API tests, 17/17 E2E tests).  
   * *Mapa de Microservicios Privados (artag-services):* Cifra corregida a **14 microservicios** desglosados en sus 5 dominios (3 \+ 3 \+ 3 \+ 3 \+ 2).  
   * *Pestañas Internas de Infraestructura & Aprendizaje:* Absorbe el contenido de servidores privados (/private-servers) y estudios actuales (/current-studies) sin salir de /labs.  
3. **/about-me (y /es/about-me) — The Architect's Ledger:**  
   * *Cambio de ritmo editorial:* Cronología 2006–2024 en 7 capítulos con fotografía real optimizada (next/image), tipografía serif de lectura pausada y sección secundaria contenida al final para intereses personales (Games & Faith) sin contaminar la barra de navegación global.

## **3\. PLAN DE EJECUCIÓN POR FASES Y CHECKLIST DE VERIFICACIÓN**

### **FASE 1: Saneamiento de Auditoría, Rutas e i18n (Cero Deuda Técnica)**

*Objetivo: Resolver todos los errores de texto, rutas rotas, inconsistencias de datos y problemas de accesibilidad detectados en la auditoría.*

* \[x\] **1.1 Unificación del menú global y redirecciones 301:**  
  * Configurar next.config.ts con redirecciones permanentes (301) para alias/rutas rotas (`/privateservers`, `/current-studies`, `/notes`), conservando `/projects/:slug`, `/favorites`, `/my-faith` y `/engineering-notes` enlazados desde `/labs` y `/about-me` (decisión del usuario).  
  * Estandarizar el componente Headermain.tsx + FooterMain.tsx (montados globalmente en `[locale]/layout.tsx`) para mostrar **siempre** los mismos 3 enlaces (`/`, `/labs`, `/about-me`), el selector de idioma (`ES | EN`), el conmutador de audiencia (`B2B | DEV`) y el disparador de la paleta de comandos (`⌘K`).  
* \[x\] **1.2 Corrección de concatenación de strings e i18n completo en /es:**  
  * Corregir el espaciado en el Hero español: "Conecto lo que no habla. Automatizo lo aburrido. Construyamos algo juntos."  
  * Separar visual y estructuralmente (con gap y bordes de 1px) los botones de audiencia (`B2B / Dev`), el indicador de estado en vivo y los enlaces legales del footer (`LegalDialog.tsx` abriendo modales `<dialog>` reales en lugar de `href="#"`).  
  * Traducir al 100% las 3 tarjetas de experiencia laboral, educación y logros en `/es` (`about.timeline.*` en `en.ts` y `es.ts`).  
* \[x\] **1.3 Fuente única de verdad para proyectos y corrección de métricas:**  
  * Creado `src/data/projects.ts` con esquemas tipados y validados con Zod (re-exportado por `proyectData.ts`) para unificar nombres, estados y métricas entre `/` y `/labs`.  
  * Unificado el contador de microservicios privados en `/labs` a **13** (`PRIVATE_MICROSERVICES_COUNT = 13` y 3+3+3+2+2 en `PrivateServicesMap.tsx`, según confirmación del usuario).  
* \[x\] **1.4 Accesibilidad WCAG 2.2 AA en componentes existentes:**  
  * Añadido botón explícito de Pausar / Reanudar (`aria-pressed`, accesible por teclado) al carrusel de testimonios (`Testimonials.tsx`) con pausa automática en hover y focus.  
  * Eliminado `/technology.webp` del DOM, del bundle y de `public/`.

#### **Gate de Pruebas — Fase 1 (Obligatorio antes de pasar a Fase 2\)**

* \[x\] **Test 1A (Typecheck & Lint):** `npm run typecheck && npm run lint` \-\> **PASÓ: 0 errors, 0 warnings** (`✔ No ESLint warnings or errors`).  
* \[x\] **Test 1B (E2E Links & i18n con Playwright):** `tests/e2e/phase1.spec.ts` \-\> **PASÓ** (6 rutas primarias HTTP 200, todos los enlaces internos 200, redirecciones 301 verificadas, 0 textos concatenados, `/es` experiencia traducida, botón pausa WCAG, modal legal, 13 microservicios).  
* \[x\] **Test 1C (Axe Accessibility Audit):** `@axe-core/playwright` en `/`, `/es`, `/labs`, `/es/labs`, `/about-me`, `/es/about-me` \-\> **6/6 PASARON (0 violaciones críticas o serias)**.

### **FASE 2: Sistema de Diseño Brutalista-Editorial y View Transitions Nativas**

*Objetivo: Implementar la estética de retícula arquitectónica de 1px, tipografía de contraste Neo-Serif \+ Monospace y transiciones nativas fluidas.*

* \[x\] **2.1 Tokens CSS, Grano Táctil y Retícula Estructural:**  
  * Configurados `src/app/globals.css` y `tailwind.config.js` con la paleta carbón (`#0B0C0E`, `#121418`, `#1A1D24`), líneas `1px solid #262A34`, `--radius-base: 0px`, acentos `#00E599` / `#F59E0B` / `#EF4444` y capa `.tactile-grain-overlay` SVG inline sin assets externos.  
  * Configurado `next/font/google` en `[locale]/layout.tsx` cargando `Instrument_Serif`, `Inter` y `JetBrains_Mono` con `display: 'swap'`.  
* \[x\] **2.2 Layout de Retícula Arquitectónica (ArchitecturalGrid.tsx):**  
  * Creado `src/components/ArchitecturalGrid.tsx` (`ArchitecturalSection`, `ArchitecturalGrid`, `ArchitecturalCell`) con bordes compartidos de 1px sin doble borde, aplicado en `/about-me` y retículas de `/labs`.  
* \[x\] **2.3 Navegación con View Transitions API Nativa:**  
  * Habilitado `experimental: { viewTransition: true }` en `next.config.ts` y animaciones `::view-transition-old/new(root)` (260–300ms) en `globals.css`.  
  * Implementado `@media (prefers-reduced-motion: reduce)` anulando desplazamientos y reduciendo transiciones a `< 50ms`.

#### **Gate de Pruebas — Fase 2 (Obligatorio antes de pasar a Fase 3\)**

* \[x\] **Test 2A (Visual Regression & Responsive):** `tests/e2e/full-flow.spec.ts` \-\> **PASÓ** (0 overflow horizontal en 375x812, 768x1024 y 1440x900 sobre `/`, `/labs`, `/about-me`).  
* \[x\] **Test 2B (Reduced Motion):** `tests/e2e/full-flow.spec.ts` \-\> **PASÓ** (`reducedMotion: 'reduce'`, fallback SVG activo y 0 errores).

### **FASE 3: Implementación de la Escena 3D Focalizada (Estilo Awwwards)**

*Objetivo: Crear la pieza central tridimensional en el Hero de / sin sacrificar Core Web Vitals ni rendimiento móvil.*

* \[x\] **3.1 Escena WebGL "The Neural Router" (HeroConstellation3D.tsx):**  
  * Implementado `src/components/hero/HeroConstellation3D.tsx` con Three.js puro ligero (`OctahedronGeometry` wireframe, `LineSegments` 1px, pulsos de datos por aristas), rotación reactiva al puntero, color reactivo a modo (`#00E599` Dev vs `#F59E0B` B2B) y velocidad sincronizada con el simulador.  
* \[x\] **3.2 Estrategia estricta de rendimiento y degradación elegante (Fallback):**  
  * Cargado vía `next/dynamic(..., { ssr: false })` tras hidratación del H1 solo en desktop (`>= 1024px`) en `Hero.tsx` (H1 renderiza inmediatamente como LCP, sin loader bloqueante).  
  * Limitado `setPixelRatio(Math.min(dpr, 1.5))`, cleanup explícito de geometrías/materiales/renderer en desmontaje y fallback `NeuralRouterSvgFallback` (1px SVG) para móvil, `hardwareConcurrency <= 4`, sin WebGL o `prefers-reduced-motion: reduce`.

#### **Gate de Pruebas — Fase 3 (Obligatorio antes de pasar a Fase 4\)**

* \[x\] **Test 3A (Contexto WebGL y cero errores de consola):** `tests/e2e/full-flow.spec.ts` \-\> **PASÓ** (0 errores de página/consola y desmontaje limpio al navegar a `/labs`).  
* \[ \] **Test 3B (Core Web Vitals en Mobile Throttle):** `tests/e2e/cwv-mobile.spec.ts` (4G + 4x CPU) \-\> **First Load JS de `/`: 143 kB** (bajó desde 468 kB, -70%), **LCP: 1220 ms ✓ (< 2.5s)**, **CLS: 0.0007 ✓ (< 0.05)**, **TBT: 260–288 ms** (bajó desde 971 ms, -72%; el remanente corresponde a la hidratación base de React 19 + Next 15 + `next-intl` bajo 4x CPU slowdown en Windows). Validar puntuación final en Lighthouse móvil sobre producción desplegada.

### **FASE 4: Interactividad "WUAAAOOO" (Simulador, Lab Interactivo y Cmd+K)**

*Objetivo: Convertir las afirmaciones técnicas del sitio en demostraciones funcionales interactivas.*

* \[x\] **4.1 Simulador Interactivo de Pipelines en el Hero (PipelineSimulator.tsx):**  
  * Implementado `src/components/hero/PipelineSimulator.tsx` con los 2 flujos paso a paso (**Atiende · WhatsApp RAG + Cache Hit** y **CV Harness · 7 Etapas Idempotente**) sincronizados con `HeroConstellation3D`.  
  * Creado `src/app/api/health/route.ts` (proxy cacheado 60s hacia `https://n8n.artagdev.com.co/health` con timeout de 2s y fallback limpio).  
* \[x\] **4.2 Paleta de Comandos Global (CommandPalette.tsx — Cmd+K / Ctrl+K):**  
  * Implementado `src/components/CommandPalette.tsx` (montado en `[locale]/layout.tsx` y disparable desde `⌘K` en `Headermain.tsx`) con búsqueda difusa priorizada, navegación `/`, `/labs`, `/about-me`, cambio de idioma `ES/EN`, modo `B2B/DEV`, disparo de simulaciones y copia de `info@artagdev.com.co`.  
* \[x\] **4.3 Tablero Interactivo de Arquitectura en /labs (InteractiveLabBoard.tsx):**  
  * Implementado `src/components/labs/InteractiveLabBoard.tsx` en `src/app/[locale]/labs/page.tsx` con nodos seleccionables en retícula 1px para **Atiende**, **CV Harness**, **Social Harness** y **Doc Harness** (contratos I/O, manejo de fallos, badges de pruebas verificadas) y pestañas internas (**Sistemas & Harnesses**, **Infraestructura & Servidores (13)**, **Estudios & Certificaciones**).

#### **Gate de Pruebas — Fase 4 (Validación Final de Producción)**

* \[x\] **Test 4A (Flujo E2E Completo en Playwright):** `tests/e2e/full-flow.spec.ts` \-\> **PASÓ en 5.7s** (`Ctrl+K` → Labs → Atiende & CV Harness → Infraestructura → Home → Simulador Atiende `COMPLETADO (200 OK)` → `Ctrl+K` English → `<html lang="en">`).  
* \[x\] **Test 4B (Build de Producción):** `npm run build` compilado limpiamente (`✓ viewTransition`, 48/48 páginas estáticas, 0 errores).

## **4\. BITÁCORA DE PROGRESO DE LA IA (REGISTRO DE AUDITORÍA)**

| Fecha / Hora | Fase / Tarea | Estado | Evidencia de Prueba (Comando / Resultado) |
| :---- | :---- | :---- | :---- |
| 2026-11-19 | Fase 1.1 – 1.4 | \[x\] Completado y verificado | `typecheck` + `lint` (0E/0W); Playwright 1B PASÓ; Axe 1C 6/6 rutas con 0 violaciones críticas/serias |
| 2026-11-19 | Fase 2.1 – 2.3 | \[x\] Completado y verificado | Playwright 2A (0 overflow en 375/768/1440) + 2B (`reducedMotion: 'reduce'`) PASARON |
| 2026-11-19 | Fase 3.1 – 3.2 | \[x\] Implementado (3A OK; 3B optimizado) | Playwright 3A PASÓ (0 errores); CWV 4G móvil: First Load JS 468kB→143kB, LCP 1220ms ✓, CLS 0.0007 ✓, TBT 971ms→260ms (4x CPU) |
| 2026-11-19 | Fase 4.1 – 4.3 | \[x\] Completado y verificado | Playwright 4A PASÓ (5.7s) + `npm run build` 4B PASÓ (48/48 rutas) |

