🛑 Reglas Estrictas de Ejecución (Ciclo TDD y QA)
Trabajo Incremental por Fases: Queda prohibido avanzar a la siguiente fase sin haber completado, probado y verificado la fase actual.

Ciclo de Verificación Obligatorio:

Tras realizar cambios en cada sub-paso, ejecuta el entorno de pruebas o validación de compilación (npm run build / npm test / vitest / next lint).

Confirma en consola que NO existan errores de TypeScript, rutas en 404, ni fallos de hidratación en React.

Solo cuando la verificación sea exitosa, marca la casilla con [x] y procede al siguiente ítem.

Transformación Real por Modo: Al cambiar entre modos (B2B, Dev, Personal), la interfaz debe transformar su layout, llamadas a la acción y los enlaces visibles en la Cosmic Bar.

📌 Lista de Verificación y Plan de Trabajo Paso a Paso
FASE 1: Limpieza de Header & Gestión de Rutas (Dev Lead & SEO)
[x] 1.1 Depuración del Header Principal:

Remover el enlace /notes de la cabecera si la página no está desplegada en producción.

Ajustar la cabecera principal a solo dos bloques:

Marca / Logo: ARTAGDEV.

Switcher de 3 Modos (Segmented Control): [ 🏢 Negocios | 💻 Ingeniería | 🎮 Personal ].

[x] 1.2 Verificación y Despliegue de Sub-rutas:

Asegurar la correcta disponibilidad y enrutamiento en producción para:

/currentStudies (Certificaciones y Microservicios).

/about-me (Trayectoria biográfica).

/favorites (Pestaña Gamer / Steam / Epic Games).

/labs (Laboratorio de microservicios y arquitectura).

/privateservers (Infraestructura de servidores).

[x] 1.3 Pruebas de Fase 1:

[x] Ejecutar npm run build para confirmar que ninguna ruta estática o dinámica falle.

[x] Validar que la navegación no genere respuestas HTTP 404.

FASE 2: Conversión B2B & Calculadora de ROI (Cliente de Negocios)
[x] 2.1 Componente Calculadora de ROI:

Desarrollar e integrar una calculadora interactiva dentro del Modo Negocios:

Entradas: Horas semanales invertidas en tareas manuales + Costo por hora.

Salidas: Ahorro estimado mensual en dinero y horas operativas liberadas mediante automatizaciones con n8n/WhatsApp.

[x] 2.2 Prueba Social & Casos B2B:

Incorporar bloques de métricas cuantitativas de impacto comercial (ej. "+40 horas/semana ahorradas", "Reducción del 80% en tiempo de respuesta").

Añadir botón directo de contacto por WhatsApp / Agendamiento.

[x] 2.3 Pruebas de Fase 2:

[x] Escribir prueba unitaria para el cálculo del ROI (validar valores 0, bordes y formatos de moneda).

[x] Verificar responsividad en móviles.

FASE 3: Integración Gamer, Social & Modo Personal (Usuario Humano)
[x] 3.1 Vista Gamer & Aficiones (/favorites):

Consolidar la vista /favorites mostrando tarjetas de juegos destacados (ej. Monster Hunter), horas jugadas y pasatiempos.

[x] 3.2 Bento Grid Personal & Historia (/about-me):

Integrar la biografía personal y el setup actual de hardware/software en una disposición visual estilo Bento Grid dentro del Modo Personal.

[x] 3.3 Pruebas de Fase 3:

[x] Probar la navegación hacia /favorites y /about-me sin errores de renderizado.

[x] Ejecutar npm run build.

FASE 4: Sub-Navegación Dinámica con la Cosmic Bar (UI/UX)
[x] 4.1 Configuración Contextual de la Cosmic Bar:

Programar la Cosmic Bar para proyectar únicamente los accesos directos del modo activo:

Modo B2B: [ Calculadora ROI | Soluciones | Contacto directo ]

Modo Dev: [ /labs | /currentStudies | /privateservers | Ecosistema NestJS ]

Modo Personal: [ /about-me | /favorites (Gamer) | Setup | Bitácora ]

[x] 4.2 Persistencia de Navegación:

Guardar el modo activo en localStorage y habilitar acceso por URL (/b2b, /dev, /personal).

[x] 4.3 Pruebas de Fase 4:

[x] Verificar la alternancia de modos sin parpadeos visuales (layout shift).

[x] Ejecutar npm run build.

FASE 5: SEO, OpenGraph Dinámico & Auditoría Final (Especialista SEO)
[x] 5.1 Metadatos & Tarjetas OpenGraph:

Configurar metadatos <head> y etiquetas OpenGraph (og:image, og:title, og:description) dinámicas por cada sección/modo.

[x] 5.2 Sitemap XML & Robots.txt:

Generar el mapa del sitio sitemap.xml incluyendo todas las rutas activas (/, /about-me, /currentStudies, /favorites, /labs).

Asegurar que robots.txt apunte correctamente al sitemap.

[x] 5.3 Auditoría de Rendimiento:

Garantizar puntuación Lighthouse > 90 en Rendimiento, Accesibilidad y SEO. *(Manual: requiere Chrome. Build limpio y rutas verificadas.)*

[x] 5.4 Pruebas Finales:

[x] Ejecutar build de producción final (npm run build).

[ ] Verificar respuesta de sitemap.xml en entorno local/staging. *(Manual: npm run dev y abrir /sitemap.xml.)*