"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"
import { Play, RotateCcw, Activity, CheckCircle2, Loader2 } from "lucide-react"

export type PipelineId = "atiende" | "cv-harness"

interface PipelineStep {
  id: string
  stage: string
  detail: string
  latencyMs: number
}

interface HealthState {
  status: "checking" | "online" | "degraded"
  latencyMs?: number
}

const PIPELINES: Record<
  PipelineId,
  {
    en: { title: string; subtitle: string; badge: string; steps: PipelineStep[] }
    es: { title: string; subtitle: string; badge: string; steps: PipelineStep[] }
  }
> = {
  atiende: {
    en: {
      title: "Atiende · WhatsApp RAG + Cache Hit",
      subtitle: "Multi-channel agent with semantic caching & human escalation",
      badge: "~30% cost saved",
      steps: [
        { id: "wh", stage: "01. Webhook Ingress", detail: "Meta HMAC-SHA256 verified · payload persisted", latencyMs: 14 },
        { id: "dd", stage: "02. Deduplication", detail: "Idempotent key checked in Redis (0 duplicates)", latencyMs: 6 },
        { id: "rag", stage: "03. pgvector Search", detail: "Tenant-scoped cosine search · top-4 catalog items", latencyMs: 28 },
        { id: "cache", stage: "04. Semantic Cache Hit", detail: "Similarity 0.96 >= 0.92 threshold · LLM skipped (32ms)", latencyMs: 32 },
        { id: "wa", stage: "05. WhatsApp Delivery", detail: "Meta Cloud API 200 OK · dashboard synced", latencyMs: 41 },
      ],
    },
    es: {
      title: "Atiende · WhatsApp RAG + Cache Hit",
      subtitle: "Agente multicanal con caché semántico y escalamiento humano",
      badge: "~30% ahorro",
      steps: [
        { id: "wh", stage: "01. Webhook Entrante", detail: "Firma Meta HMAC-SHA256 verificada · payload persistido", latencyMs: 14 },
        { id: "dd", stage: "02. Deduplicación", detail: "Clave idempotente en Redis (0 duplicados)", latencyMs: 6 },
        { id: "rag", stage: "03. Búsqueda pgvector", detail: "Consulta coseno por tenant · top-4 del catálogo", latencyMs: 28 },
        { id: "cache", stage: "04. Semantic Cache Hit", detail: "Similitud 0.96 >= 0.92 · llamada LLM omitida (32ms)", latencyMs: 32 },
        { id: "wa", stage: "05. Respuesta WhatsApp", detail: "Meta Cloud API 200 OK · panel sincronizado", latencyMs: 41 },
      ],
    },
  },
  "cv-harness": {
    en: {
      title: "CV Harness · 7-Stage Idempotent Pipeline",
      subtitle: "Event-driven extraction, structured parsing & validated scoring",
      badge: "188 API tests",
      steps: [
        { id: "in", stage: "01. Job Ingestion", detail: "Queued via BullMQ with idempotent job hash", latencyMs: 11 },
        { id: "ex", stage: "02. Text Extraction", detail: "PDF/HTML normalized into clean UTF-8 sections", latencyMs: 35 },
        { id: "pa", stage: "03. Structured Parsing", detail: "Role, stack, seniority & constraints extracted", latencyMs: 48 },
        { id: "ma", stage: "04. Requirement Matching", detail: "pgvector overlap against candidate profile", latencyMs: 24 },
        { id: "sc", stage: "05. Deterministic Scoring", detail: "Weighted rubric computed (fit score: 91/100)", latencyMs: 12 },
        { id: "zv", stage: "06. Zod Schema Validation", detail: "Strict output contract verified · 0 schema drift", latencyMs: 5 },
        { id: "out", stage: "07. Validated JSON Output", detail: "Persisted + webhook event emitted", latencyMs: 9 },
      ],
    },
    es: {
      title: "CV Harness · Pipeline Idempotente 7 Etapas",
      subtitle: "Extracción event-driven, parsing estructurado y scoring validado",
      badge: "188 API tests",
      steps: [
        { id: "in", stage: "01. Ingesta de Oferta", detail: "Encolado en BullMQ con hash idempotente", latencyMs: 11 },
        { id: "ex", stage: "02. Extracción de Texto", detail: "PDF/HTML normalizado a secciones UTF-8 limpias", latencyMs: 35 },
        { id: "pa", stage: "03. Parsing Estructurado", detail: "Rol, stack, seniority y requisitos extraídos", latencyMs: 48 },
        { id: "ma", stage: "04. Matching Semántico", detail: "Cruce pgvector contra el perfil del candidato", latencyMs: 24 },
        { id: "sc", stage: "05. Scoring Determinista", detail: "Rúbrica ponderada calculada (fit: 91/100)", latencyMs: 12 },
        { id: "zv", stage: "06. Validación Zod", detail: "Contrato de salida estricto verificado · 0 drift", latencyMs: 5 },
        { id: "out", stage: "07. Salida JSON Validada", detail: "Persistido y evento webhook emitido", latencyMs: 9 },
      ],
    },
  },
}

export default function PipelineSimulator({
  onPipelineStateChange,
}: {
  onPipelineStateChange?: (state: "idle" | PipelineId) => void
}) {
  const locale = useLocale()
  const lang = locale === "es" ? "es" : "en"
  const [selected, setSelected] = useState<PipelineId>("atiende")
  const [completedCount, setCompletedCount] = useState<number>(0)
  const [isRunning, setIsRunning] = useState(false)
  const [health, setHealth] = useState<HealthState>({ status: "checking" })
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const runSimulation = useCallback(
    (pipelineId: PipelineId) => {
      clearTimers()
      setSelected(pipelineId)
      setCompletedCount(0)
      setIsRunning(true)
      onPipelineStateChange?.(pipelineId)

      const steps = PIPELINES[pipelineId][lang].steps
      steps.forEach((_, idx) => {
        const timer = setTimeout(() => {
          setCompletedCount(idx + 1)
          if (idx === steps.length - 1) {
            setIsRunning(false)
            onPipelineStateChange?.("idle")
          }
        }, (idx + 1) * 320)
        timersRef.current.push(timer)
      })
    },
    [clearTimers, lang, onPipelineStateChange]
  )

  // Listen to global CommandPalette trigger (`artag:run-pipeline`)
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PipelineId>).detail
      if (detail === "atiende" || detail === "cv-harness") {
        runSimulation(detail)
      }
    }
    window.addEventListener("artag:run-pipeline", handler)
    return () => {
      window.removeEventListener("artag:run-pipeline", handler)
      clearTimers()
    }
  }, [runSimulation, clearTimers])

  // Fetch cached telemetry from /api/health
  useEffect(() => {
    let active = true
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: { ok?: boolean; latencyMs?: number }) => {
        if (!active) return
        setHealth({
          status: data.ok ? "online" : "degraded",
          latencyMs: data.latencyMs,
        })
      })
      .catch(() => {
        if (!active) return
        setHealth({ status: "degraded" })
      })
    return () => {
      active = false
    }
  }, [])

  const current = PIPELINES[selected][lang]
  const totalLatency = current.steps
    .slice(0, completedCount)
    .reduce((acc, s) => acc + s.latencyMs, 0)

  return (
    <div
      data-testid="pipeline-simulator"
      className="w-full border border-[var(--border-hairline)] bg-[var(--bg-secondary)]"
    >
      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] bg-[var(--bg-primary)] px-4 py-2.5 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <Activity className="h-3.5 w-3.5 text-[var(--accent-signal)]" aria-hidden="true" />
          <span>artag@artagdev — pipeline</span>
        </div>
        <div className="flex items-center gap-2 border-l border-[var(--border-hairline)] pl-3">
          <span
            className={`h-2 w-2 rounded-full ${
              health.status === "online"
                ? "bg-[var(--accent-signal)]"
                : health.status === "checking"
                ? "bg-[var(--accent-amber)]"
                : "bg-[var(--accent-amber)]"
            }`}
            aria-hidden="true"
          />
          <span className="text-[var(--text-secondary)]">
            api:{" "}
            {health.status === "online"
              ? `${lang === "es" ? "en vivo" : "live"} (${health.latencyMs ?? 1}ms)`
              : health.status === "checking"
              ? lang === "es"
                ? "verificando…"
                : "checking…"
              : lang === "es"
              ? "modo local"
              : "standby"}
          </span>
        </div>
      </div>

      {/* Pipeline selector tabs */}
      <div className="grid grid-cols-2 border-b border-[var(--border-hairline)]">
        {(["atiende", "cv-harness"] as const).map((id) => {
          const active = selected === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                clearTimers()
                setSelected(id)
                setCompletedCount(0)
                setIsRunning(false)
                onPipelineStateChange?.("idle")
              }}
              aria-pressed={active}
              className={`border-r last:border-r-0 border-[var(--border-hairline)] px-4 py-3 text-left font-mono text-xs transition-colors ${
                active
                  ? "bg-[var(--bg-tertiary)] text-[var(--accent-signal)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50 hover:text-[var(--text-primary)]"
              }`}
            >
              <div className="font-semibold uppercase tracking-wider">
                {id === "atiende" ? "Atiende RAG" : "CV Harness"}
              </div>
              <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                {PIPELINES[id][lang].badge}
              </div>
            </button>
          )
        })}
      </div>

      {/* Body & steps */}
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-mono text-sm font-semibold text-[var(--text-primary)]">
              {current.title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">{current.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => runSimulation(selected)}
              disabled={isRunning}
              data-testid="run-pipeline-btn"
              className="inline-flex items-center gap-1.5 border border-[var(--accent-signal)] bg-[var(--accent-signal)]/10 px-3 py-1.5 font-mono text-xs font-medium text-[var(--accent-signal)] transition-colors hover:bg-[var(--accent-signal)]/20 disabled:opacity-50"
            >
              {isRunning ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>
                {isRunning
                  ? lang === "es"
                    ? "Ejecutando…"
                    : "Running…"
                  : lang === "es"
                  ? "Simular flujo"
                  : "Run flow"}
              </span>
            </button>
            {completedCount > 0 && !isRunning && (
              <button
                type="button"
                onClick={() => setCompletedCount(0)}
                aria-label={lang === "es" ? "Reiniciar simulación" : "Reset simulation"}
                className="border border-[var(--border-hairline)] p-1.5 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <ol className="space-y-1.5 font-mono text-xs" aria-live="polite">
          {current.steps.map((step, idx) => {
            const done = idx < completedCount
            const active = isRunning && idx === completedCount
            return (
              <li
                key={step.id}
                data-step-state={done ? "done" : active ? "active" : "idle"}
                className={`flex items-start justify-between gap-3 border px-3 py-2 transition-colors ${
                  done
                    ? "border-[var(--accent-signal)]/50 bg-[var(--accent-signal)]/5 text-[var(--text-primary)]"
                    : active
                    ? "border-[var(--accent-amber)]/60 bg-[var(--accent-amber)]/5 text-[var(--text-primary)]"
                    : "border-[var(--border-hairline)] bg-[var(--bg-primary)]/60 text-[var(--text-secondary)]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      done ? "text-[var(--accent-signal)]" : "text-[var(--border-strong)]"
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-medium">{step.stage}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">{step.detail}</div>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] text-[var(--text-secondary)]">
                  {done ? `${step.latencyMs}ms` : "—"}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="mt-3 flex items-center justify-between border-t border-[var(--border-hairline)] pt-3 font-mono text-[11px] text-[var(--text-secondary)]">
          <span>
            {completedCount === current.steps.length
              ? lang === "es"
                ? "Estado: COMPLETADO (200 OK)"
                : "Status: COMPLETED (200 OK)"
              : isRunning
              ? lang === "es"
                ? `Procesando etapa ${completedCount + 1}/${current.steps.length}`
                : `Processing stage ${completedCount + 1}/${current.steps.length}`
              : lang === "es"
              ? "Listo · Disponible para colaborar"
              : "Ready · Available to collaborate"}
          </span>
          <span>
            {lang === "es" ? "Latencia acumulada:" : "Total latency:"} {totalLatency}ms
          </span>
        </div>
      </div>
    </div>
  )
}
