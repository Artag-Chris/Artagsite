# DOCUMENTO MAESTRO DE EJECUCIÓN V2 - ARTAGDEV (RESTAURACIÓN Y VIDA EN 3 CAMINOS)

> **Para la IA en OpenCode / Cursor / Claude Code**
> **Rol:** Senior Frontend Architect, UI/UX Lead & QA Automation Engineer.
> **Objetivo:** Devolverle la VIDA y autenticidad humana a `artagdev.com.co`. Restaurar todas las rutas históricas perdidas (`/favorites`, `/currentStudies`, `/privateservers`, Historia personal, Cosmic Bar) e integrarlas dentro de una arquitectura dinámica de 3 Caminos (B2B, Dev, Personal) donde CADA MODO TRANSFORMA TOTALMENTE la experiencia.

---

## 🛑 Reglas Fundamentales de Ejecución (Ciclo TDD y QA)

1. **Trabajo Incremental Paso a Paso:** NO avances a la siguiente fase sin completar, probar y verificar la anterior.
2. **Ciclo de Pruebas Autónomo (TDD):**
   * Tras modificar o crear archivos en cada fase, ejecuta la suite de pruebas o el build check (`npm run build` / `npm test` / `vitest`).
   * Valida en consola que no existan errores de compilación TypeScript o fallos en tiempo de ejecución.
   * Solo cuando las pruebas pasen al 100%, marca la casilla como completada `[x]` y procede al siguiente ítem.
3. **Persistencia & Modos Radicalmente Distintos:**
   * Al cambiar de modo (B2B | Dev | Personal), **no modifiques únicamente un banner**. La página completa debe transformar su tema, tono, héroe, componentes y navegación.

---

## 📌 Lista de Verificación y Plan de Ejecución paso a paso

### FASE 1: Limpieza de Header & Restauración de la Cosmic Bar (Navegación)

* [x] **1.1** **Descongestionado del Header Principal:**
  * Reducir el Header principal a solo **dos elementos clave**:
    1. Logo / Brand: `ARTAGDEV`.
    2. Segmented Control Switcher (3 Pestañas): `[ 🏢 Negocios | 💻 Ingeniería | 🎮 Personal ]`.
  * Eliminar la sobrecarga de enlaces estáticos en el Header superior.

* [x] **1.2** **Restauración de la Cosmic Bar (Sub-navegación Dinámica):**
  * Reimplementar el componente **Cosmic Bar** como una barra de herramientas contextual que aparece de forma fluida cuando el usuario explora en profundidad.
  * La Cosmic Bar proyectará los accesos directos específicos del Modo Activo:
    * Modo B2B: `[ Calculadora ROI | Soluciones | Contacto WhatsApp ]`
    * Modo Dev: `[ /labs (Certificaciones + ADRs) | /privateservers | Ecosistema NestJS ]`
    * Modo Personal: `[ Mi Historia | /favorites (Steam/Epic) | Setup & Hardware | Bitácora ]`

* [x] **1.3** **Pruebas y Verificación de Fase 1:**
  * [x] Ejecutar `npm run build` / tests de renderizado del Header.
  * [x] Comprobar persistencia del modo seleccionado en `localStorage`.

---

### FASE 2: Restauración de Contenido Humano (Camino Personal / Life)

* [x] **2.1** **Reintegración de la API de Videojuegos (`/favorites` - Steam & Epic Games):**
  * Recuperar la vista `/favorites` conectada con Steam/Epic Games (o datos en caché/mock resiliente).
  * Mostrar tarjetas interactivas de juegos favoritos, horas jugadas, logros y actividad reciente.

* [x] **2.2** **Sección "Mi Historia" & Trayectoria:**
  * Recuperar la narrativa personal de Christian Henao (orígenes en Pereira, evolución de programador a arquitecto).
  * Incluir fotos, hitos personales y filosofía de trabajo/vida.

* [x] **2.3** **Bento Grid Humano:**
  * Crear la vista Bento Grid interactiva con: Setup de hardware, música/podcasts, lecturas actuales y pasatiempos.

* [x] **2.4** **Pruebas y Verificación de Fase 2:**
  * [x] Verificar que la ruta `/favorites` sea accesible tanto de forma directa como dentro del modo Personal.
  * [x] Ejecutar `npm run build` y asegurar 0 errores.

---

### FASE 3: Restauración del Laboratorio Técnico & Servidores (`/labs`, `/currentStudies` y `/privateservers`)

* [x] **3.1** **Restauración de Certificaciones y Estudios (`/currentStudies`):**
  * Reintegrar las certificaciones oficiales, títulos y cursos completados que fueron retirados.
  * Integrar `/currentStudies` como una pestaña o módulo destacado dentro de **`/labs`**.

* [x] **3.2** **Restauración de `/privateservers`:**
  * Rehabilitar la vista e información sobre la infraestructura de servidores privados, instancias Docker y entornos de despliegue.

* [x] **3.3** **Formateo de Proyectos bajo Metodología STAR:**
  * Presentar proyectos como *Atiende* y los 13 microservicios mediante fichas de arquitectura (Problema → Arquitectura NestJS/Redis/pgvector → Resultado cuantitativo).

* [x] **3.4** **Pruebas y Verificación de Fase 3:**
  * [x] Comprobar que `/currentStudies` y `/privateservers` no den error 404 y rendericen correctamente.
  * [x] Ejecutar `npm run build`.

---

### FASE 4: Modo Negocios (B2B) & Herramientas de Conversión

* [x] **4.1** **Calculadora Interactiva de ROI:**
  * Crear la herramienta financiera donde el cliente ingrese horas semanales dedicadas a tareas manuales y calcule el ahorro económico mensual al automatizar.

* [x] **4.2** **Formulario Directo & Flujo WhatsApp:**
  * Integrar llamadas a la acción (CTA) comerciales enfocadas en resolución de problemas empresariales (Bots, n8n, integraciones CRM).

* [x] **4.3** **Pruebas y Verificación de Fase 4:**
  * [x] Test unitario con valores borde en la calculadora ROI.
  * [x] Ejecutar `npm run build`.

---

### FASE 5: Experiencia Inmersiva & QA Final

* [x] **5.1** **Transiciones de Modo Radicales (Efecto "Página Viva"):**
  * Aplicar cambios visuales diferenciados por modo:
    * *Modo B2B:* Tono ejecutivo, acentos verde esmeralda y azul financiero.
    * *Modo Dev:* Tono ciberpunk/IDE, acentos cyan, fuentes monoespaciadas y esquemas de arquitectura.
    * *Modo Personal:* Tono cálido, púrpura/neón suave, tarjetas bento y elementos visuales de videojuegos.

* [x] **5.2** **Pruebas de Integración y Rendimiento:**
  * [x] Ejecutar auditoría de compilación final (`npm run build`). *(Completado: build limpio, 47 rutas.)*
  * [ ] Verificar respuesta responsive en móvil y escritorio. *(Manual: revisar en navegador.)*

---

## 🛠️ Comando de Inicio para OpenCode

Copia y pega este mensaje dentro de OpenCode para iniciar la restauración:

> "Lee el archivo `prompt_instrucciones_v2.md`. Vamos a solucionar los problemas de UX y la pérdida de contenido en artagdev.com.co. Inicia por la **FASE 1 (Limpieza del Header y Restauración de la Cosmic Bar)**. Cuando ejecutes las pruebas y el build esté en verde, marca las casillas de la Fase 1 y avísame para continuar con la Fase 2."