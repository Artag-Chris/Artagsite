# Social Harness — fuente editorial del portfolio

Última verificación: 2026-10-29.

## Resumen

Social Harness es un coach de redes sociales con IA para Instagram, TikTok, YouTube y LinkedIn. Recolecta señales de tendencia, evalúa su relevancia para cada perfil y genera ideas, calendario y borradores bajo demanda. No publica automáticamente: la persona revisa y decide.

## Problema

Crecer una cuenta suele implicar revisar tendencias, comparar formatos y planificar contenido manualmente. El proyecto convierte ese trabajo en un pipeline medible sin entregar el control editorial a la IA.

## Evidencia utilizable

- Cuatro redes objetivo y cuentas por perfil.
- Cinco tipos de fuente: YouTube Data API, Google Trends, RSS/Google News, páginas públicas mediante recetas CSS e inspiración manual.
- Pipeline BullMQ sobre Redis con PostgreSQL, pgvector y Prisma.
- Prefiltro determinístico y una llamada de IA agrupada por perfil y ciclo.
- Borradores y reportes generados solo bajo demanda.
- Multiusuario mediante `ownerId`/`businessId` desde el diseño.
- Fases 0–5 documentadas como implementadas; fase 6 de verificación E2E en servidor y conectores oficiales de métricas pendiente.

## Decisiones técnicas

- Human-in-the-loop: no existe publicación automática en la versión actual.
- Costo acotado por diseño: prefiltro gratuito, IA por lote, umbrales y acciones costosas bajo demanda.
- Puerto y adaptadores para fuentes y proveedores de IA.
- Deduplicación no destructiva con posibilidad de revertir falsos positivos.
- Redes y formatos como catálogo, evitando migraciones para añadir una red.
- Sin scraping de sesiones autenticadas ni bypass de protecciones.

## Limitaciones y estado

- Prototipo validado funcionalmente; no se presenta como producto con audiencia o clientes.
- Falta la verificación E2E en el servidor.
- Las métricas se cargan manualmente o por CSV mientras se incorporan conectores oficiales.
- La ausencia de publicación automática es una decisión de producto, no una limitación accidental.

## Contenido que falta para ampliar el caso

- Video del flujo completo.
- Capturas reales y sanitizadas del dashboard.
- Resultados medidos de calidad de ideas, ahorro de tiempo o costo por ciclo.
- URL pública del repositorio si se decide publicarlo.
