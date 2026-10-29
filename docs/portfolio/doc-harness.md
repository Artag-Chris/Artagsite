# Doc Harness — fuente editorial del portfolio

Última verificación: 2026-10-29.

## Resumen

Doc Harness transforma documentos mediante IA y los exporta como Word, PDF o Excel. Permite reescribir, anonimizar, convertir y generar documentos desde plantillas, con edición intermedia por bloques y sin depender de cuentas externas de ofimática.

## Problema

Los documentos quedan atrapados entre formatos y herramientas que exigen cuentas o cargar archivos a servicios de terceros. El proyecto separa extracción, transformación, edición y renderizado para conservar control sobre el contenido y evitar llamadas de IA innecesarias.

## Evidencia utilizable

- Entradas: PDF, DOCX, XLSX, CSV, TXT y Markdown.
- Salidas: PDF, DOCX y XLSX.
- Representación intermedia estructurada en bloques, editable desde el dashboard.
- Adaptadores para extracción, renderizado, almacenamiento y proveedores de IA.
- Anonimización con propuesta de entidades y aprobación humana antes del reemplazo literal.
- Generación local de archivos con `docx`, `pdfkit` y `exceljs`.
- Backend con 11 tests y E2E real del stack con 17/17 comprobaciones en modo mock.

## Decisiones técnicas

- El contenido intermedio permite editar y volver a renderizar sin otra llamada al modelo.
- La IA propone datos a anonimizar; el usuario aprueba el mapeo y el reemplazo es determinístico.
- PDF mediante `pdfkit`, evitando Chromium y dependencias pesadas.
- Normas como catálogo en código, sin migraciones para añadir una norma.
- Infraestructura compartida con aislamiento por base y prefijo de colas.

## Limitaciones y estado

- Prototipo validado; no se presenta como servicio público activo.
- El E2E se ejecutó con mock determinístico.
- Falta validar la generación con la llave real de DeepSeek.
- No afirmar paridad visual perfecta con Microsoft Word ni compatibilidad universal de PDFs.

## Contenido que falta para ampliar el caso

- Video de subir, editar, anonimizar y exportar.
- Documentos de ejemplo sin información personal.
- Resultados con proveedor real y comparación de fidelidad por formato.
- URL pública del repositorio si se decide publicarlo.
