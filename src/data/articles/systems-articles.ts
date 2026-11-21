import type { EngineeringArticle } from "./types"

export const SYSTEMS_ARTICLES: EngineeringArticle[] = [
  // =========================================================================
  // ARTÍCULO 3 (ES): De Monolito a 13 Microservicios con Redis y BullMQ
  // =========================================================================
  {
    id: "microservices-redis-bullmq",
    locale: "es",
    slug: "microservicios-idempotencia-redis-bullmq",
    alternateSlug: "microservices-idempotency-redis-bullmq",
    title: "De Monolito a 13 Microservicios: Idempotencia con Redis y Colas BullMQ bajo Alta Carga",
    description:
      "Criterios reales para migrar de un monolito a una topología de 13 microservicios, patrón persist-before-enqueue, deduplicación de eventos con Redis, Dead Letter Queues en BullMQ y estrategia de 295+ pruebas automatizadas.",
    category: "Microservicios & Sistemas",
    datePublished: "2026-11-14",
    dateModified: "2026-11-21",
    readingTime: 12,
    tags: ["Microservicios", "Redis", "BullMQ", "Idempotencia", "Sistemas Distribuidos"],
    pillarPath: "/es/servicios/arquitectura-microservicios",
    pillarLabel: "Arquitectura de Microservicios, APIs y Sistemas Distribuidos",
    metrics: [
      { value: "13", label: "Servicios en topología modular" },
      { value: "295+", label: "Pruebas automatizadas en CI" },
      { value: "0", label: "Cobros o envíos duplicados" },
    ],
    intro: [
      "Migrar un monolito a microservicios por moda es la forma más rápida de multiplicar la latencia de red y la complejidad operativa sin ganar nada a cambio. Sin embargo, cuando un sistema combina ingesta de webhooks con SLA de milisegundos, workers de IA que tardan varios segundos por turno, sincronización de catálogos, bots de mensajería y procesos de facturación, compartir un mismo proceso y una misma cola termina generando fallos en cascada: un pico en un canal bloquea al resto de la plataforma.",
      "En esta nota comparto las decisiones concretas detrás de nuestra evolución hacia una topología de 13 microservicios desacoplados: cuándo justifica extraer un servicio, cómo garantizamos idempotencia estricta usando Redis y BullMQ para que los reintentos de red nunca generen acciones duplicadas, cómo gestionamos Dead Letter Queues y cómo sostenemos el ritmo de cambios con más de 295 pruebas automatizadas.",
    ],
    sections: [
      {
        id: "cuando-migrar-realmente",
        heading: "Cuándo migrar realmente de un monolito a microservicios",
        paragraphs: [
          "Antes de partir un repositorio en servicios independientes aplicamos tres filtros pragmáticos. El primero es la heterogeneidad de carga: si un módulo consume CPU o espera respuestas de APIs externas durante 3 segundos mientras otro necesita responder webhooks en menos de 150 ms, separarlos protege el presupuesto de latencia del borde de entrada.",
          "El segundo filtro es el radio de explosión (blast radius): un fallo de memoria o un límite de tasa en el adaptador de Instagram o en un worker de generación de reportes jamás debe tumbar la API principal ni el servicio de autenticación. El tercer filtro es la cadencia de despliegue: los adaptadores de terceros cambian con mucha más frecuencia que el núcleo transaccional. Solo cuando al menos dos de estos criterios se cumplen extraemos un servicio con su propio contrato explícito.",
        ],
        list: [
          "Mantener en el núcleo: dominio altamente acoplado que requiere transacciones ACID conjuntas.",
          "Extraer a servicio/worker: ingesta de webhooks, adaptadores de canales (WhatsApp, Discord, Instagram), inferencia de IA, indexación vectorial y notificaciones.",
          "Regla de transición: usar el patrón Strangler Fig detrás de un gateway interno para migrar tráfico gradualmente sin ventanas de caída.",
        ],
      },
      {
        id: "patron-persist-before-enqueue",
        heading: "Idempotencia con Redis y el patrón Persist-Before-Enqueue",
        paragraphs: [
          "En sistemas distribuidos la entrega «exactamente una vez» en red no existe; lo que existe es entrega «al menos una vez» combinada con consumidores idempotentes. Proveedores como Meta (WhatsApp/Instagram) y pasarelas de pago reintentan el envío de webhooks ante cualquier timeout o código 5xx. Si el endpoint procesa la lógica de negocio sincrónicamente, un pequeño pico de latencia desencadena reintentos en tormenta y mensajes duplicados al cliente final.",
          "Nuestra arquitectura resuelve esto separando la aceptación del procesamiento. El servicio de ingesta valida la firma criptográfica, intenta registrar una clave de idempotencia atómica en Redis con `SET key value NX EX`, persiste el evento crudo en PostgreSQL con restricción `UNIQUE(provider, external_event_id)` y encola un job en BullMQ usando ese mismo identificador determinista como `jobId`. Todo esto ocurre en menos de 35 ms y responde `200 OK` al proveedor.",
        ],
        code: {
          language: "typescript",
          filename: "src/ingestion/idempotent-enqueue.service.ts",
          snippet: `import type { Redis } from "ioredis";
import type { Queue } from "bullmq";
import type { Pool } from "pg";

export interface InboundEvent {
  provider: "whatsapp" | "stripe" | "instagram";
  externalEventId: string;
  tenantId: string;
  payload: Record<string, unknown>;
}

export async function acceptWebhookEvent(
  redis: Redis,
  pg: Pool,
  queue: Queue,
  event: InboundEvent
): Promise<{ accepted: boolean; duplicate: boolean }> {
  const dedupeKey = \`idem:\${event.provider}:\${event.externalEventId}\`;

  // 1. Filtro rápido atómico en Redis (ventana 24h)
  const acquired = await redis.set(dedupeKey, "1", "EX", 86400, "NX");
  if (acquired !== "OK") {
    return { accepted: true, duplicate: true };
  }

  // 2. Persistencia duradera antes de encolar (sobrevive reinicios de Redis)
  const { rowCount } = await pg.query(
    \`INSERT INTO inbound_events (provider, external_event_id, tenant_id, payload)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (provider, external_event_id) DO NOTHING\`,
    [event.provider, event.externalEventId, event.tenantId, JSON.stringify(event.payload)]
  );

  if (rowCount === 0) {
    return { accepted: true, duplicate: true };
  }

  // 3. Encolado con jobId determinista en BullMQ
  await queue.add("process-inbound", event, {
    jobId: \`\${event.provider}-\${event.externalEventId}\`,
    attempts: 5,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: { age: 3600, count: 5000 },
    removeOnFail: false,
  });

  return { accepted: true, duplicate: false };
}`,
        },
      },
      {
        id: "reintentos-y-dead-letter-queues",
        heading: "Manejo de reintentos, Backoff Exponencial y Dead Letter Queues (DLQ)",
        paragraphs: [
          "No todos los errores merecen reintentarse. Si una llamada a una API externa falla con `429 Too Many Requests` o `503 Service Unavailable`, un backoff exponencial con jitter (2s, 4s, 8s, 16s, 32s) permite que el servicio remoto se recupere sin saturarlo. Por el contrario, si el payload viola el esquema de validación o el token del tenant fue revocado (`401`/`400`), reintentar cinco veces solo desperdicia workers y contamina las métricas.",
          "Por eso clasificamos las excepciones en errores transitorios (`RetryableError`) y errores terminales (`UnrecoverableError` de BullMQ). Cuando un job agota sus intentos o lanza un error terminal, un listener centralizado lo mueve a una tabla/cola de Dead Letter Queue con el stack trace, el correlation ID y el payload original, disparando una alerta operativa para inspección y re-ejecución controlada (replay) una vez corregida la causa raíz.",
        ],
        code: {
          language: "typescript",
          filename: "src/workers/inbound.worker.ts",
          snippet: `import { Worker, UnrecoverableError } from "bullmq";

export function createInboundWorker(connection: { host: string; port: number }) {
  const worker = new Worker(
    "inbound-events",
    async (job) => {
      const { tenantId, externalEventId, payload } = job.data;

      if (!tenantId || !payload) {
        throw new UnrecoverableError(\`Invalid payload for event \${externalEventId}\`);
      }

      // Lógica de negocio idempotente del servicio de dominio
      await processDomainEvent({ tenantId, externalEventId, payload });
    },
    {
      connection,
      concurrency: 12,
      limiter: { max: 100, duration: 1000 },
    }
  );

  worker.on("failed", async (job, err) => {
    if (!job) return;
    const exhausted = job.attemptsMade >= (job.opts.attempts ?? 1);
    if (exhausted || err instanceof UnrecoverableError) {
      await recordDeadLetter({
        jobId: job.id ?? "unknown",
        queue: "inbound-events",
        payload: job.data,
        error: err.message,
      });
    }
  });

  return worker;
}`,
        },
      },
      {
        id: "estrategia-295-tests",
        heading: "Estrategia de 295+ pruebas automatizadas en arquitecturas distribuidas",
        paragraphs: [
          "Una topología de 13 microservicios sin pruebas automatizadas se vuelve imposible de refactorizar en menos de seis meses. En lugar de depender únicamente de pruebas manuales en staging, distribuimos nuestras más de 295 pruebas en tres capas con propósito claro: pruebas unitarias rápidas para reglas de dominio y validadores Zod, pruebas de integración contra contenedores efímeros de PostgreSQL y Redis para verificar idempotencia y migraciones, y pruebas E2E de contrato que simulan el ciclo completo desde el webhook firmado hasta la salida del worker.",
          "Cada pull request ejecuta la suite completa en CI antes de permitir el merge. Este cinturón de seguridad nos permite actualizar dependencias, rotar esquemas de colas y desplegar varios servicios por semana sin temor a romper contratos silenciosamente.",
        ],
        list: [
          "Pruebas unitarias (~180): validaciones de dominio, normalización, cálculos de backoff y serialización de eventos.",
          "Pruebas de integración (~85): transacciones PostgreSQL, locks de Redis `SET NX EX`, reintentos de BullMQ y enrutamiento a DLQ.",
          "Pruebas E2E (~30+): flujos críticos multi-servicio con verificación de firmas, correlación de logs y métricas de salida.",
        ],
      },
      {
        id: "cierre-microservicios",
        heading: "Conclusión: desacoplar con criterio y observabilidad",
        paragraphs: [
          "Los microservicios rinden dividendos cuando cada frontera responde a un aislamiento real de carga, fallos o dominio, y cuando la mensajería asíncrona se respalda con idempotencia estricta y pruebas automatizadas. Si estás evaluando desacoplar tu backend o estabilizar colas de alto tráfico, conoce nuestra vertical de Arquitectura de Microservicios, APIs y Sistemas Distribuidos.",
        ],
      },
    ],
  },

  // =========================================================================
  // ARTICLE 3 (EN): Monolith to 13 Microservices with Redis & BullMQ
  // =========================================================================
  {
    id: "microservices-redis-bullmq",
    locale: "en",
    slug: "microservices-idempotency-redis-bullmq",
    alternateSlug: "microservicios-idempotencia-redis-bullmq",
    title: "From Monolith to 13 Microservices: Redis Idempotency and BullMQ Under Load",
    description:
      "Pragmatic criteria for decomposing a monolith into 13 decoupled services, persist-before-enqueue ingestion, Redis idempotency keys, BullMQ Dead Letter Queues, and sustaining velocity with 295+ automated tests.",
    category: "Microservices & Systems",
    datePublished: "2026-11-14",
    dateModified: "2026-11-21",
    readingTime: 12,
    tags: ["Microservices", "Redis", "BullMQ", "Idempotency", "Distributed Systems"],
    pillarPath: "/services/microservices-architecture",
    pillarLabel: "Microservices Architecture & High-Throughput Distributed APIs",
    metrics: [
      { value: "13", label: "Modular services in topology" },
      { value: "295+", label: "Automated tests in CI" },
      { value: "0", label: "Duplicate charges or messages" },
    ],
    intro: [
      "Splitting a monolith into microservices for resume-driven reasons is the fastest way to trade function calls for network latency and distributed debugging headaches. Yet when a production platform mixes millisecond-SLA webhook ingestion, multi-second AI agent turns, catalog syncing, messaging channel adapters, and billing workflows inside one process, a spike in one workload inevitably starves everything else.",
      "In this engineering note, I break down how we evolved into a 13-service topology without stalling delivery: our strict criteria for extracting a service, how we guarantee idempotency using Redis and BullMQ so network retries never cause duplicate side effects, how Dead Letter Queues keep failures observable, and how 295+ automated tests keep refactoring safe.",
    ],
    sections: [
      {
        id: "when-to-actually-migrate",
        heading: "When migrating from a monolith to microservices actually pays off",
        paragraphs: [
          "We run every extraction proposal through three concrete filters. First is workload heterogeneity: when an ingestion endpoint must acknowledge Meta or Stripe webhooks in under 150 ms while an LLM worker takes 3 seconds per turn, isolating them protects edge tail latency.",
          "Second is blast-radius containment: an out-of-memory crash or third-party rate limit inside a channel adapter or export worker should never take down core authentication or transactional APIs. Third is deployment cadence: external integration adapters evolve far more frequently than core billing tables. We only carve out a service when at least two of these filters hold true.",
        ],
        list: [
          "Keep together: tightly coupled domain models requiring single-database ACID transactions.",
          "Extract into services/workers: webhook ingestion, channel adapters (WhatsApp, Discord, Instagram), AI inference, vector indexing, and notifications.",
          "Migration pattern: Strangler Fig behind an internal gateway so traffic shifts gradually with zero downtime.",
        ],
      },
      {
        id: "persist-before-enqueue-idempotency",
        heading: "Redis idempotency and the Persist-Before-Enqueue pattern",
        paragraphs: [
          "True exactly-once network delivery does not exist; resilient distributed systems pair at-least-once delivery with idempotent consumers. Webhook providers retry aggressively whenever a timeout or 5xx occurs. If your receiver executes business logic synchronously, a brief downstream slowdown spirals into retry storms and duplicate customer messages.",
          "Our ingestion service separates acceptance from execution. After verifying the cryptographic signature, it acquires an atomic Redis idempotency lock (`SET key 1 NX EX 86400`), persists the raw payload into PostgreSQL guarded by `UNIQUE(provider, external_event_id)`, and enqueues a BullMQ job using that deterministic event ID as `jobId`. Total acceptance time stays under 35 ms.",
        ],
        code: {
          language: "typescript",
          filename: "src/ingestion/idempotent-enqueue.service.ts",
          snippet: `import type { Redis } from "ioredis";
import type { Queue } from "bullmq";
import type { Pool } from "pg";

export interface InboundEvent {
  provider: "whatsapp" | "stripe" | "instagram";
  externalEventId: string;
  tenantId: string;
  payload: Record<string, unknown>;
}

export async function acceptWebhookEvent(
  redis: Redis,
  pg: Pool,
  queue: Queue,
  event: InboundEvent
): Promise<{ accepted: boolean; duplicate: boolean }> {
  const dedupeKey = \`idem:\${event.provider}:\${event.externalEventId}\`;

  // 1. Fast atomic deduplication in Redis (24h window)
  const acquired = await redis.set(dedupeKey, "1", "EX", 86400, "NX");
  if (acquired !== "OK") {
    return { accepted: true, duplicate: true };
  }

  // 2. Durable persistence before enqueue (survives Redis restarts)
  const { rowCount } = await pg.query(
    \`INSERT INTO inbound_events (provider, external_event_id, tenant_id, payload)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (provider, external_event_id) DO NOTHING\`,
    [event.provider, event.externalEventId, event.tenantId, JSON.stringify(event.payload)]
  );

  if (rowCount === 0) {
    return { accepted: true, duplicate: true };
  }

  // 3. Deterministic BullMQ jobId prevents duplicate queue entries
  await queue.add("process-inbound", event, {
    jobId: \`\${event.provider}-\${event.externalEventId}\`,
    attempts: 5,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: { age: 3600, count: 5000 },
    removeOnFail: false,
  });

  return { accepted: true, duplicate: false };
}`,
        },
      },
      {
        id: "retries-and-dead-letter-queues",
        heading: "Retry policies, exponential backoff, and Dead Letter Queues",
        paragraphs: [
          "Blindly retrying every exception wastes worker capacity and obscures root causes. Transient failures—`429 Too Many Requests`, network resets, or upstream `503` responses—benefit from exponential backoff (2s, 4s, 8s, 16s, 32s). Permanent errors such as schema validation failures or revoked tenant credentials should fail fast via BullMQ's `UnrecoverableError`.",
          "Whenever a job exhausts its retries or throws an unrecoverable error, a worker event handler archives the job metadata, correlation ID, error message, and payload into a Dead Letter Queue table and triggers an alert. Engineers can inspect the root cause, ship a fix, and replay affected events safely because downstream consumers are idempotent.",
        ],
        code: {
          language: "typescript",
          filename: "src/workers/inbound.worker.ts",
          snippet: `import { Worker, UnrecoverableError } from "bullmq";

export function createInboundWorker(connection: { host: string; port: number }) {
  const worker = new Worker(
    "inbound-events",
    async (job) => {
      const { tenantId, externalEventId, payload } = job.data;

      if (!tenantId || !payload) {
        throw new UnrecoverableError(\`Invalid payload for event \${externalEventId}\`);
      }

      // Idempotent domain processing
      await processDomainEvent({ tenantId, externalEventId, payload });
    },
    {
      connection,
      concurrency: 12,
      limiter: { max: 100, duration: 1000 },
    }
  );

  worker.on("failed", async (job, err) => {
    if (!job) return;
    const exhausted = job.attemptsMade >= (job.opts.attempts ?? 1);
    if (exhausted || err instanceof UnrecoverableError) {
      await recordDeadLetter({
        jobId: job.id ?? "unknown",
        queue: "inbound-events",
        payload: job.data,
        error: err.message,
      });
    }
  });

  return worker;
}`,
        },
      },
      {
        id: "testing-295-plus-suite",
        heading: "Sustaining velocity with 295+ automated tests across service boundaries",
        paragraphs: [
          "A 13-service topology without automated testing turns into a distributed big ball of mud within months. We structure our 295+ automated tests across three intentional layers: fast unit tests for pure domain rules and Zod schemas, container-backed integration tests verifying real PostgreSQL constraints, Redis `SET NX EX` locks, and BullMQ retry/DLQ transitions, and end-to-end contract tests exercising full webhook-to-worker flows.",
          "Every pull request runs this gate in CI before merge. That discipline lets us upgrade dependencies, evolve event schemas, and deploy individual services multiple times a week without silent contract drift.",
        ],
        list: [
          "Unit tests (~180): domain invariants, normalization, backoff calculations, and event serialization.",
          "Integration tests (~85): PostgreSQL unique constraints, Redis idempotency windows, and BullMQ DLQ routing.",
          "End-to-end contract tests (~30+): signed webhook ingestion through async worker completion.",
        ],
      },
      {
        id: "closing-microservices",
        heading: "Closing thoughts: decouple with discipline and observability",
        paragraphs: [
          "Microservices deliver real leverage when service boundaries match genuine scaling and fault-isolation needs—and when async queues are backed by strict idempotency and automated tests. If your team is scaling a distributed backend or hardening event queues, see our Microservices Architecture & High-Throughput Distributed APIs practice.",
        ],
      },
    ],
  },

  // =========================================================================
  // ARTÍCULO 4 (ES): Seguridad en Webhooks B2B con HMAC-SHA256 y Anti-Replay
  // =========================================================================
  {
    id: "webhook-hmac-sha256",
    locale: "es",
    slug: "seguridad-webhooks-hmac-sha256",
    alternateSlug: "webhook-security-hmac-sha256-anti-replay",
    title: "Seguridad en Webhooks e Integraciones B2B: Verificación HMAC-SHA256 y Anti-Replay",
    description:
      "Guía de ingeniería para proteger endpoints de webhooks B2B contra suplantación y ataques de repetición usando HMAC-SHA256 sobre cuerpo crudo, crypto.timingSafeEqual, rotación de secretos sin caída y rate limiting.",
    category: "Ciberseguridad & APIs",
    datePublished: "2026-11-16",
    dateModified: "2026-11-21",
    readingTime: 10,
    tags: ["HMAC-SHA256", "Webhooks", "AppSec", "Anti-Replay", "Node.js", "APIs"],
    pillarPath: "/es/servicios/ciberseguridad-aplicaciones",
    pillarLabel: "Ciberseguridad para Aplicaciones, APIs y DevSecOps",
    metrics: [
      { value: "O(n)", label: "Comparación en tiempo constante" },
      { value: "300s", label: "Ventana máxima anti-replay" },
      { value: "0", label: "Caídas en rotación de secretos" },
    ],
    intro: [
      "Los webhooks son la columna vertebral de las integraciones B2B modernas: notifican pagos confirmados en Stripe o Wompi, mensajes entrantes en WhatsApp Business API y cambios de inventario en ERPs. Al estar expuestos públicamente en Internet, un endpoint de webhook mal verificado equivale a dejar abierta una puerta trasera que permite a cualquier atacante inyectar pedidos falsos, disparar reembolsos o saturar colas de procesamiento de IA.",
      "En este artículo detallo los cuatro controles obligatorios que implementamos en todos los receptores de webhooks B2B de Artag Dev: verificación criptográfica HMAC-SHA256 sobre el buffer crudo, comparación en tiempo constante con `crypto.timingSafeEqual`, defensa anti-replay basada en timestamp firmado + deduplicación de nonce, y rotación de secretos sin tiempo de inactividad.",
    ],
    sections: [
      {
        id: "vectores-ataque-webhooks",
        heading: "Ataques de suplantación, timing attacks y repetición (Replay)",
        paragraphs: [
          "Un error sorprendentemente común en APIs Node.js y Express consiste en parsear primero el cuerpo JSON (`express.json()`) y luego volver a serializarlo con `JSON.stringify(req.body)` para calcular la firma HMAC. Cualquier diferencia mínima de espacios, orden de propiedades o escape Unicode invalida la firma legítima y lleva a muchos equipos a relajar o desactivar la verificación en producción.",
          "El segundo vector es el ataque de canal lateral por tiempo (timing attack): comparar la firma esperada con la firma recibida usando `===` retorna en cuanto encuentra el primer byte distinto, filtrando información estadística al atacante. El tercer vector es el ataque de repetición (replay): aunque un atacante no conozca el secreto compartido, puede capturar una petición legítima y reenviarla decenas de veces si no validamos la antigüedad del timestamp firmado ni deduplicamos el evento.",
        ],
        list: [
          "Nunca calcular HMAC sobre `JSON.stringify(req.body)`: capturar siempre el `Buffer` crudo exacto recibido por HTTP.",
          "Nunca usar `===` para comparar firmas criptográficas: usar siempre `crypto.timingSafeEqual` verificando previamente igual longitud de buffers.",
          "Exigir un encabezado de timestamp incluido dentro del mensaje firmado y rechazar solicitudes fuera de una ventana estricta (ej. ±300 segundos).",
        ],
      },
      {
        id: "implementacion-timingsafeequal",
        heading: "Verificación HMAC-SHA256 en tiempo constante y rotación de secretos",
        paragraphs: [
          "Para rotar secretos criptográficos en producción sin interrumpir integraciones activas con clientes o proveedores, nuestro middleware acepta una lista ordenada de secretos válidos (`[currentSecret, previousSecret]`) durante la ventana de rotación. Si la firma coincide en tiempo constante con alguno de los secretos activos y el timestamp está dentro de la tolerancia permitida, la petición avanza; si no, respondemos `401 Unauthorized` sin revelar cuál verificación falló.",
          "En la práctica, la rotación segura sigue un protocolo de tres pasos: primero generamos un secreto aleatorio criptográfico de 256 bits y lo desplegamos como `previousSecret` junto al secreto activo; segundo actualizamos el panel del proveedor o cliente B2B para firmar con la nueva clave y monitoreamos métricas hasta confirmar la migración del tráfico; tercero promovemos la nueva clave a `currentSecret` y retiramos la anterior pasadas 24 horas. Al evaluar ambas llaves en tiempo constante sobre el buffer crudo, los integradores no pierden ni un solo evento durante el cambio.",
        ],
        code: {
          language: "typescript",
          filename: "src/security/webhook-hmac.verifier.ts",
          snippet: `import crypto from "node:crypto";

export interface WebhookVerifyOptions {
  rawBody: Buffer;
  signatureHeader: string | undefined;
  timestampHeader: string | undefined;
  secrets: string[]; // [currentSecret, previousSecretDuringRotation]
  toleranceSeconds?: number;
}

export function verifyWebhookSignature(opts: WebhookVerifyOptions): {
  valid: boolean;
  reason?: "missing_headers" | "stale_timestamp" | "invalid_signature";
} {
  const { rawBody, signatureHeader, timestampHeader, secrets, toleranceSeconds = 300 } = opts;

  if (!signatureHeader || !timestampHeader) {
    return { valid: false, reason: "missing_headers" };
  }

  const parsedTs = Number.parseInt(timestampHeader, 10);
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(parsedTs) || Math.abs(nowSeconds - parsedTs) > toleranceSeconds) {
    return { valid: false, reason: "stale_timestamp" };
  }

  // Firma esperada sobre: "<timestamp>.<rawBody>"
  const signedPayload = Buffer.concat([
    Buffer.from(\`\${parsedTs}.\`, "utf8"),
    rawBody,
  ]);

  const providedHex = signatureHeader.replace(/^sha256=/i, "").trim();
  const providedBuf = Buffer.from(providedHex, "hex");

  for (const secret of secrets) {
    if (!secret) continue;
    const expectedBuf = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest();

    if (
      providedBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(providedBuf, expectedBuf)
    ) {
      return { valid: true };
    }
  }

  return { valid: false, reason: "invalid_signature" };
}`,
        },
      },
      {
        id: "anti-replay-y-rate-limiting",
        heading: "Defensa Anti-Replay con Redis y Rate Limiting por IP y Tenant",
        paragraphs: [
          "La ventana de 300 segundos bloquea la reutilización de peticiones antiguas, pero deja un margen de 5 minutos en el cual un atacante podría reenviar exactamente el mismo paquete capturado. Para cerrar esa ventana combinamos el timestamp firmado con un registro de huella del evento (`sha256(timestamp + signature)` o el `event_id` firmado) en Redis con un TTL igual al doble de la ventana de tolerancia (600 segundos).",
          "En paralelo, aplicamos rate limiting escalonado antes de ejecutar cualquier lógica pesada: un límite por dirección IP en el borde (WAF / Cloudflare) para detener inundaciones volumétricas, y un límite por tenant/llave de integración en Redis para evitar que un proveedor descontrolado sature los workers compartidos.",
        ],
        code: {
          language: "typescript",
          filename: "src/security/anti-replay.guard.ts",
          snippet: `import crypto from "node:crypto";
import type { Redis } from "ioredis";

export async function assertNotReplayed(
  redis: Redis,
  provider: string,
  timestampHeader: string,
  signatureHeader: string,
  ttlSeconds = 600
): Promise<boolean> {
  const fingerprint = crypto
    .createHash("sha256")
    .update(\`\${provider}:\${timestampHeader}:\${signatureHeader}\`)
    .digest("hex");

  const result = await redis.set(\`wh:replay:\${fingerprint}\`, "1", "EX", ttlSeconds, "NX");
  return result === "OK";
}`,
        },
      },
      {
        id: "checklist-hardening-webhooks",
        heading: "Checklist de endurecimiento para webhooks B2B en producción",
        paragraphs: [
          "Antes de exponer cualquier endpoint de integración en producción, validamos estos controles en nuestras pruebas de seguridad automatizadas. Cada control falla de forma cerrada (fail-closed) para evitar degradaciones silenciosas ante errores de configuración en proxies inversos como Cloudflare o NGINX:",
        ],
        list: [
          "Límite estricto de tamaño de payload (ej. 256 KB máximo) para prevenir denegación de servicio por agotamiento de memoria.",
          "TLS 1.2+ obligatorio con HSTS activo y rechazo de redirecciones HTTP sin cifrar.",
          "Registro de auditoría de firmas rechazadas (IP, timestamp, proveedor) sin jamás loguear secretos ni encabezados de autorización.",
          "Respuesta rápida `200 OK` tras verificación y persistencia, delegando todo trabajo pesado a colas asíncronas.",
          "Pruebas negativas automatizadas en CI: payload alterado en un byte, timestamp expirado (> 300s), reenvío duplicado y rotación con secreto secundario.",
        ],
      },
      {
        id: "cierre-webhooks",
        heading: "Conclusión: criptografía verificable en el borde",
        paragraphs: [
          "Implementar correctamente HMAC-SHA256 con `timingSafeEqual`, rotación dual de secretos y anti-replay en Redis toma menos de un día de ingeniería y elimina uno de los vectores de explotación más frecuentes en arquitecturas B2B. Si necesitas auditar o endurecer tus integraciones y APIs, consulta nuestra vertical de Ciberseguridad para Aplicaciones, APIs y DevSecOps.",
        ],
      },
    ],
  },

  // =========================================================================
  // ARTICLE 4 (EN): B2B Webhook Security with HMAC-SHA256 & Anti-Replay
  // =========================================================================
  {
    id: "webhook-hmac-sha256",
    locale: "en",
    slug: "webhook-security-hmac-sha256-anti-replay",
    alternateSlug: "seguridad-webhooks-hmac-sha256",
    title: "B2B Webhook Security: Cryptographic HMAC-SHA256 Verification and Anti-Replay",
    description:
      "Production engineering guide to hardening B2B webhook receivers against spoofing, timing attacks, and replay attacks using raw-body HMAC-SHA256, crypto.timingSafeEqual, zero-downtime secret rotation, and Redis rate limiting.",
    category: "Cybersecurity & APIs",
    datePublished: "2026-11-16",
    dateModified: "2026-11-21",
    readingTime: 10,
    tags: ["HMAC-SHA256", "Webhooks", "AppSec", "Anti-Replay", "Node.js", "APIs"],
    pillarPath: "/services/application-cybersecurity",
    pillarLabel: "Application Security, API Hardening & DevSecOps Engineering",
    metrics: [
      { value: "O(n)", label: "Constant-time comparison" },
      { value: "300s", label: "Strict anti-replay window" },
      { value: "0", label: "Downtime on secret rotation" },
    ],
    intro: [
      "Webhooks power modern B2B automation: payment confirmations from Stripe, inbound customer messages from WhatsApp Business API, and real-time inventory updates from ERPs. Because webhook endpoints sit directly on the public internet, weak signature verification is an open backdoor that lets attackers forge paid orders, trigger refunds, or flood expensive AI worker queues.",
      "In this note, I walk through the four mandatory controls we implement on every B2B webhook receiver at Artag Dev: raw-body HMAC-SHA256 verification, constant-time comparison with `crypto.timingSafeEqual`, timestamp + Redis anti-replay protection, and zero-downtime dual-secret rotation.",
    ],
    sections: [
      {
        id: "webhook-attack-vectors",
        heading: "Spoofing, timing side channels, and replay attacks",
        paragraphs: [
          "A surprisingly common bug in Node.js services is parsing JSON first (`express.json()`) and then calling `JSON.stringify(req.body)` to recompute the HMAC digest. Any whitespace difference, key reordering, or Unicode escape breaks valid signatures—often tempting teams to disable verification in production.",
          "A second flaw is comparing hex digests with `===`, which short-circuits on the first mismatched byte and leaks timing information. A third is skipping replay protection: even without knowing the shared secret, an attacker who captures one valid request can replay it repeatedly unless you enforce a signed timestamp window and deduplicate seen signatures.",
        ],
        list: [
          "Never compute HMAC over `JSON.stringify(req.body)`: always hash the exact raw HTTP `Buffer`.",
          "Never compare cryptographic digests with `===`: always use `crypto.timingSafeEqual` after checking equal byte lengths.",
          "Bind a timestamp header inside the signed payload and reject requests outside a tight window (e.g. ±300 seconds).",
        ],
      },
      {
        id: "constant-time-hmac-rotation",
        heading: "Constant-time HMAC-SHA256 verification with zero-downtime secret rotation",
        paragraphs: [
          "Rotating webhook secrets without breaking active partner integrations requires accepting both the new secret and the previous secret during the cutover window. Our verifier iterates over `[currentSecret, previousSecret]`, computes the HMAC over `<timestamp>.<rawBody>`, and checks equality in constant time. Any failure returns a uniform `401 Unauthorized` without leaking which check failed.",
          "In practice, secret rotation follows a three-step operational runbook: first, generate a 256-bit cryptographically random secret and deploy it as `secondarySecret` alongside the active `primarySecret`; second, update the partner dashboard or webhook issuer to sign with the new key while monitoring metrics to confirm traffic has shifted over; third, promote the new key to `primarySecret` and retire the old key after 24 hours. Because both keys are evaluated in constant time over the exact raw request buffer, partners experience zero dropped deliveries during rotation.",
        ],
        code: {
          language: "typescript",
          filename: "src/security/webhook-hmac.verifier.ts",
          snippet: `import crypto from "node:crypto";

export interface WebhookVerifyOptions {
  rawBody: Buffer;
  signatureHeader: string | undefined;
  timestampHeader: string | undefined;
  secrets: string[]; // [currentSecret, previousSecretDuringRotation]
  toleranceSeconds?: number;
}

export function verifyWebhookSignature(opts: WebhookVerifyOptions): {
  valid: boolean;
  reason?: "missing_headers" | "stale_timestamp" | "invalid_signature";
} {
  const { rawBody, signatureHeader, timestampHeader, secrets, toleranceSeconds = 300 } = opts;

  if (!signatureHeader || !timestampHeader) {
    return { valid: false, reason: "missing_headers" };
  }

  const parsedTs = Number.parseInt(timestampHeader, 10);
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(parsedTs) || Math.abs(nowSeconds - parsedTs) > toleranceSeconds) {
    return { valid: false, reason: "stale_timestamp" };
  }

  // Expected signature over: "<timestamp>.<rawBody>"
  const signedPayload = Buffer.concat([
    Buffer.from(\`\${parsedTs}.\`, "utf8"),
    rawBody,
  ]);

  const providedHex = signatureHeader.replace(/^sha256=/i, "").trim();
  const providedBuf = Buffer.from(providedHex, "hex");

  for (const secret of secrets) {
    if (!secret) continue;
    const expectedBuf = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest();

    if (
      providedBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(providedBuf, expectedBuf)
    ) {
      return { valid: true };
    }
  }

  return { valid: false, reason: "invalid_signature" };
}`,
        },
      },
      {
        id: "anti-replay-and-rate-limiting",
        heading: "Redis anti-replay guards and layered rate limiting",
        paragraphs: [
          "A 300-second timestamp tolerance blocks stale traffic, yet still leaves a five-minute window where a captured request could be replayed. We close that window by storing a SHA-256 fingerprint of `(provider, timestamp, signature)` in Redis using `SET NX EX` for twice the tolerance window (600 seconds).",
          "In parallel, we enforce two-tier rate limiting ahead of business logic: IP-level throttling at the edge WAF to absorb volumetric floods, and per-tenant integration quotas in Redis so one misbehaving partner cannot starve shared workers.",
          "Whenever a replay or rate-limit violation triggers, the endpoint immediately returns `409 Conflict` or `429 Too Many Requests` without enqueuing a BullMQ job or touching PostgreSQL, keeping database CPU flat even under sustained abusive traffic.",
        ],
        code: {
          language: "typescript",
          filename: "src/security/anti-replay.guard.ts",
          snippet: `import crypto from "node:crypto";
import type { Redis } from "ioredis";

export async function assertNotReplayed(
  redis: Redis,
  provider: string,
  timestampHeader: string,
  signatureHeader: string,
  ttlSeconds = 600
): Promise<boolean> {
  const fingerprint = crypto
    .createHash("sha256")
    .update(\`\${provider}:\${timestampHeader}:\${signatureHeader}\`)
    .digest("hex");

  const result = await redis.set(\`wh:replay:\${fingerprint}\`, "1", "EX", ttlSeconds, "NX");
  return result === "OK";
}`,
        },
      },
      {
        id: "webhook-hardening-checklist",
        heading: "Production B2B webhook hardening checklist",
        paragraphs: [
          "Before exposing any external webhook endpoint, we verify the following controls via automated security tests in CI and staging. Each control is designed to fail closed so misconfiguration never silently degrades verification:",
          "In addition to cryptographic validation, pay close attention to reverse-proxy buffering and header forwarding. When running behind Cloudflare, NGINX, or an application load balancer, verify that raw body bytes are never mutated by middleware, that client IP headers (`CF-Connecting-IP` or trusted `X-Forwarded-For`) are extracted safely for rate limiting, and that signature verification runs before any database query or queue write.",
        ],
        list: [
          "Strict request body size limit (e.g., 256 KB max) to prevent memory-exhaustion DoS.",
          "Enforced TLS 1.2+ with HSTS and zero unencrypted HTTP redirects.",
          "Structured audit logs for rejected signatures (IP, provider, reason) without ever logging secrets or authorization headers.",
          "Fast `200 OK` acknowledgement right after verification and persistence, delegating all downstream work to async queues.",
          "Automated negative tests in CI: tampered payload byte, expired timestamp (> 300s), replayed valid request, and rotation cutover with secondary secret.",
          "Alerting on sudden spikes in `401 invalid_signature` responses to catch either an active spoofing probe or an uncoordinated partner secret rotation.",
        ],
      },
      {
        id: "closing-webhooks",
        heading: "Closing thoughts: verifiable cryptography at the perimeter",
        paragraphs: [
          "Proper raw-body HMAC-SHA256 verification, dual-secret rotation, and Redis anti-replay guards take less than a day to implement and eliminate one of the most common attack surfaces in B2B APIs. Treating every inbound webhook as untrusted network input until proven authentic protects both your transactional database and your downstream AI or billing workers from abuse.",
          "If your engineering team needs an API security audit, zero-downtime secret rotation design, or hardened webhook ingestion architecture, explore our Application Security, API Hardening & DevSecOps Engineering service for concrete deliverables and engagement details.",
        ],
      },
    ],
  },
]
