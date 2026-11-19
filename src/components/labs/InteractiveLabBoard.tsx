"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  Cpu,
  Server,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from "lucide-react"
import type { ProjectProps } from "@/data/projects"
import { PRIVATE_MICROSERVICES_COUNT } from "@/data/projects"
import { PrivateServicesMap } from "@/components/labs/PrivateServicesMap"
import { serverCards } from "@/data/serverAndResources/serverAndResourcesData"
import { courseCertifications } from "@/data/currentstudies/courseCertificationsData"

type LabTab = "systems" | "infrastructure" | "studies"

interface ModuleContract {
  id: string
  slug: string
  name: string
  category: string
  testBadge: string
  inputContract: string
  outputContract: string
  resilience: string
  metrics: string[]
}

const MODULE_CONTRACTS: Record<"en" | "es", ModuleContract[]> = {
  en: [
    {
      id: "atiende",
      slug: "atiende",
      name: "Atiende — Multi-Channel AI Agent",
      category: "RAG + LLM Router + Channels",
      testBadge: "295 tests / 40 files · ~30% cache savings",
      inputContract: "Meta Webhook (WhatsApp / IG / Messenger) -> HMAC-SHA256 verified JSON event",
      outputContract: "Grounded tool-call response + Order/Ticket state + Dashboard WebSocket sync",
      resilience: "Redis message-id deduplication, BullMQ retries with backoff, circuit breaker across Groq/OpenAI fallback, one-click human escalation.",
      metrics: ["295 tests in 40 files", "~30% LLM cost reduction via semantic cache", "Tenant-isolated pgvector retrieval"],
    },
    {
      id: "cv-harness",
      slug: "cv-harness",
      name: "CV Harness — 7-Stage Event-Driven Pipeline",
      category: "Idempotent AI Workflow",
      testBadge: "188 API tests · 17/17 E2E tests",
      inputContract: "Job posting URL/text + Candidate structured profile",
      outputContract: "Zod-validated JSON fit report + tailored CV draft + audit log",
      resilience: "Idempotent stage hashing per job, dead-letter queue isolation, strict Zod output guards preventing schema hallucination.",
      metrics: ["188 API tests passing", "17/17 E2E tests passing", "7 deterministic pipeline stages"],
    },
    {
      id: "social-harness",
      slug: "social-harness",
      name: "Social Harness — Human-Guided AI Coach",
      category: "Human-in-the-Loop Orchestration",
      testBadge: "Validated · Human approval gate",
      inputContract: "Topic brief + brand tone guidelines + prior post telemetry",
      outputContract: "Draft variants + editorial critique + explicit human approval payload",
      resilience: "Never auto-publishes without human sign-off; versioned prompt templates with deterministic rollback.",
      metrics: ["100% human-approved publishing", "Structured rubric scoring", "Audit trail per draft"],
    },
    {
      id: "doc-harness",
      slug: "doc-harness",
      name: "Doc Harness — Structured AI Document Editing",
      category: "Diff-Based Document Engine",
      testBadge: "Validated · Deterministic diffs",
      inputContract: "Structured document AST + scoped edit instruction",
      outputContract: "Section-level patch diff + validation checksum",
      resilience: "Scoped section locks prevent full-document rewrites; schema validation rejects malformed patches before write.",
      metrics: ["Scoped AST diff patching", "Zero silent overwrites", "Repeatable validation checks"],
    },
  ],
  es: [
    {
      id: "atiende",
      slug: "atiende",
      name: "Atiende — Agente IA Multicanal",
      category: "RAG + Router LLM + Canales",
      testBadge: "295 tests / 40 archivos · ~30% ahorro caché",
      inputContract: "Webhook Meta (WhatsApp / IG / Messenger) -> Evento JSON verificado HMAC-SHA256",
      outputContract: "Respuesta grounded con tools + estado de pedido + sincronización en dashboard",
      resilience: "Deduplicación por message-id en Redis, reintentos en BullMQ con backoff, circuit breaker entre Groq/OpenAI y escalamiento humano.",
      metrics: ["295 tests en 40 archivos", "~30% ahorro en costos LLM por caché semántico", "Recuperación pgvector aislada por tenant"],
    },
    {
      id: "cv-harness",
      slug: "cv-harness",
      name: "CV Harness — Pipeline Event-Driven de 7 Etapas",
      category: "Flujo IA Idempotente",
      testBadge: "188 API tests · 17/17 E2E tests",
      inputContract: "Oferta laboral (URL/texto) + perfil estructurado del candidato",
      outputContract: "Reporte JSON de afinidad validado con Zod + borrador CV + registro de auditoría",
      resilience: "Hash idempotente por etapa, aislamiento en dead-letter queue y guardas Zod estrictas que impiden alucinaciones de esquema.",
      metrics: ["188 pruebas API aprobadas", "17/17 pruebas E2E aprobadas", "7 etapas deterministas"],
    },
    {
      id: "social-harness",
      slug: "social-harness",
      name: "Social Harness — Coach IA con Supervisión Humana",
      category: "Orquestación Human-in-the-Loop",
      testBadge: "Validado · Compuerta de aprobación humana",
      inputContract: "Brief temático + guía de tono + telemetría de publicaciones previas",
      outputContract: "Variantes de borrador + crítica editorial + payload de aprobación humana explícita",
      resilience: "Nunca publica sin aprobación humana; plantillas de prompt versionadas con rollback determinista.",
      metrics: ["100% publicación aprobada por humano", "Evaluación por rúbrica", "Trazabilidad por borrador"],
    },
    {
      id: "doc-harness",
      slug: "doc-harness",
      name: "Doc Harness — Edición Estructurada de Documentos",
      category: "Motor de Diffs Deterministas",
      testBadge: "Validado · Diffs deterministas",
      inputContract: "AST estructurado del documento + instrucción acotada de edición",
      outputContract: "Parche por sección + checksum de validación",
      resilience: "Bloqueo por sección evita reescrituras completas; validación de esquema rechaza parches malformados antes de persistir.",
      metrics: ["Parches acotados por sección", "Cero sobrescrituras silenciosas", "Validación repetible"],
    },
  ],
}

export function InteractiveLabBoard({
  projects,
  privateMapTitle,
  privateMapNote,
}: {
  projects: ProjectProps[]
  privateMapTitle: string
  privateMapNote: string
}) {
  const locale = useLocale()
  const lang = locale === "es" ? "es" : "en"
  const [activeTab, setActiveTab] = useState<LabTab>("systems")
  const [selectedModuleId, setSelectedModuleId] = useState<string>("atiende")

  const contracts = MODULE_CONTRACTS[lang]
  const selectedContract =
    contracts.find((c) => c.id === selectedModuleId) ?? contracts[0]
  const matchingProject = projects.find((p) => p.slug === selectedContract.slug)

  const tabs: { id: LabTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "systems",
      label: lang === "es" ? "Sistemas & Harnesses" : "Systems & Harnesses",
      icon: <Cpu className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "infrastructure",
      label:
        lang === "es"
          ? `Infraestructura & Servidores (${PRIVATE_MICROSERVICES_COUNT})`
          : `Infrastructure & Private Servers (${PRIVATE_MICROSERVICES_COUNT})`,
      icon: <Server className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "studies",
      label: lang === "es" ? "Estudios & Certificaciones" : "Studies & Certifications",
      icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    },
  ]

  return (
    <div data-testid="interactive-lab-board" className="space-y-8">
      {/* Internal tabs (1px hairline bar) */}
      <div
        role="tablist"
        aria-label={lang === "es" ? "Secciones del laboratorio" : "Lab sections"}
        className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-[var(--border-hairline)] bg-[var(--bg-secondary)]"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              data-testid={`lab-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 border-r border-b border-[var(--border-hairline)] px-4 py-3.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                active
                  ? "bg-[var(--bg-tertiary)] text-[var(--accent-signal)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50 hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Systems & Harnesses */}
      {activeTab === "systems" && (
        <div role="tabpanel" className="space-y-6">
          {/* Selectable module nodes in 1px grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--border-hairline)] bg-[var(--bg-secondary)]">
            {contracts.map((mod) => {
              const selected = mod.id === selectedContract.id
              return (
                <button
                  key={mod.id}
                  type="button"
                  data-testid={`lab-node-${mod.id}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`flex flex-col items-start justify-between border-r border-b border-[var(--border-hairline)] p-5 text-left transition-colors ${
                    selected
                      ? "bg-[var(--bg-tertiary)] border-b-[var(--accent-signal)]"
                      : "hover:bg-[var(--bg-tertiary)]/50"
                  }`}
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--accent-signal)]">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{mod.category}</span>
                    </div>
                    <h2 className="text-lg font-medium text-[var(--text-primary)]">
                      {mod.name}
                    </h2>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-signal)]" aria-hidden="true" />
                    <span>{mod.testBadge}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected module detail panel */}
          <article
            data-testid="lab-module-detail"
            className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
                  {selectedContract.category}
                </p>
                <h3
                  className="mt-1 text-2xl sm:text-3xl text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {selectedContract.name}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 border border-[var(--accent-signal)]/40 bg-[var(--accent-signal)]/10 px-3 py-1.5 font-mono text-xs text-[var(--accent-signal)]">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedContract.testBadge}
              </span>
            </div>

            {/* I/O Contract & Resilience grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border-hairline)] bg-[var(--bg-primary)]">
              <div className="border-r border-b border-[var(--border-hairline)] p-4">
                <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
                  {lang === "es" ? "Contrato de entrada" : "Input contract"}
                </div>
                <p className="font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                  {selectedContract.inputContract}
                </p>
              </div>
              <div className="border-r border-b border-[var(--border-hairline)] p-4">
                <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
                  {lang === "es" ? "Contrato de salida" : "Output contract"}
                </div>
                <p className="font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                  {selectedContract.outputContract}
                </p>
              </div>
              <div className="border-r border-b border-[var(--border-hairline)] p-4">
                <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--accent-amber)]">
                  {lang === "es" ? "Fallos / Circuit breaker" : "Failure handling / Circuit breaker"}
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {selectedContract.resilience}
                </p>
              </div>
            </div>

            {/* Audited proof points + link to full case study */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {selectedContract.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {metric}
                  </li>
                ))}
              </ul>

              {matchingProject && (
                <Link
                  href={`/projects/${matchingProject.slug}`}
                  className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
                >
                  <span>{lang === "es" ? "Abrir caso de estudio completo" : "Open full case study"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        </div>
      )}

      {/* Tab 2: Infrastructure & Private Servers */}
      {activeTab === "infrastructure" && (
        <div role="tabpanel" className="space-y-6">
          <PrivateServicesMap title={privateMapTitle} note={privateMapNote} />

          <div className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--text-primary)]">
                {lang === "es" ? "Instancias & Servicios Privados" : "Private Server Instances"}
              </h3>
              <Link
                href="/private-servers"
                className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-signal)] hover:underline"
              >
                <span>{lang === "es" ? "Ver página dedicada" : "Open full view"}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border-hairline)] bg-[var(--bg-primary)]">
              {serverCards.map((srv) => (
                <div
                  key={srv.id}
                  className="border-r border-b border-[var(--border-hairline)] p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
                      {srv.title}
                    </span>
                    <span className="font-mono text-[11px] uppercase text-[var(--accent-signal)]">
                      {srv.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                    {srv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Studies & Certifications */}
      {activeTab === "studies" && (
        <div role="tabpanel" className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
            <div>
              <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--text-primary)]">
                {lang === "es"
                  ? "Certificaciones & Aprendizaje Continuo"
                  : "Certifications & Continuous Learning"}
              </h3>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {lang === "es"
                  ? `${courseCertifications.length} cursos y certificaciones verificadas en arquitectura, backend e IA.`
                  : `${courseCertifications.length} verified courses and certifications across architecture, backend and AI.`}
              </p>
            </div>
            <Link
              href="/currentStudies"
              className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-signal)] hover:underline"
            >
              <span>{lang === "es" ? "Ver bitácora completa" : "Open full learning log"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border-hairline)] bg-[var(--bg-primary)]">
            {courseCertifications.slice(0, 8).map((cert) => (
              <div
                key={cert.id}
                className="border-r border-b border-[var(--border-hairline)] p-4"
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[var(--accent-signal)]">
                  <span>{cert.platform}</span>
                  <span className="text-[var(--text-secondary)]">{cert.year}</span>
                </div>
                <div className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                  {cert.title}
                </div>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {cert.reinforces}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
