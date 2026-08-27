import { SiN8N, SiReact, SiPostgresql, SiGraphql, SiAmazon, SiDocker } from "react-icons/si";
import type { UseCase } from "./skillsData";

// ============ USE CASES DATA (Spanish) ============
export const useCasesDataEs: UseCase[] = [
  // ── PARA TODOS ──
  {
    id: "whatsapp-integrations",
    title: "Bots de WhatsApp y Mensajería",
    icon: SiN8N,
    iconColor: "text-green-400",
    tab: "everyone",

    problem: "Estás respondiendo los mismos mensajes manualmente, o tu equipo pierde solicitudes importantes porque llegan de demasiados lugares.",

    solution: "Construyo flujos de mensajería inteligentes que manejan preguntas comunes, enrutan mensajes a la persona correcta y hacen seguimiento automático — para que nada se te escape.",

    techStack: ["WhatsApp API", "n8n", "Webhooks"],

    capabilities: [
      "Mensajes de bienvenida y FAQs automatizados",
      "Enrutamiento inteligente a miembros del equipo",
      "Confirmaciones de pedidos y seguimientos",
      "Integración con tu CRM u hoja de cálculo",
    ],

    metrics: [
      {
        label: "Mensajes Gestionados",
        value: "1,000+",
        description: "Automatizados mensualmente"
      },
      {
        label: "Tiempo de Respuesta",
        value: "<5 seg",
        description: "Respuesta automática promedio"
      },
      {
        label: "Trabajo Manual Ahorrado",
        value: "10+ hrs/semana",
        description: "Para equipos pequeños"
      }
    ],

    process: [
      "Mapear tu flujo de mensajes actual",
      "Diseñar la lógica de automatización",
      "Conectar WhatsApp + tus herramientas",
      "Probar con escenarios reales",
      "Lanzar y monitorear"
    ]
  },
  {
    id: "service-connections",
    title: "Conectando Tus Herramientas",
    icon: SiN8N,
    iconColor: "text-blue-400",
    tab: "everyone",

    problem: "Tus datos están dispersos entre hojas de cálculo, CRMs, correos y apps que no se hablan entre sí. Estás copiando información manualmente entre ellas.",

    solution: "Construyo puentes invisibles entre tus herramientas para que los datos fluyan automáticamente. Cuando algo cambia en un lugar, se actualiza donde debe.",

    techStack: ["n8n", "APIs", "Webhooks"],

    capabilities: [
      "Conecta Google Sheets, correo, CRMs y más",
      "Sincroniza datos automáticamente entre plataformas",
      "Dispara acciones cuando algo cambia",
      "Alertas de error para que sepas si algo se rompe",
    ],

    metrics: [
      {
        label: "Servicios Conectados",
        value: "12+",
        description: "Plataformas diferentes integradas"
      },
      {
        label: "Flujos Activos",
        value: "50+",
        description: "Corriendo a diario en producción"
      },
      {
        label: "Tasa de Error",
        value: "<0.1%",
        description: "Confiabilidad automatizada"
      }
    ],

    process: [
      "Auditar tus herramientas actuales y puntos de dolor",
      "Diseñar el flujo de datos",
      "Construir y probar las conexiones",
      "Desplegar con monitoreo",
      "Entregar documentación"
    ]
  },
  {
    id: "custom-dashboards",
    title: "Dashboards Personalizados y Herramientas Internas",
    icon: SiReact,
    iconColor: "text-blue-400",
    tab: "everyone",

    problem: "Necesitas ver tus datos en un solo lugar — ventas, inventario, rendimiento del equipo — pero las herramientas genéricas son caras o no se ajustan a tu flujo.",

    solution: "Construyo dashboards web limpios y rápidos, adaptados exactamente a lo que necesitas ver. Sin relleno, sin funciones sin usar — solo los datos que te importan.",

    techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],

    capabilities: [
      "Visualización de datos en tiempo real",
      "Acceso por roles para tu equipo",
      "Dashboards amigables para móvil",
      "Conexión a tus bases de datos existentes",
    ],

    metrics: [
      {
        label: "Tiempo de Construcción",
        value: "2-4 semanas",
        description: "Proyecto típico de dashboard"
      },
      {
        label: "Dispositivos",
        value: "Todos",
        description: "Escritorio, tablet y móvil"
      },
      {
        label: "Actualizaciones",
        value: "Tiempo real",
        description: "Los datos se refrescan en vivo"
      }
    ]
  },
  // ── PARA DESARROLLADORES ──
  {
    id: "zero-downtime-migrations",
    title: "Migraciones de Base de Datos sin Downtime",
    icon: SiPostgresql,
    iconColor: "text-blue-500",
    tab: "developer",

    problem: "Sistemas legacy con millones de registros necesitan migrar a bases de datos modernas sin perder datos ni interrumpir el servicio. Las migraciones tradicionales causan downtime medido en horas.",

    solution: "Diseño y ejecuto estrategias de migración multifase con procesamiento paralelo, verificación por checksums y replicación de logs binarios para garantizar transiciones sin downtime.",

    techStack: ["PostgreSQL", "MySQL", "Docker", "AWS", "Node.js", "TypeScript"],

    capabilities: [
      "Diseñar arquitecturas de migración sin downtime",
      "Implementar sistemas de verificación de consistencia",
      "Construir pipelines de procesamiento paralelo para datasets grandes",
      "Crear procedimientos de rollback y mecanismos a prueba de fallos",
      "Monitorear la salud de la migración en tiempo real",
      "Optimizar para 99.99% de uptime"
    ],

    metrics: [
      {
        label: "Usuarios Migrados",
        value: "32,000+",
        description: "Registros migrados sin pérdida de datos"
      },
      {
        label: "Tasa de Error",
        value: "0.004%",
        description: "Integridad de datos mantenida en toda la migración"
      },
      {
        label: "Downtime",
        value: "0 segundos",
        description: "Ejecución completamente sin downtime"
      }
    ],

    process: [
      "Analizar el esquema y las restricciones de la base de datos fuente",
      "Diseñar la estrategia de replicación multi-etapa",
      "Configurar sistemas de verificación paralelos",
      "Ejecutar transferencias incrementales con checksums",
      "Monitorear la integridad continuamente",
      "Realizar el corte instantáneo con cero downtime"
    ]
  },
  {
    id: "multi-gateway-payments",
    title: "Integración de Pagos Multi-Pasarela",
    icon: SiGraphql,
    iconColor: "text-pink-500",
    tab: "developer",

    problem: "Manejar pagos de múltiples pasarelas (PayValid, AvallPay, etc.) con protocolos, manejo de errores y requisitos diferentes. Se necesita enrutamiento inteligente para prevenir fallos de pago y optimizar costos.",

    solution: "Construyo una capa de orquestación de pagos flexible e inteligente que enruta transacciones basándose en tasas de éxito, comisiones, regiones geográficas y tipos de transacción.",

    techStack: ["Node.js", "Express", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],

    capabilities: [
      "Integrar múltiples procesadores de pago",
      "Implementar enrutamiento inteligente de transacciones",
      "Construir sistemas de fallback de pagos conscientes del contexto",
      "Manejar conciliación y auditoría de transacciones",
      "Crear dashboards de monitoreo de pagos en tiempo real",
      "Soportar escenarios de pago complejos (casos borde de $25M+)"
    ],

    metrics: [
      {
        label: "Volumen Típico",
        value: "$2M+",
        description: "Procesamiento diario de transacciones"
      },
      {
        label: "Capacidad Pico",
        value: "$25M",
        description: "Transacciones en casos borde manejadas"
      },
      {
        label: "Tasa de Éxito",
        value: "99.7%+",
        description: "Gracias al enrutamiento inteligente y fallbacks"
      }
    ],

    example: "Enrutar transacciones internacionales por pasarelas con menores comisiones, usar pasarelas premium como fallback ante fallos, manejar conversiones de moneda y proporcionar conciliación en tiempo real."
  },
  {
    id: "performance-optimization",
    title: "Optimización de Sistemas de Alto Rendimiento",
    icon: SiAmazon,
    iconColor: "text-orange-400",
    tab: "developer",

    problem: "Aplicaciones que sufren tiempos de carga lentos, alta latencia y poca escalabilidad. Usuarios con experiencia degradada bajo carga.",

    solution: "Auditoría de rendimiento integral en todo el stack: optimización de base de datos, estrategias de caché, eficiencia de código, escalado de infraestructura y optimización de recursos.",

    techStack: ["TypeScript", "Node.js", "React", "Next.js", "PostgreSQL", "Redis", "AWS", "Docker"],

    capabilities: [
      "Perfilar e identificar cuellos de botella de rendimiento",
      "Implementar optimización de consultas de base de datos",
      "Diseñar estrategias de caché (Redis, CDN)",
      "Optimizar tamaños de bundle y renderizado frontend",
      "Implementar lazy loading y code splitting",
      "Escalar infraestructura horizontalmente"
    ],

    metrics: [
      {
        label: "Mejora Promedio",
        value: "40-60%",
        description: "Ganancias de rendimiento en los sistemas"
      },
      {
        label: "Tiempo de Carga",
        value: "TBD",
        description: "Completar tras la implementación"
      },
      {
        label: "Usuarios Concurrentes",
        value: "TBD",
        description: "Incremento en la carga concurrente soportada"
      }
    ]
  },
  {
    id: "scalable-architecture",
    title: "Arquitectura de Microservicios Escalable",
    icon: SiDocker,
    iconColor: "text-blue-400",
    tab: "developer",

    problem: "Aplicaciones monolíticas que luchan por escalar. Necesidad de manejar millones de usuarios concurrentes con escalado independiente de servicios.",

    solution: "Diseño e implemento arquitectura de microservicios con contenedorización, orquestación, descubrimiento de servicios y estrategias de escalado independiente.",

    techStack: ["Docker", "AWS", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "GraphQL", "Git"],

    capabilities: [
      "Diseñar patrones de comunicación entre microservicios",
      "Implementar descubrimiento de servicios y balanceo de carga",
      "Construir modelos de datos escalables entre servicios",
      "Crear pipelines de despliegue y CI/CD",
      "Implementar tracing distribuido y monitoreo",
      "Liderar equipos en la implementación de la arquitectura"
    ],

    metrics: [
      {
        label: "Usuarios Concurrentes",
        value: "100K+",
        description: "Soportados por la arquitectura de microservicios"
      },
      {
        label: "Tamaño de Equipo",
        value: "2-5+",
        description: "Liderados durante la implementación"
      },
      {
        label: "Independencia de Servicios",
        value: "Alta",
        description: "Cada servicio escala independientemente"
      }
    ]
  },
  {
    id: "real-time-features",
    title: "Funciones en Tiempo Real y Actualizaciones en Vivo",
    icon: SiReact,
    iconColor: "text-blue-300",
    tab: "developer",

    problem: "Las aplicaciones necesitan actualizaciones de datos en vivo sin polling. Los usuarios esperan notificaciones instantáneas y funciones colaborativas en tiempo real.",

    solution: "Implemento infraestructura de tiempo real basada en WebSockets con broadcast eficiente de mensajes, sistemas de presencia y latencia menor a 100ms.",

    techStack: ["React", "Next.js", "Node.js", "WebSockets", "TypeScript", "PostgreSQL"],

    capabilities: [
      "Implementar servidores y clientes WebSocket",
      "Construir sistemas de presencia y seguimiento de actividad",
      "Diseñar broadcast eficiente de mensajes",
      "Crear funciones colaborativas en tiempo real",
      "Manejar resiliencia de conexión y reconexión",
      "Mantener latencia sub-100ms bajo carga"
    ],

    metrics: [
      {
        label: "Latencia",
        value: "<100ms",
        description: "Latencia promedio de ida y vuelta de mensajes"
      },
      {
        label: "Conexiones Pico",
        value: "TBD",
        description: "Conexiones WebSocket concurrentes soportadas"
      },
      {
        label: "Velocidad de Broadcast",
        value: "Sub-segundo",
        description: "Entrega de actualizaciones a todos los clientes conectados"
      }
    ]
  },
  {
    id: "automation-workflows-dev",
    title: "Automatización Avanzada de Flujos de Trabajo",
    icon: SiN8N,
    iconColor: "text-blue-500",
    tab: "developer",

    problem: "Lógica de negocio compleja que abarca múltiples servicios necesita automatización confiable con manejo de errores, reintentos y monitoreo.",

    solution: "Diseño y construyo flujos de automatización de grado producción con lógica condicional, recuperación de errores, colas de mensajes muertos y observabilidad.",

    techStack: ["n8n", "Node.js", "TypeScript", "GraphQL", "PostgreSQL", "AWS"],

    capabilities: [
      "Diseñar automatización de flujos complejos",
      "Integrar 50+ servicios y APIs diferentes",
      "Construir lógica condicional y manejo de errores",
      "Crear sistemas de monitoreo y alertas",
      "Diseñar pipelines de transformación de datos",
      "Implementar sistemas de webhooks y programación"
    ],

    metrics: [
      {
        label: "Flujos Construidos",
        value: "50+",
        description: "Flujos de automatización en producción"
      },
      {
        label: "Horas Manuales Ahorradas",
        value: "TBD",
        description: "Impacto semanal de la automatización"
      },
      {
        label: "Tasa de Error",
        value: "<0.1%",
        description: "Confiabilidad de los flujos automatizados"
      }
    ]
  }
]

// Localized use cases map. Select by locale: useCasesByLocale[locale]
export const useCasesByLocale: Record<"en" | "es", UseCase[]> = {
  en: [],
  es: useCasesDataEs,
}
