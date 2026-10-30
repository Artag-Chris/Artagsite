# DOCUMENTO MAESTRO DE EJECUCIÓN - REDISEÑO ARTAGDEV (3 CAMINOS)
> **Instrucciones para la IA en OpenCode / Cursor / Claude Code**
> **Modo de Operación:** Senior Frontend Architect, UI/UX Lead & QA Automation Engineer.

---

## 🛑 Reglas Fundamentales de Ejecución
1. **Paso a Paso Obligatorio:** NO puedes pasar al siguiente paso sin haber completado, probado y verificado el paso anterior.
2. **Ciclo TDD y Verificación Autónoma:** 
   - Tras escribir/modificar el código de un paso, **DEBES** ejecutar los tests (`npm test` / `vitest` / `playwright` o build check `npm run build`).
   - Verifica en consola que no existan errores de TypeScript, advertencias de linter o errores en runtime.
   - Solo cuando las pruebas pasen exitosamente, marca el paso como completado `[x]` y procede.
3. **Escalabilidad y Limpieza:** El código debe ser modular, utilizando componentes reutilizables en React/Next.js y Tailwind CSS, manteniendo tipado estricto en TypeScript.

---

## 📌 Estado de Avance (Checklist Activo)

### FASE 1: Arquitectura de Navegación & Switcher de 3 Caminos
- [x] **1.1** Crear el estado global o Context (`ViewModeContext`) con los modos: `'b2b' | 'dev' | 'personal'`.
- [x] **1.2** Implementar persistencia en `localStorage` y soporte para rutas directas (`/b2b`, `/dev`, `/personal`).
- [x] **1.3** Diseñar el **Header Switcher** interactivo con las 3 pestañas.
- [x] **1.4** Crear el **Hero Quick-Selector** (pills de orientación en la vista principal).
- [x] **1.5** **Pruebas de Fase 1:**
  - [x] Verificar cambio de estado sin parpadeo.
  - [x] Test unitario/componente de la persistencia en `localStorage` (`scripts/test-viewmode.mjs`, 15/15 OK).
  - [x] Ejecutar `npm run build` y asegurar 0 errores.

---

### FASE 2: Modo Negocios (B2B) & Conversión Commercial
- [x] **2.1** Redactar e integrar el Copy comercial enfocado en automatización de procesos (n8n, bots de WhatsApp, conectores ERP).
- [x] **2.2** Desarrollar el componente interactivo **Calculadora de ROI/Ahorro**:
  - Input: Horas semanales invertidas en tareas manuales + Costo promedio por hora.
  - Output: Ahorro proyectado mensual/anual al automatizar.
- [x] **2.3** Formatear casos de éxito B2B con enfoque en retorno de inversión.
- [x] **2.4** **Pruebas de Fase 2:**
  - [x] Test numérico de la Calculadora de ROI (casos borde: 0 horas, valores negativos).
  - [x] Prueba de responsividad en pantallas móviles (layout responsive con Tailwind).
  - [x] Ejecutar `npm run build`.

---

### FASE 3: Modo Ingeniería (Dev) & Laboratorio de Arquitectura
- [x] **3.1** Migrar y reestructurar la ruta `/currentStudies` a `/labs` (o `/architecture-handbook`).
- [x] **3.2** Formatear los proyectos técnicos (Atiende, microservicios) bajo la **metodología STAR**:
  - *Situation / Task / Architecture (NestJS, Redis, pgvector) / Results*.
- [x] **3.3** Crear visor o esquema interactivo para los 13 microservicios privados (`artag-services`).
- [x] **3.4** **Pruebas de Fase 3:**
  - [x] Verificación de renderizado de esquemas/diagramas en HTML/Tailwind.
  - [x] Comprobar que no existen roturas de links hacia el laboratorio.
  - [x] Ejecutar `npm run build`.

---

### FASE 4: Modo Personal (Life, Hobbies & Bitácora)
- [x] **4.1** Crear la vista de **Lado Personal** con diseño **Bento Grid**:
  - Bloque 1: Hardware & Setup actual.
  - Bloque 2: Lecturas / Podcasts / Música actual.
  - Bloque 3: Proyectos de pasatiempo y experimentos fuera del trabajo.
  - Bloque 4: Bitácora / Micro-blogging personal.
- [x] **4.2** Asegurar un tono cálido y humano pero diferenciado del ámbito profesional.
- [x] **4.3** **Pruebas de Fase 4:**
  - [x] Test de diseño adaptativo del Bento Grid en tablet y móvil (grid responsive con Tailwind).
  - [x] Ejecutar `npm run build`.

---

### FASE 5: Integración Final, SEO & Telemetría
- [x] **5.1** Configurar Meta-tags de SEO dinámicos según el modo activo (OpenGraph para B2B, Dev y Personal).
- [x] **5.2** Integrar eventos de analítica (Analytics) para rastrear cuál de los 3 caminos es el más seleccionado por los usuarios.
- [x] **5.3** **Pruebas Integrales:**
  - [ ] Realizar auditoría Lighthouse (Performance > 90, Accessibility > 90). *(Manual: requiere Chrome + `npx lighthouse`. No disponible en este entorno.)*
  - [ ] Test E2E final navegando por todas las rutas y conmutadores. *(Manual: verificar en navegador tras `npm run dev`.)*
  - [x] Build de producción final limpio (`npm run build`).

---

## 🛠️ Instrucción de Inicio para OpenCode

Para comenzar la ejecución, ejecuta el siguiente comando o envía este mensaje inicial:

> "Lee el archivo `prompt_instrucciones_opencode.md`. Empieza únicamente por la **FASE 1**. Crea los componentes correspondientes, ejecuta los tests de verificación y, cuando la build y las pruebas pasen al 100%, marca las casillas de la Fase 1 como completadas antes de pedirme confirmación para la Fase 2."