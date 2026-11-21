import type { EngineeringArticle } from "./types"

export const AI_ARTICLES: EngineeringArticle[] = [
  // =========================================================================
  // ARTÍCULO 1 (ES): Caché semántico con pgvector y reducción del 30%
  // =========================================================================
  {
    id: "semantic-cache-pgvector",
    locale: "es",
    slug: "cache-semantico-pgvector-reduccion-costos-llm",
    alternateSlug: "semantic-caching-pgvector-llm-cost-reduction",
    title: "Cómo reducir un 30% el costo de LLMs en producción usando Caché Semántico y pgvector",
    description:
      "Arquitectura práctica de caché en dos niveles (exacto en Redis + semántico en PostgreSQL con pgvector), umbrales conservadores de similitud coseno, invalidación por versión de catálogo y medición real detrás del ~30% de ahorro en Atiende.",
    category: "AI Engineering",
    datePublished: "2026-11-10",
    dateModified: "2026-11-21",
    readingTime: 11,
    tags: ["LLM", "pgvector", "Caché Semántico", "Redis", "Control de Costos", "RAG"],
    pillarPath: "/es/servicios/ingenieria-ia-agentes",
    pillarLabel: "Ingeniería de IA, Sistemas RAG y Agentes Autónomos",
    metrics: [
      { value: "~30%", label: "Reducción en tokens facturados" },
      { value: "0.92", label: "Umbral mínimo similitud coseno" },
      { value: "< 45ms", label: "Latencia p95 en acierto de caché" },
    ],
    intro: [
      "Cuando un agente de inteligencia artificial pasa de prototipo a operación diaria sobre canales como WhatsApp Business API o chat web, la factura de tokens deja de ser un gasto marginal y se convierte en el principal componente de costo variable del producto. En Atiende, nuestro sistema multicanal de atención y ventas, observamos que casi la mitad de las preguntas entrantes de clientes eran variaciones léxicas de consultas ya resueltas horas antes: disponibilidad de referencias, políticas de envío, horarios de entrega o preguntas frecuentes del catálogo.",
      "La solución naíf consiste en poner un caché de texto exacto delante del modelo, pero los usuarios reales rara vez escriben dos veces la misma frase carácter por carácter. En este artículo detallo cómo implementamos una arquitectura de caché en dos capas —caché exacto en Redis y caché semántico en PostgreSQL con pgvector— que redujo aproximadamente un 30% los tokens facturados por conversación en nuestras mediciones comparativas, manteniendo cero fugas entre tenants y evitando respuestas obsoletas cuando cambia el inventario.",
    ],
    sections: [
      {
        id: "cuando-cachear-y-cuando-omitir",
        heading: "Cuándo conviene cachear y cuándo el caché es un bug",
        paragraphs: [
          "El error más costoso al implementar caché semántico no es una tasa de acierto baja, sino devolver una respuesta cacheada que depende de estado mutable o de identidad del usuario. En un agente conversacional empresarial debemos clasificar cada turno antes de tocar cualquier capa de caché. Si la consulta involucra datos personales, estado de un pedido activo, un carrito recién modificado o una conversación ya transferida a un agente humano, el caché debe omitirse por completo.",
          "En contraste, las consultas sin estado sobre el catálogo vigente, fichas técnicas, tiempos estimados de despacho, cobertura geográfica y políticas de garantía presentan una repetición altísima. Separar ambos caminos mediante una compuerta determinista de intención reduce simultáneamente el riesgo de error factual y el volumen de embeddings innecesarios que terminan contaminando el índice vectorial.",
        ],
        list: [
          "Elegible para caché: preguntas de catálogo, horarios, métodos de pago, políticas de devolución y preguntas frecuentes de producto.",
          "Prohibido cachear: estado de pedidos, saldos de cartera, mensajes con PII o turnos posteriores a una escalación humana.",
          "Regla de oro: nunca cachear argumentos intermedios de llamadas a herramientas (tool calling); únicamente la respuesta final validada para el usuario.",
        ],
      },
      {
        id: "arquitectura-tres-niveles",
        heading: "Arquitectura de referencia: Compuerta determinista, Redis y pgvector",
        paragraphs: [
          "Antes de invocar un proveedor como OpenAI o Anthropic, cada mensaje elegible atraviesa una tubería secuencial ordenada por costo marginal y latencia. El primer nivel es una compuerta determinista que resuelve saludos simples, menús o consultas de código SKU exacto sin llamar al LLM. El segundo nivel es un caché exacto en Redis indexado por el hash SHA-256 del prompt normalizado concatenado con el identificador del tenant y la versión activa del catálogo.",
          "Si Redis devuelve un fallo (cache miss), el tercer nivel genera el vector de embedding de la pregunta normalizada y consulta PostgreSQL con la extensión pgvector usando un índice HNSW. Solo si existe una entrada del mismo tenant, para la misma versión de catálogo y con una distancia coseno inferior o igual a 0.08 (equivalente a similitud coseno >= 0.92), devolvemos la respuesta almacenada en menos de 45 milisegundos sin consumir tokens de generación.",
        ],
        code: {
          language: "sql",
          filename: "migrations/014_semantic_cache_pgvector.sql",
          snippet: `CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE semantic_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL,
  catalog_version TEXT NOT NULL,
  intent_bucket   TEXT NOT NULL,
  normalized_text TEXT NOT NULL,
  embedding       vector(1536) NOT NULL,
  response_text   TEXT NOT NULL,
  hit_count       INTEGER NOT NULL DEFAULT 0,
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice HNSW para búsqueda aproximada de vecinos más cercanos por coseno
CREATE INDEX idx_semantic_cache_embedding
  ON semantic_cache
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Índice compuesto para filtrar rápido por tenant, versión e intención
CREATE INDEX idx_semantic_cache_scope
  ON semantic_cache (tenant_id, catalog_version, intent_bucket, expires_at);`,
        },
      },
      {
        id: "umbrales-similitud-coseno",
        heading: "Calibración de umbrales de similitud coseno por intención",
        paragraphs: [
          "Uno de los primeros tropiezos en producción fue usar un único umbral global de similitud coseno para todas las preguntas. Con un valor de 0.90, frases cortas como «¿cuánto vale el rojo?» y «¿cuánto vale el negro?» superaban el umbral y devolvían el precio equivocado. Al subir el umbral global a 0.96, las falsas coincidencias desaparecieron, pero la tasa de acierto cayó por debajo del 8% y el ahorro dejó de justificar el mantenimiento del índice.",
          "La solución estable consistió en aplicar umbrales diferenciados por categoría de intención y exigir una longitud mínima de tokens antes de consultar pgvector. Para preguntas de políticas generales o logística aceptamos 0.92; para consultas con atributos de producto (tallas, colores, referencias numéricas) exigimos 0.95 y verificamos que las entidades numéricas extraídas coincidan exactamente antes de aceptar el hit semántico.",
        ],
        code: {
          language: "typescript",
          filename: "src/ai/cache/semantic-cache.service.ts",
          snippet: `import crypto from "node:crypto";
import type { Pool } from "pg";
import type { Redis } from "ioredis";

export interface CacheLookupInput {
  tenantId: string;
  catalogVersion: string;
  intentBucket: "policy" | "catalog" | "shipping";
  prompt: string;
}

const THRESHOLD_BY_INTENT: Record<CacheLookupInput["intentBucket"], number> = {
  policy: 0.92,
  shipping: 0.92,
  catalog: 0.95,
};

export function normalizePrompt(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9\\s]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

export async function lookupSemanticCache(
  pg: Pool,
  redis: Redis,
  embed: (text: string) => Promise<number[]>,
  input: CacheLookupInput
): Promise<{ hit: "exact" | "semantic" | "miss"; answer?: string; similarity?: number }> {
  const normalized = normalizePrompt(input.prompt);
  if (normalized.length < 12) return { hit: "miss" };

  const exactHash = crypto
    .createHash("sha256")
    .update(\`\${input.tenantId}:\${input.catalogVersion}:\${normalized}\`)
    .digest("hex");

  const exactHit = await redis.get(\`llm:exact:\${exactHash}\`);
  if (exactHit) return { hit: "exact", answer: exactHit, similarity: 1 };

  const vector = await embed(normalized);
  const vectorLiteral = \`[\${vector.join(",")}]\`;
  const minSimilarity = THRESHOLD_BY_INTENT[input.intentBucket];

  const { rows } = await pg.query<{ id: string; response_text: string; similarity: number }>(
    \`SELECT id, response_text, 1 - (embedding <=> $1::vector) AS similarity
       FROM semantic_cache
      WHERE tenant_id = $2
        AND catalog_version = $3
        AND intent_bucket = $4
        AND expires_at > NOW()
      ORDER BY embedding <=> $1::vector
      LIMIT 1\`,
    [vectorLiteral, input.tenantId, input.catalogVersion, input.intentBucket]
  );

  const best = rows[0];
  if (!best || best.similarity < minSimilarity) {
    return { hit: "miss" };
  }

  await pg.query("UPDATE semantic_cache SET hit_count = hit_count + 1 WHERE id = $1", [best.id]);
  return { hit: "semantic", answer: best.response_text, similarity: best.similarity };
}`,
        },
      },
      {
        id: "invalidacion-por-tenant",
        heading: "Invalidación de caché por tenant y versión de catálogo",
        paragraphs: [
          "En arquitecturas multi-tenant el problema de coherencia de caché es crítico: si un comercio actualiza el precio de una referencia a las 10:05 a. m., ningún cliente puede recibir el precio anterior a las 10:06 a. m. Borrar filas de forma selectiva por similitud vectorial es lento y propenso a dejar residuos. En su lugar, incluimos un campo inmutable `catalog_version` (un entero monotónico o hash de snapshot del catálogo del tenant) dentro de la llave de Redis y en la cláusula `WHERE` de PostgreSQL.",
          "Cada vez que el sistema de sincronización procesa una actualización de precios o stock para un tenant, incrementa su `catalog_version` en Redis en menos de un milisegundo. De forma inmediata, todas las consultas nuevas dejan de coincidir con las entradas antiguas sin bloquear escrituras, mientras una tarea programada nocturna purga las filas vencidas de `semantic_cache` mediante `DELETE` por lotes para mantener compacto el índice HNSW.",
        ],
      },
      {
        id: "benchmarks-latencia-y-costos",
        heading: "Benchmarks de latencia y medición real del ahorro de ~30%",
        paragraphs: [
          "Para validar si la complejidad adicional justificaba su mantenimiento, registramos telemetría por conversación durante dos ventanas consecutivas de dos semanas sobre el mismo catálogo y la misma base de código. En la primera ventana operamos solo con el caché exacto en Redis; en la segunda activamos la capa semántica en pgvector junto con el caché exacto. La métrica principal fueron los tokens facturados por conversación completa (sumando entrada y salida en todos los turnos), no por solicitud aislada.",
          "El resultado mostró una reducción cercana al 30% en tokens facturados por conversación al combinar ambas capas, junto con una caída drástica en latencia percibida: los aciertos en Redis respondieron en ~6 ms y los aciertos semánticos en pgvector (incluyendo la llamada de embedding) en menos de 45 ms p95, frente a los 1.400–2.800 ms típicos de una inferencia completa con herramientas. Adicionalmente, el costo de generar embeddings pequeños resultó menor al 2% del costo evitado en tokens de generación.",
        ],
        list: [
          "Acierto en caché exacto (Redis): ~6 ms de latencia p95 y $0 en inferencia.",
          "Acierto en caché semántico (pgvector): ~42 ms de latencia p95 (embedding + búsqueda HNSW).",
          "Fallo completo (LLM + Tool Calling): 1.4s – 2.8s dependiendo del proveedor y tamaño del contexto.",
          "Transparencia metodológica: tratamos el ~30% como benchmark del proyecto Atiende bajo su patrón de tráfico; cada negocio debe medir su tasa de repetición antes de proyectar ahorros.",
        ],
      },
      {
        id: "lecciones-produccion",
        heading: "Lecciones aprendidas y siguientes pasos",
        paragraphs: [
          "El caché semántico no reemplaza un buen diseño de prompts ni la selección adecuada de modelos; funciona como multiplicador sobre una base ya disciplinada. Si estás diseñando agentes conversacionales o pipelines RAG y necesitas controlar la economía unitaria desde el primer día, revisa nuestra práctica de Ingeniería de IA, Sistemas RAG y Agentes Autónomos donde aplicamos estos mismos patrones con aislamiento multi-tenant y evaluación automatizada.",
        ],
      },
    ],
  },

  // =========================================================================
  // ARTICLE 1 (EN): Semantic Caching with pgvector & 30% LLM Cost Reduction
  // =========================================================================
  {
    id: "semantic-cache-pgvector",
    locale: "en",
    slug: "semantic-caching-pgvector-llm-cost-reduction",
    alternateSlug: "cache-semantico-pgvector-reduccion-costos-llm",
    title: "Cutting Production LLM Costs by 30% Using Semantic Caching and pgvector",
    description:
      "A practical breakdown of our two-tier caching architecture (Redis exact cache + PostgreSQL pgvector semantic cache), conservative cosine similarity thresholds, tenant-safe catalog invalidation, and the benchmark behind our ~30% token reduction.",
    category: "AI Engineering",
    datePublished: "2026-11-10",
    dateModified: "2026-11-21",
    readingTime: 11,
    tags: ["LLM", "pgvector", "Semantic Caching", "Redis", "Cost Control", "RAG"],
    pillarPath: "/services/ai-engineering",
    pillarLabel: "Production AI Engineering, RAG Pipelines & Autonomous Agents",
    metrics: [
      { value: "~30%", label: "Billed token reduction" },
      { value: "0.92", label: "Minimum cosine threshold" },
      { value: "< 45ms", label: "p95 semantic hit latency" },
    ],
    intro: [
      "Once an AI agent moves from a demo notebook to daily customer traffic across WhatsApp Business API and web chat, token spend stops being a rounding error and becomes the dominant variable cost of the product. Inside Atiende, our multi-channel conversational platform, telemetry revealed that nearly half of incoming customer questions were paraphrases of answers already computed hours earlier: product availability, shipping policies, store hours, and recurring catalog inquiries.",
      "A naive exact-match cache misses most real users because humans rarely type identical strings twice. In this engineering note, I walk through the exact two-tier caching architecture we built—an exact normalized cache in Redis backed by a semantic cache in PostgreSQL with pgvector—that cut billed tokens per conversation by roughly 30% in project benchmarks while guaranteeing strict multi-tenant isolation and instant invalidation when catalog data changes.",
    ],
    sections: [
      {
        id: "when-to-cache-and-when-to-bypass",
        heading: "When semantic caching helps—and when it becomes a production bug",
        paragraphs: [
          "The most expensive failure mode in semantic caching is not a low hit rate; it is serving a cached answer for a stateful or user-specific query. Before touching Redis or pgvector, every inbound turn must pass through a deterministic cache-eligibility gate. Any message referencing an active order status, a mutable shopping cart, personally identifiable information, or a thread already handed off to a human operator bypasses caching completely.",
          "By contrast, stateless inquiries covering catalog facts, delivery windows, warranty rules, and payment methods exhibit high semantic repetition. Separating stateless and stateful intents upfront keeps the vector index clean, prevents false positives, and avoids paying embedding overhead on turns that should always hit live transactional tools.",
        ],
        list: [
          "Cacheable: catalog specifications, FAQs, shipping coverage, return policies, and standard greetings.",
          "Never cache: order tracking, account balances, messages containing user IDs or PII, or post-escalation turns.",
          "Hard rule: cache only the validated final user-facing response—never intermediate tool-calling payloads that embed tenant-specific database IDs.",
        ],
      },
      {
        id: "three-tier-reference-architecture",
        heading: "Reference architecture: Deterministic gate, Redis exact cache, and pgvector",
        paragraphs: [
          "Before reaching OpenAI or Anthropic, an eligible message flows through three layers ordered by marginal cost and latency. Layer 0 is a deterministic short-circuit for exact SKU lookups and fixed menu commands. Layer 1 is a Redis exact cache keyed by a SHA-256 digest of the normalized prompt, tenant ID, and active catalog version.",
          "On a Redis miss, Layer 2 embeds the normalized prompt and executes an approximate nearest-neighbor query in PostgreSQL using pgvector with an HNSW index. Only when a matching row belongs to the same tenant, matches the current catalog version, and satisfies our cosine similarity threshold (>= 0.92) do we return the cached reply—in under 45 milliseconds and without invoking a generative model.",
        ],
        code: {
          language: "sql",
          filename: "migrations/014_semantic_cache_pgvector.sql",
          snippet: `CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE semantic_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL,
  catalog_version TEXT NOT NULL,
  intent_bucket   TEXT NOT NULL,
  normalized_text TEXT NOT NULL,
  embedding       vector(1536) NOT NULL,
  response_text   TEXT NOT NULL,
  hit_count       INTEGER NOT NULL DEFAULT 0,
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HNSW index for fast cosine distance lookup
CREATE INDEX idx_semantic_cache_embedding
  ON semantic_cache
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Composite index for tenant, version, and TTL scoping
CREATE INDEX idx_semantic_cache_scope
  ON semantic_cache (tenant_id, catalog_version, intent_bucket, expires_at);`,
        },
      },
      {
        id: "calibrating-cosine-thresholds",
        heading: "Calibrating cosine similarity thresholds by intent bucket",
        paragraphs: [
          "Our first production mistake was relying on a single global cosine threshold across every question type. At 0.90, short queries such as 'how much is the red one?' and 'how much is the black one?' collided and served the wrong price. Raising the global threshold to 0.96 eliminated collisions but dropped our semantic hit rate below 8%, eroding the economic benefit.",
          "Splitting thresholds by intent bucket solved the trade-off cleanly. General policy and shipping questions run safely at 0.92, whereas catalog queries carrying product attributes require 0.95 plus an exact match on extracted numeric tokens (sizes, model codes) and a minimum normalized length of 12 characters.",
        ],
        code: {
          language: "typescript",
          filename: "src/ai/cache/semantic-cache.service.ts",
          snippet: `import crypto from "node:crypto";
import type { Pool } from "pg";
import type { Redis } from "ioredis";

export interface CacheLookupInput {
  tenantId: string;
  catalogVersion: string;
  intentBucket: "policy" | "catalog" | "shipping";
  prompt: string;
}

const THRESHOLD_BY_INTENT: Record<CacheLookupInput["intentBucket"], number> = {
  policy: 0.92,
  shipping: 0.92,
  catalog: 0.95,
};

export function normalizePrompt(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9\\s]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

export async function lookupSemanticCache(
  pg: Pool,
  redis: Redis,
  embed: (text: string) => Promise<number[]>,
  input: CacheLookupInput
): Promise<{ hit: "exact" | "semantic" | "miss"; answer?: string; similarity?: number }> {
  const normalized = normalizePrompt(input.prompt);
  if (normalized.length < 12) return { hit: "miss" };

  const exactHash = crypto
    .createHash("sha256")
    .update(\`\${input.tenantId}:\${input.catalogVersion}:\${normalized}\`)
    .digest("hex");

  const exactHit = await redis.get(\`llm:exact:\${exactHash}\`);
  if (exactHit) return { hit: "exact", answer: exactHit, similarity: 1 };

  const vector = await embed(normalized);
  const vectorLiteral = \`[\${vector.join(",")}]\`;
  const minSimilarity = THRESHOLD_BY_INTENT[input.intentBucket];

  const { rows } = await pg.query<{ id: string; response_text: string; similarity: number }>(
    \`SELECT id, response_text, 1 - (embedding <=> $1::vector) AS similarity
       FROM semantic_cache
      WHERE tenant_id = $2
        AND catalog_version = $3
        AND intent_bucket = $4
        AND expires_at > NOW()
      ORDER BY embedding <=> $1::vector
      LIMIT 1\`,
    [vectorLiteral, input.tenantId, input.catalogVersion, input.intentBucket]
  );

  const best = rows[0];
  if (!best || best.similarity < minSimilarity) {
    return { hit: "miss" };
  }

  await pg.query("UPDATE semantic_cache SET hit_count = hit_count + 1 WHERE id = $1", [best.id]);
  return { hit: "semantic", answer: best.response_text, similarity: best.similarity };
}`,
        },
      },
      {
        id: "tenant-catalog-invalidation",
        heading: "Zero-downtime invalidation per tenant and catalog version",
        paragraphs: [
          "Stale cache entries destroy trust faster than slow responses. If a merchant updates a SKU price at 10:05 AM, no customer should receive the old price at 10:06 AM. Trying to delete individual vector rows by semantic proximity is slow and error-prone. Instead, every lookup binds an immutable `catalog_version` token—stored per tenant in Redis—into both the exact hash and the PostgreSQL filter clause.",
          "Whenever the ingestion worker finishes updating a tenant's catalog, it atomically increments that tenant's `catalog_version`. New requests immediately stop matching stale rows with zero table locks, while an off-peak cleanup job batch-deletes expired rows so the HNSW index stays lean and predictable.",
        ],
      },
      {
        id: "latency-and-cost-benchmarks",
        heading: "Latency benchmarks and how we measured the ~30% savings",
        paragraphs: [
          "To verify whether semantic caching paid for its operational footprint, we logged per-conversation telemetry across two consecutive two-week windows using the same codebase and product catalog. Window A ran with only the Redis exact cache enabled; Window B enabled both Redis exact caching and the pgvector semantic cache. We measured total billed tokens per multi-turn conversation rather than isolated requests.",
          "Combining both layers cut billed tokens per conversation by ~30% while dramatically improving perceived responsiveness. Redis exact hits returned in ~6 ms and pgvector semantic hits (including embedding generation) completed in under 45 ms p95, compared to 1.4–2.8 seconds for a full LLM turn with tool execution. Meanwhile, embedding API costs remained under 2% of the generation spend avoided.",
        ],
        list: [
          "Redis exact cache hit: ~6 ms p95 latency, $0 generation cost.",
          "pgvector semantic cache hit: ~42 ms p95 latency (embedding + HNSW scan).",
          "Full LLM + tool-calling miss: 1.4s – 2.8s depending on provider load and context size.",
          "Honest caveat: ~30% is a project benchmark under Atiende's catalog traffic profile; always instrument your own repetition rate before forecasting savings.",
        ],
      },
      {
        id: "production-takeaways",
        heading: "Production takeaways and next steps",
        paragraphs: [
          "Semantic caching is a force multiplier on top of disciplined prompt design and deterministic routing—never a substitute for them. If your team is shipping RAG pipelines or autonomous customer agents and wants predictable unit economics from day one, explore our Production AI Engineering, RAG Pipelines & Autonomous Agents service for full architectural details.",
        ],
      },
    ],
  },

  // =========================================================================
  // ARTÍCULO 2 (ES): Arquitectura RAG Multi-Tenant Segura con RLS
  // =========================================================================
  {
    id: "multi-tenant-rag",
    locale: "es",
    slug: "arquitectura-rag-multi-tenant-segura",
    alternateSlug: "secure-multi-tenant-rag-architecture",
    title: "Arquitectura RAG Multi-Tenant Segura: Aislamiento de Datos en Agentes de IA Empresariales",
    description:
      "Cómo evitar fugas de contexto entre clientes en plataformas SaaS con IA usando PostgreSQL Row-Level Security (RLS), chunking híbrido con pgvector y pruebas automatizadas de aislamiento cross-tenant.",
    category: "AI Agents & Security",
    datePublished: "2026-11-12",
    dateModified: "2026-11-21",
    readingTime: 12,
    tags: ["RAG", "Multi-Tenant", "PostgreSQL RLS", "pgvector", "Seguridad IA"],
    pillarPath: "/es/servicios/ingenieria-ia-agentes",
    pillarLabel: "Ingeniería de IA, Sistemas RAG y Agentes Autónomos",
    metrics: [
      { value: "RLS", label: "Aislamiento forzado en SQL" },
      { value: "0", label: "Fugas cross-tenant toleradas" },
      { value: "Híbrido", label: "Vectorial + Full-Text RRF" },
    ],
    intro: [
      "El riesgo número uno al construir una plataforma SaaS con Retrieval-Augmented Generation (RAG) no es que el modelo redacte con estilo robótico: es que un fragmento de contrato, lista de precios o conversación del Cliente A termine inyectado en el contexto de respuesta del Cliente B. En demostraciones de laboratorio suele bastar con agregar `WHERE tenant_id = $1` en la consulta vectorial, pero en sistemas reales con múltiples endpoints, workers asíncronos y desarrolladores iterando rápido, confiar únicamente en la disciplina de la capa de aplicación es una falla de diseño.",
      "En esta nota técnica muestro la arquitectura que utilizamos para blindar sistemas RAG multi-tenant en producción: aislamiento obligatorio a nivel del motor PostgreSQL mediante Row-Level Security (RLS), recuperación híbrida combinando embeddings de pgvector con búsqueda léxica, sanitización contra prompt injection indirecto y una batería de pruebas automatizadas que intenta activamente exfiltrar datos entre tenants en cada despliegue.",
    ],
    sections: [
      {
        id: "riesgo-fuga-contexto",
        heading: "Por qué las bases vectoriales sin RLS fallan en entornos multi-tenant",
        paragraphs: [
          "Cuando un agente consulta documentos empresariales, existen al menos cuatro puntos donde un error sutil puede mezclar información entre organizaciones: una consulta SQL sin filtro de tenant, una llave de caché compartida, un índice de embeddings mal particionado o un ataque de prompt injection indirecto que induce al modelo a invocar una herramienta con un identificador ajeno.",
          "La defensa en profundidad exige asumir que alguna línea de código de la aplicación eventualmente contendrá un error. Si trasladamos la frontera de aislamiento al motor de base de datos con Row-Level Security (RLS) y obligamos a que cada conexión transaccional establezca el `app.current_tenant_id` derivado del token autenticado (nunca de un parámetro enviado por el LLM), entonces incluso una consulta `SELECT * FROM document_chunks` sin cláusula `WHERE` devolverá únicamente las filas del tenant activo.",
        ],
      },
      {
        id: "postgresql-rls-pgvector",
        heading: "Implementación de Row-Level Security (RLS) con pgvector en PostgreSQL",
        paragraphs: [
          "PostgreSQL permite combinar datos transaccionales, control de acceso por fila y búsqueda vectorial con `pgvector` dentro de la misma transacción ACID. Esto elimina la sincronización frágil con bases vectoriales externas donde los permisos suelen quedar desactualizados respecto a la base principal.",
          "El punto clave en la configuración es usar `FORCE ROW LEVEL SECURITY` y ejecutar la aplicación con un rol de base de datos que NO tenga el privilegio `BYPASSRLS`. Además, al usar `SET LOCAL app.current_tenant_id = ...` dentro de una transacción explícita, el contexto de tenant se limpia automáticamente al terminar la transacción, evitando contaminación entre peticiones cuando se usa un pool de conexiones como PgBouncer o `pg.Pool`.",
        ],
        code: {
          language: "sql",
          filename: "migrations/021_rag_rls_isolation.sql",
          snippet: `CREATE TABLE rag_chunks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL,
  document_id  UUID NOT NULL,
  chunk_index  INTEGER NOT NULL,
  content      TEXT NOT NULL,
  tsv          TSVECTOR GENERATED ALWAYS AS (to_tsvector('spanish', content)) STORED,
  embedding    vector(1536) NOT NULL,
  metadata     JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rag_chunks_tenant_hnsw
  ON rag_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_rag_chunks_tsv ON rag_chunks USING gin (tsv);

-- Activar y forzar Row-Level Security
ALTER TABLE rag_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_chunks FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON rag_chunks
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);`,
        },
      },
      {
        id: "chunking-hibrido-y-rrf",
        heading: "Chunking híbrido y recuperación combinada (Vectorial + Léxica RRF)",
        paragraphs: [
          "La búsqueda puramente vectorial brilla con sinónimos y lenguaje natural, pero falla con códigos de producto exactos, NITs, referencias SKU o nombres propios de marcas locales. Por el contrario, `tsvector` en PostgreSQL encuentra coincidencias exactas al instante pero no entiende paráfrasis. Combinar ambos resultados mediante Reciprocal Rank Fusion (RRF) dentro de una única consulta SQL ofrece lo mejor de los dos mundos sin añadir infraestructura externa.",
          "En cuanto al chunking, evitamos cortar documentos a ciegas cada N caracteres. Aplicamos segmentación consciente de estructura (encabezados Markdown, tablas de precios, párrafos completos) con ventanas de 350 a 500 tokens y un solapamiento del 15%, adjuntando siempre el título del documento y la sección padre en el encabezado de cada fragmento para preservar el contexto semántico.",
        ],
        code: {
          language: "typescript",
          filename: "src/ai/rag/tenant-rag.repository.ts",
          snippet: `import type { Pool } from "pg";

export interface RetrievedChunk {
  id: string;
  documentId: string;
  content: string;
  rrfScore: number;
}

export async function searchTenantKnowledge(
  pool: Pool,
  tenantId: string,
  queryText: string,
  queryEmbedding: number[],
  limit = 6
): Promise<RetrievedChunk[]> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Aislamiento estricto por transacción (seguro para connection pooling)
    await client.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);

    const vectorLiteral = \`[\${queryEmbedding.join(",")}]\`;
    const { rows } = await client.query<RetrievedChunk>(
      \`WITH vector_rank AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $1::vector) AS rank
           FROM rag_chunks
          ORDER BY embedding <=> $1::vector
          LIMIT 25
       ),
       lexical_rank AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(tsv, plainto_tsquery('spanish', $2)) DESC) AS rank
           FROM rag_chunks
          WHERE tsv @@ plainto_tsquery('spanish', $2)
          LIMIT 25
       )
       SELECT c.id,
              c.document_id AS "documentId",
              c.content,
              COALESCE(1.0 / (60 + v.rank), 0) + COALESCE(1.0 / (60 + l.rank), 0) AS "rrfScore"
         FROM rag_chunks c
         LEFT JOIN vector_rank v ON v.id = c.id
         LEFT JOIN lexical_rank l ON l.id = c.id
        WHERE v.id IS NOT NULL OR l.id IS NOT NULL
        ORDER BY "rrfScore" DESC
        LIMIT $3\`,
      [vectorLiteral, queryText, limit]
    );

    await client.query("COMMIT");
    return rows;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}`,
        },
      },
      {
        id: "evaluacion-pruebas-aislamiento",
        heading: "Pruebas automatizadas de aislamiento y groundedness en CI",
        paragraphs: [
          "La seguridad multi-tenant no se declara en un diagrama: se verifica en cada pull request. Nuestra suite de integración siembra documentos con secretos sintéticos («canary tokens») en el Tenant A y ejecuta consultas idénticas autenticadas como Tenant B, además de intentar omitir el parámetro de sesión `app.current_tenant_id` para comprobar que PostgreSQL devuelva cero filas por defecto (fail-closed).",
          "Complementamos las pruebas de aislamiento con verificaciones de groundedness: validamos que las respuestas del agente citen únicamente atributos presentes en los fragmentos recuperados y rechacen instrucciones maliciosas incrustadas dentro de documentos subidos por usuarios.",
        ],
        list: [
          "Test fail-closed: sin `app.current_tenant_id` configurado, cualquier `SELECT` sobre `rag_chunks` debe devolver 0 filas.",
          "Test cross-tenant: buscar el canary token exacto del Tenant A bajo la sesión del Tenant B debe devolver 0 resultados.",
          "Test de herramienta: el parámetro `tenantId` jamás se expone en el JSON Schema del LLM; se inyecta desde el contexto autenticado del worker.",
        ],
      },
      {
        id: "conclusion-rag-empresarial",
        heading: "Conclusión: seguridad estructural para IA en producción",
        paragraphs: [
          "Unificar PostgreSQL, pgvector y Row-Level Security simplifica radicalmente la arquitectura de agentes empresariales y cierra la clase más grave de vulnerabilidades en sistemas RAG multi-tenant. Si necesitas diseñar o auditar una plataforma de búsqueda semántica y agentes sobre datos confidenciales, revisa nuestra vertical de Ingeniería de IA, Sistemas RAG y Agentes Autónomos.",
        ],
      },
    ],
  },

  // =========================================================================
  // ARTICLE 2 (EN): Secure Multi-Tenant RAG Architecture with PostgreSQL RLS
  // =========================================================================
  {
    id: "multi-tenant-rag",
    locale: "en",
    slug: "secure-multi-tenant-rag-architecture",
    alternateSlug: "arquitectura-rag-multi-tenant-segura",
    title: "Secure Multi-Tenant RAG Architecture: Data Isolation in Enterprise AI Agents",
    description:
      "How to prevent cross-tenant context leaks in SaaS AI platforms using PostgreSQL Row-Level Security (RLS), hybrid pgvector + lexical retrieval (RRF), and automated isolation tests in CI.",
    category: "AI Agents & Security",
    datePublished: "2026-11-12",
    dateModified: "2026-11-21",
    readingTime: 12,
    tags: ["RAG", "Multi-Tenant", "PostgreSQL RLS", "pgvector", "AI Security"],
    pillarPath: "/services/ai-engineering",
    pillarLabel: "Production AI Engineering, RAG Pipelines & Autonomous Agents",
    metrics: [
      { value: "RLS", label: "Engine-enforced isolation" },
      { value: "0", label: "Cross-tenant leaks tolerated" },
      { value: "Hybrid", label: "Vector + Lexical RRF" },
    ],
    intro: [
      "The number-one engineering risk in a multi-tenant Retrieval-Augmented Generation (RAG) platform is not robotic phrasing—it is a snippet from Customer A's pricing sheet or internal contract leaking into Customer B's agent response. In prototypes, adding `WHERE tenant_id = $1` to a vector query looks sufficient. In production systems with dozens of endpoints, background workers, and fast iteration cycles, relying solely on application-layer filtering is an incident waiting to happen.",
      "In this note, I lay out the multi-tenant RAG architecture we deploy in production: database-enforced isolation using PostgreSQL Row-Level Security (RLS), hybrid vector plus lexical search via Reciprocal Rank Fusion (RRF), strict separation between authenticated session context and LLM tool arguments, and automated cross-tenant canary tests running on every pull request.",
    ],
    sections: [
      {
        id: "why-app-filtering-fails",
        heading: "Why application-only tenant filtering fails in multi-tenant AI",
        paragraphs: [
          "Across a real AI backend there are at least four places where tenant boundaries can silently break: a missing `WHERE` clause in a new SQL query, a shared cache key, a misconfigured external vector store namespace, or an indirect prompt-injection payload tricking a tool call into passing another organization's ID.",
          "Defense in depth assumes application code will eventually contain a bug. When we push tenant enforcement down into PostgreSQL Row-Level Security and bind `app.current_tenant_id` strictly from verified server-side session credentials—never from LLM-generated arguments—even an unfiltered `SELECT * FROM rag_chunks` returns exclusively the active tenant's rows.",
        ],
      },
      {
        id: "postgresql-rls-implementation",
        heading: "Enforcing Row-Level Security (RLS) with pgvector in PostgreSQL",
        paragraphs: [
          "Running `pgvector` inside PostgreSQL keeps transactional metadata, access control, and vector embeddings inside a single ACID boundary. You eliminate eventual-consistency lag and permission drift between your primary database and a separate vector SaaS.",
          "Two operational details make RLS bulletproof: enable `FORCE ROW LEVEL SECURITY` while connecting with a non-superuser role that lacks `BYPASSRLS`, and always scope the tenant setting with `set_config(..., true)` (transaction-local) inside an explicit `BEGIN`/`COMMIT` block so pooled connections never leak state to subsequent requests.",
        ],
        code: {
          language: "sql",
          filename: "migrations/021_rag_rls_isolation.sql",
          snippet: `CREATE TABLE rag_chunks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL,
  document_id  UUID NOT NULL,
  chunk_index  INTEGER NOT NULL,
  content      TEXT NOT NULL,
  tsv          TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
  embedding    vector(1536) NOT NULL,
  metadata     JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rag_chunks_tenant_hnsw
  ON rag_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_rag_chunks_tsv ON rag_chunks USING gin (tsv);

-- Enable and force Row-Level Security
ALTER TABLE rag_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_chunks FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON rag_chunks
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);`,
        },
      },
      {
        id: "hybrid-chunking-and-rrf",
        heading: "Structure-aware chunking and hybrid retrieval (Vector + Lexical RRF)",
        paragraphs: [
          "Pure dense vector search handles synonyms and natural phrasing well, yet struggles with exact SKU codes, invoice IDs, or niche domain acronyms. PostgreSQL full-text search (`tsvector`) excels at exact identifiers but misses paraphrases. Fusing both ranked lists via Reciprocal Rank Fusion (RRF) inside a single SQL CTE gives reliable recall across both query styles without adding another search cluster.",
          "For ingestion, we avoid blind fixed-character slicing. Documents are split along structural boundaries—Markdown headings, tables, and complete paragraphs—into 350–500 token chunks with 15% overlap, prepending the document title and parent heading to every chunk so each vector carries unambiguous context.",
        ],
        code: {
          language: "typescript",
          filename: "src/ai/rag/tenant-rag.repository.ts",
          snippet: `import type { Pool } from "pg";

export interface RetrievedChunk {
  id: string;
  documentId: string;
  content: string;
  rrfScore: number;
}

export async function searchTenantKnowledge(
  pool: Pool,
  tenantId: string,
  queryText: string,
  queryEmbedding: number[],
  limit = 6
): Promise<RetrievedChunk[]> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Transaction-scoped tenant context (safe under connection pooling)
    await client.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);

    const vectorLiteral = \`[\${queryEmbedding.join(",")}]\`;
    const { rows } = await client.query<RetrievedChunk>(
      \`WITH vector_rank AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $1::vector) AS rank
           FROM rag_chunks
          ORDER BY embedding <=> $1::vector
          LIMIT 25
       ),
       lexical_rank AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(tsv, plainto_tsquery('english', $2)) DESC) AS rank
           FROM rag_chunks
          WHERE tsv @@ plainto_tsquery('english', $2)
          LIMIT 25
       )
       SELECT c.id,
              c.document_id AS "documentId",
              c.content,
              COALESCE(1.0 / (60 + v.rank), 0) + COALESCE(1.0 / (60 + l.rank), 0) AS "rrfScore"
         FROM rag_chunks c
         LEFT JOIN vector_rank v ON v.id = c.id
         LEFT JOIN lexical_rank l ON l.id = c.id
        WHERE v.id IS NOT NULL OR l.id IS NOT NULL
        ORDER BY "rrfScore" DESC
        LIMIT $3\`,
      [vectorLiteral, queryText, limit]
    );

    await client.query("COMMIT");
    return rows;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}`,
        },
      },
      {
        id: "automated-isolation-testing",
        heading: "Automated cross-tenant isolation and groundedness tests in CI",
        paragraphs: [
          "Multi-tenant security cannot live only in architecture slides—it must be continuously asserted in CI. Our integration suite seeds synthetic canary tokens into Tenant A and executes identical vector and lexical queries under Tenant B's session, plus an unauthenticated query with no `app.current_tenant_id` set to prove fail-closed behavior.",
          "Beyond database-level assertions, we verify connection-pool hygiene under concurrent load. By firing parallel queries for Tenant A and Tenant B across a small `pg.Pool` (size 2) and inspecting every returned chunk's `tenant_id`, we prove that `set_config('app.current_tenant_id', ..., true)` never bleeds across pooled connections even when one transaction rolls back mid-flight.",
          "Alongside isolation tests, we run groundedness evaluations verifying that the agent only cites facts present in retrieved chunks, refuses to extrapolate missing prices or contract terms, and ignores adversarial instructions embedded inside untrusted uploaded documents.",
        ],
        list: [
          "Fail-closed assertion: querying `rag_chunks` without `app.current_tenant_id` must always return 0 rows.",
          "Cross-tenant canary test: searching Tenant A's exact secret string under Tenant B's session must return 0 matches.",
          "Pool concurrency test: alternating Tenant A and Tenant B queries over a constrained pool must produce zero cross-tenant hits.",
          "Tool boundary rule: `tenantId` is never exposed in the LLM tool JSON Schema; it is injected exclusively from authenticated server context.",
        ],
      },
      {
        id: "closing-enterprise-rag",
        heading: "Closing thoughts: structural safety for enterprise AI",
        paragraphs: [
          "Consolidating PostgreSQL, pgvector, and Row-Level Security eliminates an entire class of catastrophic multi-tenant data leaks while keeping your infrastructure footprint small. If you are designing or auditing a production RAG system over sensitive business data, visit our Production AI Engineering, RAG Pipelines & Autonomous Agents page to see how we build these pipelines end to end.",
        ],
      },
    ],
  },
]
