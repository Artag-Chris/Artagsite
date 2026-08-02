# Atiende

> Agente conversacional de IA para WhatsApp, Instagram DM y Facebook Messenger — atiende clientes 24/7, consulta catálogo con RAG, crea órdenes y escala a humanos cuando hace falta. Arquitectura hexagonal y caching multinivel para ahorro de costos.

[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/nestjs-11-red.svg)](https://nestjs.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

**Estado:** operativo en 3 canales (WhatsApp, Instagram, Messenger) — ver [docs/05_META_INSTAGRAM_MESSENGER.md](docs/05_META_INSTAGRAM_MESSENGER.md) y [docs/03_ROADMAP.md](docs/03_ROADMAP.md).

---

## ¿Qué hace?

Las PYMEs latinoamericanas pierden ventas todos los días porque no responden a tiempo. Atiende es un agente conversacional que:

- Atiende clientes 24/7 con lenguaje natural (no chatbot de respuestas fijas) en **WhatsApp, Instagram DM y Facebook Messenger**.
- Consulta el catálogo del negocio con **búsqueda semántica (RAG)** — nunca inventa precios.
- Crea órdenes conversacionalmente ("quiero 2 unidades del rojo en talla M, envío a [dirección]").
- Detecta quejas y **escala automáticamente a un humano** del negocio, que responde desde el dashboard (multicanal).
- Mantiene memoria de la conversación.
- **Demuestra ahorro:** caching multinivel (prompt cache + semantic cache + exact cache) reduce el costo por conversación ~30% vs llamar al LLM cada vez.
- **Dashboard web** (repo hermano) con bandeja unificada de pendientes y escalaciones por canal, badges de canal (WhatsApp/Instagram/Messenger), y respuesta humana en conversaciones escaladas.

## Stack

| Capa | Tecnología |
|---|---|
| Runtime | Node.js 20+ / TypeScript 5 |
| Framework | NestJS 11 |
| DB | PostgreSQL 16 + pgvector |
| ORM | Prisma 6 |
| Queue | BullMQ + Redis (`@nestjs/bullmq`) |
| LLM | Groq (`llama-3.3-70b-versatile`) — con soporte para Claude, OpenAI, Gemini, Kimi K3 y mock |
| Embeddings | OpenAI `text-embedding-3-small` |
| Canales | Meta WhatsApp Business API + Messenger Platform (Instagram DM y Facebook Messenger) |
| Cifrado | AES-256-GCM (`ENCRYPTION_MASTER_KEY`) para credenciales por business |
| Tests | Vitest |

## Arquitectura

Hexagonal (ports & adapters) con feature flags por módulo:

```
core/         <- lógica de negocio pura, NO importa SDKs
  ports/       <- interfaces: LLMProvider, ChannelProvider, ResponseCachePort, ...
  use-cases/   <- ProcessInboundMessage (pipeline entrante), ExpireEscalations

modules/      <- adapters intercambiables
  llm/{groq,claude,mock,openai,gemini,kimi} + router con circuit breaker
  channels/{whatsapp,instagram,messenger} + base común meta/
  channels/router       <- ChannelRouterService (resuelve adapter por canal)
  channels/webhook      <- pipeline compartido (persist + dedup + enqueue)
  tools/{catalog,orders,info,escalation,knowledge}
  embeddings/openai
  cache/{semantic,exact}
  dashboard, auth, maintenance, ...

config/features.ts  <- prende/apaga módulos por env vars
```

Detalles en [docs/01_ARCHITECTURE.md](docs/01_ARCHITECTURE.md).

## Canales (multi-canal)

El sistema es multicanal desde el diseño: `ChannelProviderPort` + `ChannelRouterService`.

| Canal | Webhook | Envío | Estado |
|---|---|---|---|
| WhatsApp | `POST /webhook/whatsapp` | `graph.facebook.com/{phone_id}/messages` | ✅ Operativo |
| Instagram DM | `POST /webhook/instagram` | `graph.instagram.com/v25.0/me/messages` (IG token) | ✅ Operativo |
| Facebook Messenger | `POST /webhook/messenger` | `graph.facebook.com/{page_id}/messages` (Page token) | ✅ Operativo |

Cada canal puede tener su propia app de Meta (app secret + token). Los tres comparten el pipeline entrante (persist-before-enqueue, dedup, agente IA, envío) vía `ChannelWebhookService` y el router.

Credenciales por business en producción viven **cifradas** en `channel_accounts` (AES-256-GCM); las `META_DEV_*` son solo para dev single-tenant.

Guías: [docs/SETUP_META.md](docs/SETUP_META.md) (WhatsApp), [docs/SETUP_META_INSTAGRAM_MESSENGER.md](docs/SETUP_META_INSTAGRAM_MESSENGER.md) (IG + Messenger), [docs/ENTREGA_INSTAGRAM_MESSENGER.md](docs/ENTREGA_INSTAGRAM_MESSENGER.md) (checklist de tokens).

## Cómo correr local

```bash
# 1. Dependencias
npm install

# 2. Variables de entorno
cp .env.example .env
# editar .env con las API keys, META_*, ENCRYPTION_MASTER_KEY, etc.

# 3. Infraestructura (Postgres con pgvector + Redis)
npm run docker:up

# 4. Generar cliente Prisma y aplicar migraciones
npm run prisma:generate
npm run prisma:migrate:dev

# 5. Seed (business, cuentas de canal, catálogo, usuarios admin)
npm run prisma:seed

# 6. Dev server
npm run start:dev
```

### Otros comandos útiles

```bash
npm test                # vitest
npm run test:watch
npm run test:cov        # con coverage
npm run typecheck       # tsc --noEmit
npm run lint
npm run format
npm run check           # typecheck + lint + format + test (antes de cada PR)
npm run prisma:studio   # GUI de la DB
npm run docker:logs     # tail de Postgres + Redis
```

## Documentación

| Doc | Para qué |
|---|---|
| [docs/00_SPEC.md](docs/00_SPEC.md) | Qué construimos, para quién, métricas de éxito |
| [docs/01_ARCHITECTURE.md](docs/01_ARCHITECTURE.md) | Diseño del sistema, stack con justificación, patrones (Adapter §11, Cache §12, Resiliencia §13) |
| [docs/02_AI_CONCEPTS.md](docs/02_AI_CONCEPTS.md) | Conceptos: tokens, tool use, RAG, embeddings, prompt caching, semantic caching, evals |
| [docs/03_ROADMAP.md](docs/03_ROADMAP.md) | Plan de 6 semanas con entregables verificables |
| [docs/05_META_INSTAGRAM_MESSENGER.md](docs/05_META_INSTAGRAM_MESSENGER.md) | Expansión multi-canal (plan + decisiones) |
| [docs/SETUP_META.md](docs/SETUP_META.md) | Setup de la app de Meta + WhatsApp |
| [docs/SETUP_META_INSTAGRAM_MESSENGER.md](docs/SETUP_META_INSTAGRAM_MESSENGER.md) | Setup de Instagram DM + Messenger |
| [docs/ENTREGA_INSTAGRAM_MESSENGER.md](docs/ENTREGA_INSTAGRAM_MESSENGER.md) | Checklist de tokens/variables para IG + Messenger |
| [docs/AUDIT.md](docs/AUDIT.md) | Auditoría inicial del scaffold |
| [CLAUDE.md](CLAUDE.md) | Contexto para sesiones de Claude Code |

## Filosofía

- **Spec-driven** — cambios empiezan por la spec, no por el código.
- **AI-driven dev** — Claude Code como entorno principal. Subagentes, hooks, MCPs configurados desde día 1.
- **Honestidad sobre abstracciones** — abstraemos lo conceptualmente portable; los features provider-specific viven en sus adapters. Ver [arq §11.3](docs/01_ARCHITECTURE.md#113-adapter-pattern-para-llm-providers).
- **Ahorro como feature** — la métrica "Ahorro Atiende" es visible al business. Ver [arq §12.8](docs/01_ARCHITECTURE.md#128-cómo-lo-demostramos-pitch-comercial).
- **Resiliencia anti-vendor-lockin** — si el LLM primario se cae, las capas 2+3 del cache (provider-agnostic) protegen el 30-60% del tráfico; el resto pasa por fallback LLM. Ver [arq §13](docs/01_ARCHITECTURE.md#13-resiliencia-y-failover-de-proveedor).

## Estado

- ✅ **3 canales operativos** (WhatsApp, Instagram, Messenger) con pipeline de IA completo.
- ✅ **Escalamiento a humano** multicanal + dashboard con badges de canal y respuesta humana.
- ✅ **Caching** exacto (Redis) + semántico (pgvector).
- ✅ **Router LLM** con circuit breaker y fallback (Groq como primario actual).
- ✅ **Cifrado** de credenciales por business (AES-256-GCM).
- ✅ **295 tests** (40 archivos) — `npm run check` verde.
- 🔜 Próximos: onboarding multi-tenant por OAuth de Meta, tokens de larga duración en prod, más canales (Telegram/WebChat).

## Licencia

MIT — ver [LICENSE](LICENSE).

## Autor

**Christian Henao** — Team Lead & Full Stack Developer transicionando a AI Engineering.
[scristxyz@gmail.com](mailto:scristxyz@gmail.com)
