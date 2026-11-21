import { OFFICIAL_NAP, PILLAR_ROUTES } from "@/lib/seo/routes"

export type PillarId =
  | "ai-engineering"
  | "local-pereira"
  | "microservices"
  | "cybersecurity"
  | "software-development"

export interface PillarMetric {
  value: string
  label: string
  detail: string
}

export interface PillarCapability {
  code: string
  title: string
  description: string
  deliverables: string[]
}

export interface PillarFaq {
  question: string
  answer: string
}

export interface PillarCoverageZone {
  city: string
  region: string
  mode: string
  responseSla: string
}

export interface PillarContent {
  id: PillarId
  locale: "en" | "es"
  slug: string
  path: string
  alternatePath: string
  metaTitle: string
  metaDescription: string
  badge: string
  h1: string
  subtitle: string
  metrics: PillarMetric[]
  proofTitle: string
  proofSummary: string
  proofHighlights: string[]
  architectureDiagram: string
  capabilitiesTitle: string
  capabilities: PillarCapability[]
  stack: string[]
  coverageTitle?: string
  coverageZones?: PillarCoverageZone[]
  faqs: PillarFaq[]
  relatedNotes: { slug: string; title: string; summary: string }[]
  ctaTitle: string
  ctaBody: string
}

export const PILLARS_DATA: Record<PillarId, Record<"en" | "es", PillarContent>> = {
  "ai-engineering": {
    es: {
      id: "ai-engineering",
      locale: "es",
      slug: "ingenieria-ia-agentes",
      path: "/es/servicios/ingenieria-ia-agentes",
      alternatePath: "/services/ai-engineering",
      metaTitle: "Ingeniería de IA, Sistemas RAG y Agentes Autónomos | Artag Dev",
      metaDescription:
        "Diseño e implementación de sistemas de IA en producción: pipelines RAG multi-tenant con pgvector, agentes autónomos con herramientas, caché semántico (-30% en costos de LLM) y guardrails.",
      badge: "VERTICAL 01 // INGENIERÍA DE IA",
      h1: "Ingeniería de IA, Sistemas RAG y Agentes Autónomos en Producción",
      subtitle:
        "Sistemas de inteligencia artificial diseñados con rigor de ingeniería distribuida: recuperación semántica aislada por cliente, control determinista de costos y supervisión humana real.",
      metrics: [
        {
          value: "~30%",
          label: "Reducción en costos de tokens",
          detail: "Benchmark del proyecto Atiende combinando caché exacto en Redis y caché semántico en pgvector.",
        },
        {
          value: "0.92",
          label: "Umbral de similitud coseno",
          detail: "Política conservadora por intención para reutilizar respuestas sin degradar precisión factual.",
        },
        {
          value: "100%",
          label: "Aislamiento multi-tenant",
          detail: "Índices vectoriales filtrados por tenant y Row-Level Security en PostgreSQL sin fuga de contexto.",
        },
      ],
      proofTitle: "Prueba técnica en producción: Caso Atiende",
      proofSummary:
        "Atiende es un sistema de agentes conversacionales multicanal (WhatsApp Business API, Instagram y chat web) que opera sobre catálogos empresariales con herramientas tipadas, enrutador multi-proveedor con circuit breaker y escalación humana desde el mismo hilo.",
      proofHighlights: [
        "Búsqueda vectorial híbrida con PostgreSQL + pgvector (embeddings + filtro estructurado de inventario y precios).",
        "Arquitectura de caché en tres niveles: prompt caching del proveedor, caché exacto en Redis y caché semántico en pgvector con invalidación por versión de catálogo.",
        "Guardrails estrictos: el modelo nunca consulta ni modifica la base de datos directamente; opera mediante herramientas validadas con Zod y límites de pasos.",
        "Evaluación automatizada de LLMs antes de despliegue: pruebas de regresión de groundedness, detección de alucinaciones de precio y defensa contra prompt injection.",
      ],
      architectureDiagram: `Usuario (WhatsApp / Web)
   │
   ▼
[Webhook HMAC-SHA256] ──▶ [Persistencia + Deduplicación] ──▶ [Cola BullMQ]
                                                                  │
                                                                  ▼
[Caché Exacto Redis] ──(miss)──▶ [Caché Semántico pgvector >= 0.92]
                                              │ (miss)
                                              ▼
                       [Agente + Herramientas RAG (RLS PostgreSQL)]
                                              │
                                              ▼
                       [Router LLM + Circuit Breaker + Guardrails]`,
      capabilitiesTitle: "Capacidades de Ingeniería de IA",
      capabilities: [
        {
          code: "AI-01",
          title: "Pipelines RAG Multi-Tenant con pgvector",
          description:
            "Ingesta incremental de documentos y catálogos, chunking híbrido, recuperación vectorial + léxica y aislamiento criptográfico/RLS por organización.",
          deliverables: [
            "Esquema PostgreSQL + pgvector con índices HNSW y políticas RLS",
            "Pipeline de indexación incremental con versionado de catálogo",
            "Citas verificables y control estricto contra invención de datos",
          ],
        },
        {
          code: "AI-02",
          title: "Agentes Autónomos con Tool Calling y Escalación",
          description:
            "Agentes orientados a negocio capaces de consultar ERPs, crear pedidos, agendar citas y transferir conversaciones a operadores humanos sin perder contexto.",
          deliverables: [
            "Contratos de herramientas validados con esquemas tipados",
            "Enrutador multi-proveedor (OpenAI, Anthropic, modelos locales) con failover",
            "Handoff humano bidireccional desde panel unificado",
          ],
        },
        {
          code: "AI-03",
          title: "Optimización de Costos y LLM Ops",
          description:
            "Telemetría de tokens por conversación, caché semántico, enrutamiento a modelos pequeños para clasificación de intención y presupuestos por tenant.",
          deliverables: [
            "Caché exacto (Redis) + caché semántico (pgvector) con TTL e invalidación",
            "Suite de evaluación automatizada y detección de regresiones",
            "Trazabilidad de latencia, tasa de acierto y costo unitario",
          ],
        },
      ],
      stack: [
        "PostgreSQL + pgvector",
        "TypeScript / Node.js",
        "Python",
        "Redis",
        "BullMQ",
        "OpenAI / Anthropic APIs",
        "Zod Guardrails",
        "OpenTelemetry",
      ],
      faqs: [
        {
          question: "¿Cómo evitan que un agente de IA invente precios o mezcle datos entre clientes?",
          answer:
            "El modelo nunca responde precios desde su memoria paramétrica ni consulta la base de datos directamente. Cada consulta pasa por herramientas deterministas respaldadas por PostgreSQL con Row-Level Security por tenant, y las respuestas se validan contra los datos recuperados antes de enviarse.",
        },
        {
          question: "¿Cómo se logra la reducción de ~30% en costos de LLM?",
          answer:
            "Combinamos tres capas: clasificación determinista previa, caché exacto en Redis para preguntas repetidas normalizadas y caché semántico en pgvector con umbral coseno >= 0.92 invalidado automáticamente cuando cambia la versión del catálogo.",
        },
        {
          question: "¿Trabajan con empresas en Pereira, Colombia y equipos remotos internacionales?",
          answer:
            "Sí. Operamos desde Pereira, Risaralda para empresas en todo el Eje Cafetero y Colombia, y colaboramos en modalidad remota con equipos de producto e ingeniería en Estados Unidos, Europa y Latinoamérica.",
        },
      ],
      relatedNotes: [
        {
          slug: "cache-semantico-pgvector-reduccion-costos-llm",
          title: "Cómo reducir un 30% el costo de LLMs en producción usando Caché Semántico y pgvector",
          summary: "Umbrales de similitud coseno, invalidación por tenant y arquitectura de tres capas.",
        },
        {
          slug: "arquitectura-rag-multi-tenant-segura",
          title: "Arquitectura RAG Multi-Tenant Segura: Aislamiento de Datos en Agentes de IA Empresariales",
          summary: "Row-Level Security en PostgreSQL, chunking híbrido y prevención de fugas de contexto.",
        },
      ],
      ctaTitle: "¿Necesitas llevar un sistema de IA o RAG a producción sin sorpresas de costo?",
      ctaBody:
        "Revisamos tu caso de uso, datos disponibles y restricciones de seguridad para definir una arquitectura realista y medible.",
    },
    en: {
      id: "ai-engineering",
      locale: "en",
      slug: "ai-engineering",
      path: "/services/ai-engineering",
      alternatePath: "/es/servicios/ingenieria-ia-agentes",
      metaTitle: "Production AI Engineering, RAG Pipelines & Autonomous Agents | Artag Dev",
      metaDescription:
        "Production AI engineering services: multi-tenant RAG with pgvector, autonomous tool-using agents, ~30% LLM cost reduction via semantic caching, guardrails, and LLM evaluation.",
      badge: "VERTICAL 01 // AI ENGINEERING",
      h1: "Production AI Engineering, RAG Pipelines & Autonomous Agents",
      subtitle:
        "Applied AI systems engineered like distributed backends: strict tenant-isolated retrieval, deterministic cost gates, multi-provider failover, and seamless human-in-the-loop escalation.",
      metrics: [
        {
          value: "~30%",
          label: "LLM token cost reduction",
          detail: "Measured in Atiende benchmarks combining Redis exact caching and pgvector semantic caching.",
        },
        {
          value: "0.92",
          label: "Cosine similarity threshold",
          detail: "Conservative per-intent threshold that reuses verified answers without sacrificing accuracy.",
        },
        {
          value: "100%",
          label: "Multi-tenant isolation",
          detail: "Tenant-scoped vector indexes paired with PostgreSQL Row-Level Security to prevent context leaks.",
        },
      ],
      proofTitle: "Production proof: Atiende multi-channel AI system",
      proofSummary:
        "Atiende is a multi-channel conversational AI platform (WhatsApp Business API, Instagram, and web chat) grounded in live product catalogs via typed tools, an LLM router with circuit breaker failover, and unified human handoff.",
      proofHighlights: [
        "Hybrid vector + structured retrieval on PostgreSQL + pgvector for real-time catalog and policy grounding.",
        "Three-tier caching architecture: provider prompt caching, Redis exact cache, and pgvector semantic cache invalidated by catalog version.",
        "Strict execution guardrails: models never touch the database directly; all actions flow through Zod-validated tools with bounded step counts.",
        "Automated LLM evaluation pipelines covering groundedness regressions, price-hallucination checks, and prompt-injection resilience.",
      ],
      architectureDiagram: `User (WhatsApp / Web)
   │
   ▼
[HMAC-SHA256 Webhook] ──▶ [Persist + Dedupe] ──▶ [BullMQ Queue]
                                                       │
                                                       ▼
[Redis Exact Cache] ──(miss)──▶ [pgvector Semantic Cache >= 0.92]
                                              │ (miss)
                                              ▼
                       [Tool-Using Agent + RAG (PostgreSQL RLS)]
                                              │
                                              ▼
                       [LLM Router + Circuit Breaker + Guardrails]`,
      capabilitiesTitle: "AI Engineering Capabilities",
      capabilities: [
        {
          code: "AI-01",
          title: "Multi-Tenant RAG Pipelines with pgvector",
          description:
            "Incremental document and catalog ingestion, hybrid lexical + semantic search, and strict database-level tenant isolation.",
          deliverables: [
            "PostgreSQL + pgvector HNSW schema with Row-Level Security policies",
            "Version-aware incremental indexing and cache invalidation",
            "Source-grounded responses with zero fabricated pricing or policies",
          ],
        },
        {
          code: "AI-02",
          title: "Autonomous Tool-Using Agents & Human Escalation",
          description:
            "Business agents that query ERPs, create orders, book appointments, and escalate seamlessly to human operators in the same thread.",
          deliverables: [
            "Typed tool contracts with strict schema validation and step limits",
            "Multi-provider LLM router (OpenAI, Anthropic, fallback models) with circuit breaker",
            "Bidirectional human handoff without losing conversation state",
          ],
        },
        {
          code: "AI-03",
          title: "LLM Cost Engineering & Evaluation",
          description:
            "Per-conversation token telemetry, semantic caching, small-model intent routing, and automated regression suites before every deploy.",
          deliverables: [
            "Exact (Redis) + semantic (pgvector) caching with conservative thresholds",
            "Automated eval harness for accuracy, latency, and safety",
            "Per-tenant token budgets and unit-economics dashboards",
          ],
        },
      ],
      stack: [
        "PostgreSQL + pgvector",
        "TypeScript / Node.js",
        "Python",
        "Redis",
        "BullMQ",
        "OpenAI / Anthropic APIs",
        "Zod Guardrails",
        "OpenTelemetry",
      ],
      faqs: [
        {
          question: "How do you prevent AI agents from hallucinating prices or leaking data across tenants?",
          answer:
            "Models never answer prices from parametric memory or query tables directly. Every lookup runs through deterministic tools backed by PostgreSQL Row-Level Security scoped to the active tenant, and responses are grounded strictly in retrieved records.",
        },
        {
          question: "How is the ~30% LLM cost reduction achieved?",
          answer:
            "Through three sequential layers: deterministic intent short-circuits, an exact normalized-prompt cache in Redis, and a pgvector semantic cache gated at >= 0.92 cosine similarity with automatic catalog-version invalidation.",
        },
        {
          question: "Do you work with international product teams remotely?",
          answer:
            "Yes. Based in Colombia (UTC-5, aligned with US Eastern time), Artag Dev partners with remote engineering and product teams across North America, Europe, and Latin America.",
        },
      ],
      relatedNotes: [
        {
          slug: "semantic-caching-pgvector-llm-cost-reduction",
          title: "Cutting Production LLM Costs by 30% Using Semantic Caching and pgvector",
          summary: "Cosine similarity thresholds, per-tenant invalidation, and latency benchmarks.",
        },
        {
          slug: "secure-multi-tenant-rag-architecture",
          title: "Secure Multi-Tenant RAG Architecture: Data Isolation in Enterprise AI Agents",
          summary: "PostgreSQL Row-Level Security, hybrid chunking, and automated leakage tests.",
        },
      ],
      ctaTitle: "Ready to ship a production AI or RAG system with predictable unit economics?",
      ctaBody:
        "Share your use case, data sources, and reliability targets. We will map a concrete architecture and clear delivery milestones.",
    },
  },

  "local-pereira": {
    es: {
      id: "local-pereira",
      locale: "es",
      slug: "desarrollo-de-software-pereira",
      path: "/es/desarrollo-de-software-pereira",
      alternatePath: "/software-development-colombia",
      metaTitle: "Desarrollo de Software a la Medida en Pereira y Eje Cafetero | Artag Dev",
      metaDescription:
        "Empresa de desarrollo de software a la medida en Pereira, Risaralda y el Eje Cafetero. Aplicaciones web, integraciones ERP/WhatsApp, agentes de IA y arquitectura escalable con soporte local.",
      badge: "VERTICAL 02 // PEREIRA & EJE CAFETERO",
      h1: "Desarrollo de Software a la Medida en Pereira y el Eje Cafetero",
      subtitle:
        "Ingeniería de software de nivel internacional con sede en Pereira, Risaralda. Construimos plataformas web, integraciones ERP/CRM y automatización con WhatsApp e IA para empresas de la región.",
      metrics: [
        {
          value: "< 4h",
          label: "Tiempo de respuesta local",
          detail: "Atención directa desde Pereira y Dosquebradas en horario laboral de lunes a viernes.",
        },
        {
          value: "100%",
          label: "Propiedad intelectual",
          detail: "El código fuente, repositorios y documentación técnica pertenecen completamente a tu empresa.",
        },
        {
          value: "Ley 1581",
          label: "Cumplimiento Habeas Data",
          detail: "Tratamiento seguro de datos personales y trazabilidad de consentimiento para operación en Colombia.",
        },
      ],
      proofTitle: "Identidad local verificada y enfoque empresarial en Risaralda",
      proofSummary:
        "En Artag Dev combinamos reuniones presenciales o híbridas en Pereira y el Área Metropolitana Centro Occidente con estándares de ingeniería distribuida, pruebas automatizadas y despliegues en la nube sin dependencia de terceros opacos.",
      proofHighlights: [
        `NAP Oficial Unificado: ${OFFICIAL_NAP.name} · ${OFFICIAL_NAP.location} · Tel: ${OFFICIAL_NAP.phoneDisplay} · Correo: ${OFFICIAL_NAP.email}.`,
        "Integración directa con sistemas usados en empresas colombianas: ERPs contables, facturación electrónica, CRMs y WhatsApp Business API oficial.",
        "Automatización de atención al cliente, agendamiento y seguimiento comercial con agentes de IA que escalan a tu equipo humano cuando es necesario.",
        "Arquitectura auditable con repositorios Git, entornos de pruebas y métricas claras de retorno de inversión.",
      ],
      architectureDiagram: `Operación Local (Pereira / Eje Cafetero)
   │
   ├──▶ [Web App / Portal Clientes Next.js]
   ├──▶ [WhatsApp Business API + Agente IA]
   └──▶ [Integración ERP / Facturación / CRM]
                    │
                    ▼
   [API Backend Segura + PostgreSQL + Backups Automáticos]`,
      capabilitiesTitle: "Soluciones de Software para Empresas en Pereira",
      capabilities: [
        {
          code: "LOC-01",
          title: "Sistemas Web y Portales Corporativos a la Medida",
          description:
            "Plataformas internas, dashboards operativos, portales de clientes y sistemas de gestión diseñados alrededor de los procesos reales de tu negocio.",
          deliverables: [
            "Levantamiento funcional presencial en Pereira o virtual en el Eje Cafetero",
            "Frontend moderno en Next.js/React con alto rendimiento móvil",
            "Roles, permisos y auditoría de acciones por usuario",
          ],
        },
        {
          code: "LOC-02",
          title: "Integraciones ERP, CRM y WhatsApp Business API",
          description:
            "Conectamos hojas de cálculo, sistemas contables, inventarios y canales de WhatsApp para eliminar digitación manual y errores operativos.",
          deliverables: [
            "Webhooks verificados y colas resilientes para sincronización sin pérdida de datos",
            "Notificaciones automáticas de pedidos, cartera y citas por WhatsApp",
            "Tableros de control en tiempo real para gerencia",
          ],
        },
        {
          code: "LOC-03",
          title: "Modernización de Sistemas Legados y Nube",
          description:
            "Migración gradual de aplicaciones antiguas o procesos en Excel hacia arquitecturas modernas en la nube con respaldos y monitoreo.",
          deliverables: [
            "Plan de transición por fases sin detener la operación diaria",
            "Optimización de bases de datos PostgreSQL y servidores Linux",
            "Capacitación técnica y documentación para tu equipo",
          ],
        },
      ],
      stack: [
        "Next.js / React",
        "TypeScript / Node.js",
        "PostgreSQL",
        "WhatsApp Business API",
        "n8n / BullMQ",
        "Docker",
        "AWS / Cloudflare",
        "Python",
      ],
      coverageTitle: "Mapa de Cobertura en el Eje Cafetero y Colombia",
      coverageZones: [
        {
          city: "Pereira",
          region: "Risaralda (Sede Principal)",
          mode: "Presencial e híbrido",
          responseSla: "< 4 horas hábiles",
        },
        {
          city: "Dosquebradas y Santa Rosa de Cabal",
          region: "Área Metropolitana Centro Occidente",
          mode: "Presencial e híbrido",
          responseSla: "< 4 horas hábiles",
        },
        {
          city: "Manizales y Armenia",
          region: "Caldas y Quindío (Eje Cafetero)",
          mode: "Híbrido + visitas programadas",
          responseSla: "Mismo día hábil",
        },
        {
          city: "Bogotá, Medellín, Cali y resto del país",
          region: "Colombia (Remoto B2B)",
          mode: "100% Remoto con entregas semanales",
          responseSla: "Mismo día hábil",
        },
      ],
      faqs: [
        {
          question: "¿Dónde está ubicado Artag Dev y atienden reuniones presenciales en Pereira?",
          answer:
            "Estamos ubicados en Pereira, Risaralda (código postal 660001). Atendemos reuniones presenciales de diagnóstico y seguimiento en Pereira, Dosquebradas y el Área Metropolitana, así como modalidad remota en todo el Eje Cafetero y Colombia.",
        },
        {
          question: "¿Cuánto cuesta desarrollar un software a la medida en Pereira?",
          answer:
            "El presupuesto depende del alcance: una automatización o integración con WhatsApp y CRM puede implementarse en semanas con inversión acotada, mientras que una plataforma empresarial completa se cotiza por fases claras y entregables verificables antes de iniciar.",
        },
        {
          question: "¿Entregan el código fuente y la documentación al finalizar el proyecto?",
          answer:
            "Sí. Desde el primer sprint el repositorio y la infraestructura pueden alojarse en cuentas de tu empresa. Entregamos documentación técnica, manuales de despliegue y propiedad intelectual 100% tuya.",
        },
        {
          question: "¿Pueden integrar nuestro software actual con WhatsApp API y facturación?",
          answer:
            "Sí. Construimos conectores a la medida mediante APIs y webhooks seguros (HMAC-SHA256) para conectar tu ERP, CRM o base de datos con WhatsApp Business API y flujos de atención automatizados.",
        },
      ],
      relatedNotes: [
        {
          slug: "automatizacion-ia-whatsapp-empresas-pereira",
          title: "Automatización con Agentes de IA y WhatsApp API para Empresas en Pereira y el Eje Cafetero",
          summary: "Casos de uso en logística, salud y comercio en Risaralda con cumplimiento de Ley 1581.",
        },
        {
          slug: "cache-semantico-pgvector-reduccion-costos-llm",
          title: "Cómo reducir un 30% el costo de LLMs en producción usando Caché Semántico y pgvector",
          summary: "Control real de costos operativos al desplegar asistentes inteligentes.",
        },
      ],
      ctaTitle: "¿Buscas un aliado técnico confiable en Pereira o el Eje Cafetero?",
      ctaBody:
        "Conversemos directamente sobre tu operación. Te damos una valoración técnica honesta sin compromisos comerciales innecesarios.",
    },
    en: {
      id: "local-pereira",
      locale: "en",
      slug: "software-development-colombia",
      path: "/software-development-colombia",
      alternatePath: "/es/desarrollo-de-software-pereira",
      metaTitle: "Custom Software Development & Nearshore Engineering in Colombia | Artag Dev",
      metaDescription:
        "Senior custom software development and nearshore engineering from Pereira, Colombia (UTC-5). US-timezone collaboration, AI systems, distributed backends, and 100% IP ownership.",
      badge: "VERTICAL 02 // NEARSHORE COLOMBIA (UTC-5)",
      h1: "Custom Software Development & Nearshore Engineering in Colombia",
      subtitle:
        "Direct senior engineering from Pereira, Risaralda (UTC-5 — aligned with US Eastern Time). No agency middlemen: you work directly with the architect building your AI pipelines, APIs, and web platforms.",
      metrics: [
        {
          value: "UTC-5",
          label: "US-aligned timezone",
          detail: "Full real-time overlap with US East and Central teams for standups, architecture reviews, and incident response.",
        },
        {
          value: "100%",
          label: "Client IP ownership",
          detail: "Clean Git history, infrastructure-as-code, and full intellectual property transferred from commit one.",
        },
        {
          value: "295+",
          label: "Automated tests standard",
          detail: "Production systems backed by CI/CD, integration suites, and measurable service-level objectives.",
        },
      ],
      proofTitle: "Verified Colombia engineering base with global delivery standards",
      proofSummary:
        "Operating from Pereira in Colombia's Coffee Axis (Eje Cafetero), Artag Dev combines senior full-stack, distributed systems, and AI engineering with transparent async/sync communication in English and Spanish.",
      proofHighlights: [
        `Verified Business Identity (NAP): ${OFFICIAL_NAP.name} · ${OFFICIAL_NAP.location} · Phone: ${OFFICIAL_NAP.phoneDisplay} · Email: ${OFFICIAL_NAP.email}.`,
        "Direct architect-to-stakeholder workflow: zero telephone-game account managers between your product roadmap and production code.",
        "Deep expertise integrating WhatsApp Business API, payment gateways, ERPs, and multi-tenant SaaS backends.",
        "Clear weekly demos, documented architectural trade-offs, and predictable milestone-based execution.",
      ],
      architectureDiagram: `US / Global Product Team (EST / CST / CET)
                 │ (Real-time UTC-5 overlap)
                 ▼
[Artag Dev Engineering Base — Pereira, Colombia]
   ├──▶ [Next.js / TypeScript Web Applications]
   ├──▶ [AI Engineering & Multi-Tenant RAG]
   └──▶ [Distributed APIs, Redis, BullMQ & Security]`,
      capabilitiesTitle: "Nearshore Engineering Engagements",
      capabilities: [
        {
          code: "NS-01",
          title: "Dedicated Senior Architecture & Feature Delivery",
          description:
            "End-to-end delivery of production web apps, internal tools, and customer portals with strict TypeScript, testing, and observability.",
          deliverables: [
            "Technical architecture blueprint and milestone breakdown",
            "Production-ready Next.js, React, Node.js, and PostgreSQL delivery",
            "CI/CD pipelines, telemetry, and clear runbooks",
          ],
        },
        {
          code: "NS-02",
          title: "AI & Automation Integration for B2B Products",
          description:
            "Embed RAG search, autonomous support/operations agents, and WhatsApp/CRM workflows into your existing SaaS or operations stack.",
          deliverables: [
            "Multi-tenant pgvector retrieval with cost-controlled semantic caching",
            "Signed webhooks (HMAC-SHA256) and idempotent background workers",
            "Automated evaluation benchmarks before release",
          ],
        },
        {
          code: "NS-03",
          title: "Backend Modernization & Scale Readiness",
          description:
            "Refactor fragile monoliths or brittle no-code workflows into maintainable, observable, and secure services.",
          deliverables: [
            "Incremental strangler-fig migration with zero downtime",
            "Database query tuning, indexing, and Redis caching layers",
            "Security hardening and OWASP compliance checks",
          ],
        },
      ],
      stack: [
        "Next.js / React",
        "TypeScript / Node.js",
        "Python",
        "PostgreSQL + pgvector",
        "Redis / BullMQ",
        "Docker / Kubernetes",
        "AWS / Cloudflare",
        "Playwright / CI",
      ],
      coverageTitle: "Nearshore Collaboration & Regional Coverage",
      coverageZones: [
        {
          city: "Pereira & Dosquebradas",
          region: "Risaralda, Colombia (HQ)",
          mode: "In-person & hybrid",
          responseSla: "< 4 business hours",
        },
        {
          city: "United States & Canada",
          region: "EST / CST / PST (UTC-5 overlap)",
          mode: "Remote real-time sync",
          responseSla: "Same business day",
        },
        {
          city: "Europe & UK",
          region: "GMT / CET (Morning overlap)",
          mode: "Async-first + daily sync window",
          responseSla: "Same business day",
        },
        {
          city: "Latin America",
          region: "Colombia, Mexico, Chile, LATAM",
          mode: "Bilingual ES/EN remote delivery",
          responseSla: "< 4 business hours",
        },
      ],
      faqs: [
        {
          question: "How does timezone overlap work with Colombia (UTC-5)?",
          answer:
            "Colombia stays on UTC-5 year-round with no daylight saving shifts, giving you 100% working-hour overlap with US Eastern Standard Time and 6–8 hours of overlap with Central and Pacific teams.",
        },
        {
          question: "Will I work directly with the engineer writing the code?",
          answer:
            "Yes. Artag Dev is led directly by Christian (AI Engineer & Distributed Systems Architect). There are no junior handoffs or layers of non-technical account managers.",
        },
        {
          question: "How are engagements structured and billed?",
          answer:
            "We offer fixed-scope milestone projects for well-defined deliverables and monthly engineering retainers for ongoing product architecture and AI/backend delivery—always with transparent estimates upfront.",
        },
      ],
      relatedNotes: [
        {
          slug: "microservices-idempotency-redis-bullmq",
          title: "From Monolith to 13 Microservices: Redis Idempotency and BullMQ Under Load",
          summary: "How we structure distributed systems with 295+ automated tests and zero duplicate processing.",
        },
        {
          slug: "semantic-caching-pgvector-llm-cost-reduction",
          title: "Cutting Production LLM Costs by 30% Using Semantic Caching and pgvector",
          summary: "Concrete LLM cost engineering from real production architecture.",
        },
      ],
      ctaTitle: "Looking for a senior nearshore engineering partner in Colombia?",
      ctaBody:
        "Send a short brief of your product goals and technical stack. We respond within one business day with honest feedback and next steps.",
    },
  },

  microservices: {
    es: {
      id: "microservices",
      locale: "es",
      slug: "arquitectura-microservicios",
      path: "/es/servicios/arquitectura-microservicios",
      alternatePath: "/services/microservices-architecture",
      metaTitle: "Arquitectura de Microservicios, APIs y Sistemas Distribuidos | Artag Dev",
      metaDescription:
        "Diseño e ingeniería de microservicios y APIs de alto rendimiento: topología de 13 servicios, colas asíncronas BullMQ, idempotencia con Redis, Docker/Kubernetes y más de 295 pruebas automatizadas.",
      badge: "VERTICAL 03 // SISTEMAS DISTRIBUIDOS",
      h1: "Arquitectura de Microservicios, APIs y Sistemas Distribuidos",
      subtitle:
        "Backends event-driven diseñados para tolerar picos de carga, caídas parciales y reintentos de red sin perder mensajes ni duplicar transacciones.",
      metrics: [
        {
          value: "13",
          label: "Microservicios en topología real",
          detail: "Servicios desacoplados con límites de dominio claros, mensajería asíncrona y despliegues independientes.",
        },
        {
          value: "295+",
          label: "Pruebas automatizadas",
          detail: "Cobertura unitaria, de integración y E2E protegiendo contratos críticos entre servicios.",
        },
        {
          value: "0",
          label: "Eventos duplicados",
          detail: "Patrón persist-before-enqueue + claves de idempotencia en Redis frente a reintentos de webhooks.",
        },
      ],
      proofTitle: "Prueba técnica: Topología de 13 servicios, BullMQ y Redis idempotente",
      proofSummary:
        "Hemos diseñado y operado ecosistemas distribuidos conectando canales de mensajería, motores de automatización, bases de datos transaccionales y workers pesados sobre colas BullMQ con Dead Letter Queues y observabilidad centralizada.",
      proofHighlights: [
        "Topología modular de 13 servicios independientes containerizados con Docker y listos para orquestación en Kubernetes.",
        "Colas asíncronas con BullMQ + Redis: backoff exponencial, aislamiento por prioridad y Dead Letter Queues para inspección segura.",
        "Idempotencia estricta en Redis (`SET NX EX`) y llaves deterministas de trabajo para absorber reintentos de proveedores externos.",
        "Suite de 295+ pruebas automatizadas en CI que validan contratos de API, resiliencia ante timeouts y consistencia de datos.",
      ],
      architectureDiagram: `[API Gateway / Ingress]
        │
        ├──▶ [Servicio Ingesta] ──▶ [Redis Idempotency Key] ──▶ [BullMQ Queue]
        │                                                            │
        ├──▶ [Servicios de Dominio (13 módulos)] ◀─── [Workers + DLQ]
        │
        └──▶ [PostgreSQL + Redis + Métricas / Trazas Distribuidas]`,
      capabilitiesTitle: "Servicios de Arquitectura y Backend Distribuido",
      capabilities: [
        {
          code: "MS-01",
          title: "Descomposición de Monolitos y Diseño de Límites",
          description:
            "Evaluamos cuándo realmente conviene migrar a microservicios y ejecutamos transiciones graduales (Strangler Fig) sin frenar el negocio.",
          deliverables: [
            "Mapa de contextos acotados (Bounded Contexts) y contratos OpenAPI/AsyncAPI",
            "Estrategia de migración sin tiempo de inactividad",
            "Gobernanza de versiones y compatibilidad hacia atrás",
          ],
        },
        {
          code: "MS-02",
          title: "Procesamiento Asíncrono con BullMQ y Redis",
          description:
            "Desacoplamiento de tareas pesadas (IA, reportes, webhooks, pagos) mediante colas resilientes con reintentos controlados e idempotencia.",
          deliverables: [
            "Arquitectura persist-before-enqueue con deduplicación en Redis",
            "Políticas de reintento, circuit breakers y Dead Letter Queues",
            "Panel de monitoreo de colas, latencias y tasa de error",
          ],
        },
        {
          code: "MS-03",
          title: "Containerización, Kubernetes y Pruebas E2E",
          description:
            "Empaquetado reproducible con Docker, pipelines CI/CD y baterías de pruebas de contrato e integración para desplegar con confianza.",
          deliverables: [
            "Dockerfiles multi-etapa endurecidos y manifiestos Kubernetes/Compose",
            "Pruebas automatizadas de integración y carga",
            "Logging estructurado con correlation IDs entre servicios",
          ],
        },
      ],
      stack: [
        "Node.js / NestJS",
        "TypeScript",
        "Rust / Python",
        "Redis",
        "BullMQ",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
      ],
      faqs: [
        {
          question: "¿Siempre recomiendan usar microservicios?",
          answer:
            "No. Un monolito modular bien diseñado suele ser la mejor opción en etapas tempranas. Recomendamos microservicios cuando existen cuellos de botella de escalado independiente, equipos separados o cargas heterogéneas (por ejemplo, workers de IA frente a APIs transaccionales).",
        },
        {
          question: "¿Cómo garantizan que un webhook o pago no se procese dos veces?",
          answer:
            "Implementamos idempotencia en dos niveles: validación rápida en Redis mediante claves deterministas (`SET NX EX`) y restricción única en PostgreSQL antes de encolar el trabajo en BullMQ.",
        },
        {
          question: "¿Pueden auditar una arquitectura de microservicios existente?",
          answer:
            "Sí. Realizamos auditorías de rendimiento, acoplamiento, manejo de colas y observabilidad, entregando un plan priorizado de remediación ejecutable.",
        },
      ],
      relatedNotes: [
        {
          slug: "microservicios-idempotencia-redis-bullmq",
          title: "De Monolito a 13 Microservicios: Idempotencia con Redis y Colas BullMQ bajo Alta Carga",
          summary: "Cuándo migrar, Dead Letter Queues, deduplicación de eventos y estrategia de 295+ tests.",
        },
        {
          slug: "seguridad-webhooks-hmac-sha256",
          title: "Seguridad en Webhooks e Integraciones B2B: Verificación HMAC-SHA256 y Anti-Replay",
          summary: "Protección criptográfica del borde de entrada en sistemas event-driven.",
        },
      ],
      ctaTitle: "¿Tu backend sufre de cuellos de botella, timeouts o reintentos duplicados?",
      ctaBody:
        "Analizamos tu topología actual y diseñamos una arquitectura distribuida observable, idempotente y fácil de mantener.",
    },
    en: {
      id: "microservices",
      locale: "en",
      slug: "microservices-architecture",
      path: "/services/microservices-architecture",
      alternatePath: "/es/servicios/arquitectura-microservicios",
      metaTitle: "Microservices Architecture & High-Throughput Distributed APIs | Artag Dev",
      metaDescription:
        "Distributed systems and microservices architecture: 13-service topology, BullMQ async queues, Redis idempotency, Docker/Kubernetes, and 295+ automated tests.",
      badge: "VERTICAL 03 // DISTRIBUTED SYSTEMS",
      h1: "Microservices Architecture & High-Throughput Distributed APIs",
      subtitle:
        "Event-driven backends engineered to absorb traffic spikes, partial outages, and network retries without dropping events or duplicating transactions.",
      metrics: [
        {
          value: "13",
          label: "Services in production topology",
          detail: "Decoupled domain boundaries communicating over async queues and typed contracts.",
        },
        {
          value: "295+",
          label: "Automated tests",
          detail: "Unit, integration, and end-to-end test suites guarding critical cross-service contracts.",
        },
        {
          value: "0",
          label: "Duplicate side effects",
          detail: "Persist-before-enqueue pipelines backed by Redis idempotency keys and deterministic job IDs.",
        },
      ],
      proofTitle: "Technical proof: 13-service topology, BullMQ, and Redis idempotency",
      proofSummary:
        "We have architected and operated distributed platforms linking messaging channels, automation engines, transactional databases, and compute-heavy workers over BullMQ queues with Dead Letter Queues and structured observability.",
      proofHighlights: [
        "13-service modular topology containerized with multi-stage Docker builds and Kubernetes-ready deployments.",
        "Asynchronous BullMQ + Redis pipelines with exponential backoff, priority lanes, and Dead Letter Queues.",
        "Strict Redis idempotency (`SET NX EX`) and deterministic job IDs to absorb third-party webhook retries cleanly.",
        "295+ automated tests running in CI covering API contracts, timeout fallbacks, and state consistency.",
      ],
      architectureDiagram: `[API Gateway / Ingress]
        │
        ├──▶ [Ingestion Service] ──▶ [Redis Idempotency Key] ──▶ [BullMQ Queue]
        │                                                            │
        ├──▶ [Domain Services (13 modules)] ◀────── [Workers + DLQ]
        │
        └──▶ [PostgreSQL + Redis + Distributed Tracing & Metrics]`,
      capabilitiesTitle: "Distributed Backend & API Capabilities",
      capabilities: [
        {
          code: "MS-01",
          title: "Monolith Decomposition & Domain Boundaries",
          description:
            "Pragmatic assessment of when to split services, executed incrementally with the Strangler Fig pattern so delivery never stalls.",
          deliverables: [
            "Bounded-context map with OpenAPI and AsyncAPI contracts",
            "Zero-downtime incremental extraction roadmap",
            "Backward-compatible API versioning strategy",
          ],
        },
        {
          code: "MS-02",
          title: "Event-Driven Queues with BullMQ & Redis",
          description:
            "Decouple latency-sensitive endpoints from heavy workloads (LLM calls, billing, webhooks, exports) with resilient queues.",
          deliverables: [
            "Persist-before-enqueue ingestion with Redis deduplication",
            "Retry policies, circuit breakers, and Dead Letter Queue workflows",
            "Queue depth, p95 latency, and failure-rate telemetry",
          ],
        },
        {
          code: "MS-03",
          title: "Containerization, Kubernetes & Contract Testing",
          description:
            "Reproducible Docker images, automated CI/CD pipelines, and comprehensive integration test suites for safe releases.",
          deliverables: [
            "Hardened multi-stage Dockerfiles and Kubernetes/Compose manifests",
            "Automated integration, contract, and load test suites",
            "Structured logging with end-to-end correlation IDs",
          ],
        },
      ],
      stack: [
        "Node.js / NestJS",
        "TypeScript",
        "Rust / Python",
        "Redis",
        "BullMQ",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
      ],
      faqs: [
        {
          question: "Do you always recommend microservices?",
          answer:
            "No. A clean modular monolith is often faster and cheaper early on. We recommend splitting into microservices when independent scaling, fault isolation, or heterogeneous workloads (like AI workers vs. transactional APIs) justify the operational boundary.",
        },
        {
          question: "How do you guarantee webhooks and payments are never processed twice?",
          answer:
            "We enforce two-layer idempotency: fast deduplication in Redis (`SET NX EX`) plus a unique database constraint before enqueuing a deterministic job ID in BullMQ.",
        },
        {
          question: "Can you audit an existing distributed backend?",
          answer:
            "Yes. We audit service coupling, queue reliability, database contention, and observability, delivering a prioritized engineering remediation plan.",
        },
      ],
      relatedNotes: [
        {
          slug: "microservices-idempotency-redis-bullmq",
          title: "From Monolith to 13 Microservices: Redis Idempotency and BullMQ Under Load",
          summary: "Migration triggers, Dead Letter Queues, event deduplication, and our 295+ E2E test strategy.",
        },
        {
          slug: "webhook-security-hmac-sha256-anti-replay",
          title: "B2B Webhook Security: Cryptographic HMAC-SHA256 Verification and Anti-Replay",
          summary: "Securing the ingestion perimeter of event-driven systems.",
        },
      ],
      ctaTitle: "Dealing with backend bottlenecks, flaky webhooks, or duplicate jobs?",
      ctaBody:
        "Let's review your current topology and design an observable, idempotent architecture built to scale.",
    },
  },

  cybersecurity: {
    es: {
      id: "cybersecurity",
      locale: "es",
      slug: "ciberseguridad-aplicaciones",
      path: "/es/servicios/ciberseguridad-aplicaciones",
      alternatePath: "/services/application-cybersecurity",
      metaTitle: "Ciberseguridad para Aplicaciones, APIs y DevSecOps | Artag Dev",
      metaDescription:
        "Ingeniería de ciberseguridad para aplicaciones y APIs: verificación criptográfica HMAC-SHA256 en webhooks, aislamiento multi-tenant con PostgreSQL RLS, OAuth2/JWT, defensa OWASP LLM y hardening Linux.",
      badge: "VERTICAL 04 // APPSEC & DEVSECOPS",
      h1: "Ciberseguridad para Aplicaciones, APIs y DevSecOps",
      subtitle:
        "Seguridad integrada en el código y en la base de datos desde el diseño: criptografía verificada, aislamiento real entre clientes y blindaje para APIs y agentes de IA.",
      metrics: [
        {
          value: "HMAC",
          label: "SHA-256 en tiempo constante",
          detail: "Verificación criptográfica con `timingSafeEqual` y ventanas anti-replay en webhooks B2B.",
        },
        {
          value: "RLS",
          label: "Aislamiento PostgreSQL",
          detail: "Políticas Row-Level Security que impiden fugas cross-tenant incluso ante errores de consulta.",
        },
        {
          value: "OWASP",
          label: "API + LLM Top 10",
          detail: "Controles contra prompt injection, broken object level authorization y abuso de herramientas.",
        },
      ],
      proofTitle: "Prueba técnica: Defensa en profundidad de borde a base de datos",
      proofSummary:
        "Aplicamos controles verificables directamente en producción: validación estricta de firmas de webhooks, políticas CSP dinámicas, rate limiting, aislamiento multi-tenant en PostgreSQL y endurecimiento de servidores Linux.",
      proofHighlights: [
        "Verificación criptográfica HMAC-SHA256 sobre payload crudo con comparación en tiempo constante (`crypto.timingSafeEqual`) y rechazo de timestamps expirados.",
        "Aislamiento estricto multi-tenant en PostgreSQL mediante Row-Level Security (RLS) vinculado al contexto de sesión autenticado.",
        "Autenticación y autorización robusta con OAuth2, rotación de tokens JWT de vida corta y principio de mínimo privilegio.",
        "Hardening Linux y contenedores: usuarios sin privilegios root, firewalls de salida, cabeceras CSP/HSTS y auditoría automatizada en CI.",
      ],
      architectureDiagram: `[Cliente / Webhook Externo]
        │
        ▼
[WAF / Rate Limit + CSP / HSTS]
        │
        ▼
[Verificación HMAC-SHA256 + Anti-Replay Timestamp]
        │
        ▼
[Auth OAuth2/JWT + Permisos Mínimos] ──▶ [PostgreSQL RLS por Tenant]`,
      capabilitiesTitle: "Servicios de Seguridad de Aplicaciones y DevSecOps",
      capabilities: [
        {
          code: "SEC-01",
          title: "Blindaje de APIs y Webhooks B2B",
          description:
            "Protección contra suplantación, ataques de repetición (replay), inyección y enumeración de recursos (BOLA/IDOR) en APIs REST y webhooks.",
          deliverables: [
            "Middleware de firma HMAC-SHA256 con rotación de secretos sin caída",
            "Rate limiting por IP, tenant y llave de API",
            "Validación estricta de esquemas y cabeceras de seguridad HTTP",
          ],
        },
        {
          code: "SEC-02",
          title: "Aislamiento Multi-Tenant y Seguridad en PostgreSQL",
          description:
            "Diseño de bases de datos SaaS donde la separación entre clientes se impone a nivel del motor SQL y no solo en el código de la aplicación.",
          deliverables: [
            "Políticas PostgreSQL Row-Level Security (RLS) auditadas",
            "Pruebas automatizadas de intento de acceso cruzado entre tenants",
            "Cifrado en tránsito, gestión segura de secretos y respaldos verificados",
          ],
        },
        {
          code: "SEC-03",
          title: "Seguridad para Agentes de IA (OWASP LLM Top 10)",
          description:
            "Defensa frente a Prompt Injection directo e indirecto, exfiltración de datos sensibles y abuso de llamadas a herramientas (Tool Calling).",
          deliverables: [
            "Sanitización de entradas, separación de instrucciones y validación de salidas",
            "Permisos mínimos por herramienta y aprobación humana para acciones críticas",
            "Trazas de auditoría de prompts, herramientas invocadas y respuestas",
          ],
        },
      ],
      stack: [
        "HMAC-SHA256",
        "PostgreSQL RLS",
        "OAuth2 / OIDC / JWT",
        "OWASP API & LLM Top 10",
        "Linux Hardening",
        "CSP / HSTS",
        "Docker Security",
        "Cloudflare",
      ],
      faqs: [
        {
          question: "¿Por qué no basta con filtrar por `tenant_id` en el backend?",
          answer:
            "Un solo endpoint o consulta olvidada sin cláusula `WHERE tenant_id = ?` puede exponer datos de otro cliente. Con Row-Level Security en PostgreSQL, el motor de base de datos bloquea el acceso incluso si existe un error en la capa de aplicación.",
        },
        {
          question: "¿Cómo protegen los webhooks de ataques de repetición (replay)?",
          answer:
            "Además de verificar la firma HMAC-SHA256 sobre el cuerpo crudo con `timingSafeEqual`, exigimos un timestamp firmado con ventana estricta (por ejemplo, 5 minutos) y deduplicación del ID de evento en Redis.",
        },
        {
          question: "¿Realizan hardening de aplicaciones existentes antes de auditorías o clientes enterprise?",
          answer:
            "Sí. Ejecutamos revisiones de código orientadas a seguridad, corregimos hallazgos críticos de API/autenticación y dejamos pruebas automatizadas en CI para evitar regresiones.",
        },
      ],
      relatedNotes: [
        {
          slug: "seguridad-webhooks-hmac-sha256",
          title: "Seguridad en Webhooks e Integraciones B2B: Verificación HMAC-SHA256 y Anti-Replay",
          summary: "Comparación en tiempo constante, rotación de secretos y rate limiting en producción.",
        },
        {
          slug: "owasp-llm-seguridad-agentes-ia",
          title: "OWASP Top 10 para LLMs: Cómo Blindar Agentes de IA contra Prompt Injection y Exfiltración",
          summary: "Permisos mínimos en Tool Calling, auditoría de trazas y validación estructurada.",
        },
      ],
      ctaTitle: "¿Necesitas endurecer tu API, plataforma SaaS o agente de IA?",
      ctaBody:
        "Evaluamos tu superficie de ataque actual y entregamos controles criptográficos y de aislamiento listos para producción.",
    },
    en: {
      id: "cybersecurity",
      locale: "en",
      slug: "application-cybersecurity",
      path: "/services/application-cybersecurity",
      alternatePath: "/es/servicios/ciberseguridad-aplicaciones",
      metaTitle: "Application Security, API Hardening & DevSecOps Engineering | Artag Dev",
      metaDescription:
        "Application cybersecurity and DevSecOps: HMAC-SHA256 cryptographic webhook verification, PostgreSQL multi-tenant RLS isolation, OAuth2/JWT hardening, OWASP LLM defense, and Linux hardening.",
      badge: "VERTICAL 04 // APPSEC & DEVSECOPS",
      h1: "Application Security, API Hardening & DevSecOps Engineering",
      subtitle:
        "Defense-in-depth built directly into your application code and database layer: verified cryptography, enforced tenant isolation, and hardened AI agents.",
      metrics: [
        {
          value: "HMAC",
          label: "Constant-time SHA-256",
          detail: "Cryptographic webhook verification using `timingSafeEqual` and strict anti-replay windows.",
        },
        {
          value: "RLS",
          label: "PostgreSQL isolation",
          detail: "Row-Level Security policies that block cross-tenant reads even if an application query has a bug.",
        },
        {
          value: "OWASP",
          label: "API + LLM Top 10",
          detail: "Defenses against prompt injection, BOLA/IDOR, excessive agency, and data exfiltration.",
        },
      ],
      proofTitle: "Technical proof: Edge-to-database defense in depth",
      proofSummary:
        "We ship verifiable security controls in production: raw-body HMAC webhook validation, dynamic CSP headers, rate limiting, PostgreSQL multi-tenant isolation, and hardened Linux container hosts.",
      proofHighlights: [
        "HMAC-SHA256 cryptographic verification over raw payloads with constant-time comparison (`crypto.timingSafeEqual`) and timestamp anti-replay checks.",
        "Strict PostgreSQL multi-tenant isolation via Row-Level Security (RLS) bound to authenticated session contexts.",
        "Hardened OAuth2/OIDC and short-lived JWT rotation following least-privilege principles.",
        "Linux and container hardening: non-root runtimes, strict CSP/HSTS headers, egress controls, and automated CI security gates.",
      ],
      architectureDiagram: `[Client / External Webhook]
        │
        ▼
[WAF / Rate Limit + CSP / HSTS]
        │
        ▼
[HMAC-SHA256 Verification + Anti-Replay Window]
        │
        ▼
[OAuth2/JWT + Least-Privilege AuthZ] ──▶ [PostgreSQL Tenant RLS]`,
      capabilitiesTitle: "Application Security & DevSecOps Capabilities",
      capabilities: [
        {
          code: "SEC-01",
          title: "API & B2B Webhook Hardening",
          description:
            "Eliminate spoofing, replay attacks, injection vectors, and broken object-level authorization across REST APIs and webhook receivers.",
          deliverables: [
            "Raw-body HMAC-SHA256 verification middleware with zero-downtime secret rotation",
            "Per-IP, per-tenant, and per-key rate limiting",
            "Strict payload schema validation and HTTP security headers",
          ],
        },
        {
          code: "SEC-02",
          title: "Multi-Tenant Isolation & PostgreSQL Security",
          description:
            "Enforce tenant boundaries inside the database engine rather than relying solely on application-level WHERE clauses.",
          deliverables: [
            "Audited PostgreSQL Row-Level Security (RLS) policy design",
            "Automated cross-tenant penetration tests in CI",
            "Secrets management, TLS enforcement, and verified backup recovery",
          ],
        },
        {
          code: "SEC-03",
          title: "AI Agent Hardening (OWASP LLM Top 10)",
          description:
            "Protect production LLM workflows against direct/indirect prompt injection, sensitive data leakage, and unsafe tool invocation.",
          deliverables: [
            "Input sanitization, instruction boundaries, and structured output validation",
            "Least-privilege tool permissions with human approval for sensitive actions",
            "Full audit trails of prompts, tool calls, and responses",
          ],
        },
      ],
      stack: [
        "HMAC-SHA256",
        "PostgreSQL RLS",
        "OAuth2 / OIDC / JWT",
        "OWASP API & LLM Top 10",
        "Linux Hardening",
        "CSP / HSTS",
        "Docker Security",
        "Cloudflare",
      ],
      faqs: [
        {
          question: "Why isn't filtering by `tenant_id` in backend code enough?",
          answer:
            "A single missing `WHERE tenant_id = ?` clause in a new endpoint can expose another customer's records. PostgreSQL Row-Level Security enforces tenant isolation at the database engine level regardless of application bugs.",
        },
        {
          question: "How do you prevent webhook replay attacks?",
          answer:
            "We verify the HMAC-SHA256 signature over the raw request bytes using `timingSafeEqual`, enforce a signed timestamp window (e.g., 5 minutes), and deduplicate event IDs in Redis.",
        },
        {
          question: "Can you harden an existing platform ahead of enterprise security reviews?",
          answer:
            "Yes. We run focused security code reviews, remediate critical API/auth/isolation issues, and add automated regression tests to your CI pipeline.",
        },
      ],
      relatedNotes: [
        {
          slug: "webhook-security-hmac-sha256-anti-replay",
          title: "B2B Webhook Security: Cryptographic HMAC-SHA256 Verification and Anti-Replay",
          summary: "Constant-time signature checks, secret rotation, and rate limiting in production.",
        },
        {
          slug: "owasp-llm-top-10-agent-hardening",
          title: "OWASP Top 10 for LLMs: Hardening AI Agents Against Prompt Injection and Exfiltration",
          summary: "Least-privilege tool calling, trace auditing, and structured output validation.",
        },
      ],
      ctaTitle: "Need to harden your API, multi-tenant SaaS, or production AI agents?",
      ctaBody:
        "We review your attack surface and implement concrete cryptographic and database-level protections without slowing down product velocity.",
    },
  },

  "software-development": {
    es: {
      id: "software-development",
      locale: "es",
      slug: "desarrollo-de-software",
      path: "/es/servicios/desarrollo-de-software",
      alternatePath: "/services/software-development",
      metaTitle: "Desarrollo de Software Empresarial y Automatización B2B | Artag Dev",
      metaDescription:
        "Desarrollo de software empresarial y automatización B2B end-to-end: arquitectura limpia, aplicaciones web de alto rendimiento, observabilidad, CI/CD y 100% propiedad intelectual del cliente.",
      badge: "VERTICAL 05 // SOFTWARE CORE & B2B",
      h1: "Desarrollo de Software Empresarial y Automatización B2B",
      subtitle:
        "Ingeniería de ciclo completo orientada a resultados operativos: desde el diagnóstico técnico hasta el despliegue observable en producción, con código limpio que tu equipo puede heredar y escalar.",
      metrics: [
        {
          value: "100%",
          label: "Propiedad intelectual",
          detail: "Repositorios, infraestructura como código y documentación 100% en propiedad del cliente.",
        },
        {
          value: "90+",
          label: "Lighthouse Performance & SEO",
          detail: "Aplicaciones web rápidas, accesibles (WCAG AA) y optimizadas para Core Web Vitals.",
        },
        {
          value: "CI/CD",
          label: "Entregas verificables",
          detail: "Pruebas automatizadas, revisión de tipos estricta y despliegues reproducibles en cada iteración.",
        },
      ],
      proofTitle: "Ciclo de ingeniería end-to-end sin cajas negras",
      proofSummary:
        "Cada proyecto sigue un estándar riguroso: arquitectura limpia separando dominio e infraestructura, observabilidad desde el primer día, automatización de flujos repetitivos y transferencia completa de conocimiento.",
      proofHighlights: [
        "Arquitectura limpia y modular (TypeScript estricto, validación de fronteras con Zod, separación clara de dominio y adaptadores).",
        "Automatización de procesos B2B conectando WhatsApp, Slack, correos, CRMs, hojas de cálculo y APIs internas.",
        "Observabilidad y resiliencia: logs estructurados, métricas de rendimiento, alertas y respaldos automatizados.",
        "Propiedad intelectual 100% del cliente, sin licencias ocultas ni dependencia forzosa de proveedor.",
      ],
      architectureDiagram: `[Diagnóstico & Spec Técnica] ──▶ [Arquitectura Limpia + Modelo de Datos]
                                                   │
                                                   ▼
[CI/CD + Pruebas Automatizadas] ◀── [Desarrollo Iterativo (Web + APIs + Automatización)]
        │
        ▼
[Producción Observable + Documentación + Propiedad 100% Cliente]`,
      capabilitiesTitle: "Capacidades de Desarrollo de Software B2B",
      capabilities: [
        {
          code: "SW-01",
          title: "Aplicaciones Web SaaS y Portales Empresariales",
          description:
            "Construcción de productos digitales, paneles de administración y portales de autoservicio con Next.js, React y PostgreSQL.",
          deliverables: [
            "Diseño de interfaz sobrio, responsive y accesible (WCAG 2.1 AA)",
            "Backend tipado con autenticación, roles y auditoría",
            "Optimización de Core Web Vitals y SEO técnico integrado",
          ],
        },
        {
          code: "SW-02",
          title: "Automatización de Flujos Operativos B2B",
          description:
            "Eliminamos trabajo manual repetitivo integrando tus herramientas actuales mediante webhooks, colas y conectores a la medida.",
          deliverables: [
            "Integración entre ERP, CRM, WhatsApp, correo y bases de datos",
            "Manejo de errores, reintentos y notificaciones ante fallos",
            "Medición clara de horas ahorradas por semana",
          ],
        },
        {
          code: "SW-03",
          title: "Observabilidad, CI/CD y Mantenibilidad",
          description:
            "Software preparado para crecer con tu empresa: pipelines automatizados, entornos de staging y documentación técnica clara.",
          deliverables: [
            "Pipelines de pruebas y despliegue continuo",
            "Documentación de arquitectura (ADRs) y guías de operación",
            "Acompañamiento post-lanzamiento y transferencia al equipo interno",
          ],
        },
      ],
      stack: [
        "Next.js / React",
        "TypeScript",
        "Node.js / NestJS",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Playwright",
        "GitHub Actions",
      ],
      faqs: [
        {
          question: "¿Cómo garantizan que el software sea fácil de mantener a futuro?",
          answer:
            "Usamos TypeScript estricto, arquitectura modular sin dependencias mágicas, pruebas automatizadas y documentos de decisión técnica (ADRs) para que cualquier ingeniero senior pueda entender y extender el sistema.",
        },
        {
          question: "¿Pueden empezar con una automatización puntual y luego escalar a una plataforma completa?",
          answer:
            "Sí. Muchos clientes comienzan resolviendo un cuello de botella operativo concreto (por ejemplo, integración de pedidos o atención) y luego evolucionan la base hacia un sistema empresarial completo sin tirar el trabajo previo.",
        },
        {
          question: "¿Quién es dueño del código y de los servidores?",
          answer:
            "El cliente es dueño del 100% del código fuente, la base de datos y las cuentas de infraestructura desde el inicio del proyecto.",
        },
      ],
      relatedNotes: [
        {
          slug: "microservicios-idempotencia-redis-bullmq",
          title: "De Monolito a 13 Microservicios: Idempotencia con Redis y Colas BullMQ bajo Alta Carga",
          summary: "Criterios reales para evolucionar la arquitectura de software empresarial.",
        },
        {
          slug: "automatizacion-ia-whatsapp-empresas-pereira",
          title: "Automatización con Agentes de IA y WhatsApp API para Empresas en Pereira y el Eje Cafetero",
          summary: "Ejemplos concretos de automatización B2B y retorno operativo.",
        },
      ],
      ctaTitle: "¿Listo para construir software sólido que resuelva un cuello de botella real?",
      ctaBody:
        "Cuéntanos qué proceso quieres sistematizar o qué producto vas a lanzar y trazamos un plan técnico claro por etapas.",
    },
    en: {
      id: "software-development",
      locale: "en",
      slug: "software-development",
      path: "/services/software-development",
      alternatePath: "/es/servicios/desarrollo-de-software",
      metaTitle: "Custom B2B Software Development & Workflow Automation | Artag Dev",
      metaDescription:
        "End-to-end custom B2B software development and workflow automation: clean architecture, observability, CI/CD, high-performance web apps, and 100% client IP ownership.",
      badge: "VERTICAL 05 // CORE SOFTWARE & B2B",
      h1: "Custom B2B Software Development & Workflow Automation",
      subtitle:
        "End-to-end software engineering focused on operational leverage: clean architecture, observable production deployments, and maintainable code your team owns completely.",
      metrics: [
        {
          value: "100%",
          label: "Client IP ownership",
          detail: "Source repositories, infrastructure-as-code, and documentation belong entirely to your organization.",
        },
        {
          value: "90+",
          label: "Lighthouse Performance & SEO",
          detail: "Fast, accessible (WCAG AA) web applications engineered for Core Web Vitals.",
        },
        {
          value: "CI/CD",
          label: "Verified releases",
          detail: "Strict TypeScript, automated test suites, and reproducible deployments on every sprint.",
        },
      ],
      proofTitle: "End-to-end engineering lifecycle with zero black boxes",
      proofSummary:
        "Every engagement follows disciplined engineering fundamentals: clean separation of domain logic and adapters, day-one observability, resilient B2B workflow automation, and full knowledge transfer.",
      proofHighlights: [
        "Clean, modular architecture (strict TypeScript, Zod boundary validation, clear domain-to-adapter boundaries).",
        "B2B workflow automation connecting WhatsApp, Slack, email, CRMs, spreadsheets, and internal APIs.",
        "Built-in observability and reliability: structured logs, latency/error telemetry, alerts, and automated backups.",
        "100% client intellectual property ownership with zero vendor lock-in or opaque licensing.",
      ],
      architectureDiagram: `[Discovery & Technical Spec] ──▶ [Clean Architecture + Data Model]
                                                │
                                                ▼
[CI/CD + Automated Tests] ◀── [Iterative Delivery (Web + APIs + Automation)]
        │
        ▼
[Observable Production + Runbooks + 100% Client IP]`,
      capabilitiesTitle: "Custom Software & Automation Capabilities",
      capabilities: [
        {
          code: "SW-01",
          title: "B2B SaaS Platforms & Internal Tools",
          description:
            "Custom web applications, operational dashboards, and customer portals engineered with Next.js, React, and PostgreSQL.",
          deliverables: [
            "Responsive, accessible (WCAG 2.1 AA) UI architecture",
            "Typed backend APIs with RBAC and audit trails",
            "Core Web Vitals and technical SEO built in from day one",
          ],
        },
        {
          code: "SW-02",
          title: "B2B Process & Integration Automation",
          description:
            "Eliminate manual copy-pasting by connecting your existing systems through verified webhooks, queues, and custom adapters.",
          deliverables: [
            "Reliable integrations across ERP, CRM, WhatsApp, email, and databases",
            "Idempotent retries, dead-letter handling, and failure alerts",
            "Measurable weekly hours saved across operations",
          ],
        },
        {
          code: "SW-03",
          title: "Observability, CI/CD & Long-Term Maintainability",
          description:
            "Software built to outlast its first launch: automated pipelines, staging environments, and concise architectural documentation.",
          deliverables: [
            "Automated test and deployment pipelines",
            "Architecture Decision Records (ADRs) and operational runbooks",
            "Post-launch support and smooth handoff to in-house engineers",
          ],
        },
      ],
      stack: [
        "Next.js / React",
        "TypeScript",
        "Node.js / NestJS",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Playwright",
        "GitHub Actions",
      ],
      faqs: [
        {
          question: "How do you ensure the codebase stays maintainable long-term?",
          answer:
            "We enforce strict TypeScript, modular domain boundaries, automated integration/E2E tests, and concise Architecture Decision Records (ADRs) so any senior engineer can onboard quickly.",
        },
        {
          question: "Can we start with a focused workflow automation and expand later?",
          answer:
            "Yes. Many teams start by automating a single operational bottleneck and evolve that foundation into a full internal platform or customer portal without rewriting from scratch.",
        },
        {
          question: "Who owns the code and cloud accounts?",
          answer:
            "You retain 100% ownership of all source code, databases, and cloud infrastructure from day one.",
        },
      ],
      relatedNotes: [
        {
          slug: "microservices-idempotency-redis-bullmq",
          title: "From Monolith to 13 Microservices: Redis Idempotency and BullMQ Under Load",
          summary: "Real architectural trade-offs for scaling B2B software platforms.",
        },
        {
          slug: "webhook-security-hmac-sha256-anti-replay",
          title: "B2B Webhook Security: Cryptographic HMAC-SHA256 Verification and Anti-Replay",
          summary: "How we secure cross-system B2B integrations in production.",
        },
      ],
      ctaTitle: "Ready to build dependable B2B software or automate a critical workflow?",
      ctaBody:
        "Tell us what bottleneck you want to eliminate or what product you are shipping, and we will propose a clear phased plan.",
    },
  },
}

export function getPillarBySlug(
  slug: string,
  locale: "en" | "es"
): PillarContent | undefined {
  for (const id of Object.keys(PILLARS_DATA) as PillarId[]) {
    const entry = PILLARS_DATA[id][locale]
    if (entry.slug === slug) return entry
  }
  return undefined
}

export function getAllPillarsForLocale(locale: "en" | "es"): PillarContent[] {
  return PILLAR_ROUTES.map((r) => PILLARS_DATA[r.id as PillarId][locale])
}
