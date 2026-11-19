"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useViewMode } from "@/contexts/ViewModeContext"
import {
  Search,
  Home,
  FlaskConical,
  User,
  Languages,
  Briefcase,
  Terminal,
  Play,
  Copy,
  Check,
  X,
} from "lucide-react"

interface CommandItem {
  id: string
  group: "navigation" | "actions" | "preferences"
  label: string
  keywords: string
  icon: React.ReactNode
  run: () => void
}

function fuzzyScore(query: string, label: string, keywords: string): number {
  const q = query.trim().toLowerCase()
  if (!q) return 1
  const l = label.toLowerCase()
  const k = keywords.toLowerCase()
  if (l.includes(q)) return 100
  if (k.includes(q)) return 60
  let qi = 0
  for (let i = 0; i < l.length && qi < q.length; i++) {
    if (l[i] === q[qi]) qi++
  }
  return qi === q.length ? 20 : 0
}

export function CommandPalette() {
  const locale = useLocale()
  const isEs = locale === "es"
  const router = useRouter()
  const pathname = usePathname()
  const { setViewMode } = useViewMode()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActiveIndex(0)
  }, [])

  const triggerPipeline = useCallback(
    (pipeline: "atiende" | "cv-harness") => {
      close()
      if (pathname !== "/") {
        router.push("/")
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("artag:run-pipeline", { detail: pipeline }))
        }, 450)
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
        window.dispatchEvent(new CustomEvent("artag:run-pipeline", { detail: pipeline }))
      }
    },
    [close, pathname, router]
  )

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText("info@artagdev.com.co").catch(() => {})
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      close()
    }, 900)
  }, [close])

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: "nav-home",
        group: "navigation",
        label: isEs ? "Ir a Inicio (/)" : "Go to Home (/)",
        keywords: "home inicio hero principal",
        icon: <Home className="h-4 w-4" />,
        run: () => {
          router.push("/")
          close()
        },
      },
      {
        id: "nav-labs",
        group: "navigation",
        label: isEs ? "Ir a Laboratorio de Arquitectura (/labs)" : "Go to Engineering Lab (/labs)",
        keywords: "labs laboratorio arquitectura atiende harnesses microservicios",
        icon: <FlaskConical className="h-4 w-4" />,
        run: () => {
          router.push("/labs")
          close()
        },
      },
      {
        id: "nav-about",
        group: "navigation",
        label: isEs ? "Ir a Sobre Mí — The Architect's Ledger (/about-me)" : "Go to About Me — The Architect's Ledger (/about-me)",
        keywords: "about sobre mi historia ledger timeline trayectoria",
        icon: <User className="h-4 w-4" />,
        run: () => {
          router.push("/about-me")
          close()
        },
      },
      {
        id: "sim-atiende",
        group: "actions",
        label: isEs ? "Simular flujo: Atiende · WhatsApp RAG + Cache Hit" : "Run simulation: Atiende · WhatsApp RAG + Cache Hit",
        keywords: "simular run pipeline atiende whatsapp rag cache hero",
        icon: <Play className="h-4 w-4" />,
        run: () => triggerPipeline("atiende"),
      },
      {
        id: "sim-cv",
        group: "actions",
        label: isEs ? "Simular flujo: CV Harness · 7 Etapas Idempotente" : "Run simulation: CV Harness · 7-Stage Idempotent",
        keywords: "simular run pipeline cv harness bullmq zod hero",
        icon: <Play className="h-4 w-4" />,
        run: () => triggerPipeline("cv-harness"),
      },
      {
        id: "copy-email",
        group: "actions",
        label: copied
          ? isEs
            ? "¡Copiado: info@artagdev.com.co!"
            : "Copied: info@artagdev.com.co!"
          : isEs
          ? "Copiar correo: info@artagdev.com.co"
          : "Copy email: info@artagdev.com.co",
        keywords: "email correo contacto copiar copy info@artagdev.com.co",
        icon: copied ? <Check className="h-4 w-4 text-[var(--accent-signal)]" /> : <Copy className="h-4 w-4" />,
        run: copyEmail,
      },
      {
        id: "lang-toggle",
        group: "preferences",
        label: isEs ? "Cambiar idioma a English (EN)" : "Switch language to Español (ES)",
        keywords: "idioma language english espanol es en locale",
        icon: <Languages className="h-4 w-4" />,
        run: () => {
          const targetLocale = isEs ? "en" : "es"
          document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; samesite=lax`
          const targetPath =
            targetLocale === "en"
              ? pathname || "/"
              : pathname === "/"
              ? "/es"
              : `/es${pathname}`
          close()
          window.location.assign(targetPath)
        },
      },
      {
        id: "mode-b2b",
        group: "preferences",
        label: isEs ? "Cambiar a Vista Negocios (B2B)" : "Switch to Business View (B2B)",
        keywords: "b2b negocios business roi modo mode",
        icon: <Briefcase className="h-4 w-4" />,
        run: () => {
          setViewMode("b2b")
          close()
        },
      },
      {
        id: "mode-dev",
        group: "preferences",
        label: isEs ? "Cambiar a Vista Ingeniería (DEV)" : "Switch to Engineering View (DEV)",
        keywords: "dev ingenieria engineering code modo mode",
        icon: <Terminal className="h-4 w-4" />,
        run: () => {
          setViewMode("dev")
          close()
        },
      },
    ],
    [isEs, router, pathname, close, triggerPipeline, copyEmail, copied, setViewMode]
  )

  const filtered = useMemo(
    () =>
      items
        .map((item) => ({ item, score: fuzzyScore(query, item.label, item.keywords) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.item),
    [items, query]
  )

  // Global keyboard shortcut (Cmd+K / Ctrl+K) + custom open event
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      } else if (e.key === "Escape" && open) {
        e.preventDefault()
        close()
      }
    }
    const onCustomOpen = () => setOpen(true)

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("artag:open-command-palette", onCustomOpen)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("artag:open-command-palette", onCustomOpen)
    }
  }, [open, close])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEs ? "Paleta de comandos" : "Command palette"}
      data-testid="command-palette"
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/75 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="w-full max-w-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--text-primary)]">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[var(--border-hairline)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--accent-signal)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setActiveIndex((prev) =>
                  filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
                )
              } else if (e.key === "Enter" && filtered[activeIndex]) {
                e.preventDefault()
                filtered[activeIndex].run()
              }
            }}
            placeholder={
              isEs
                ? "Buscar ruta, simulación, idioma o acción…"
                : "Search route, simulation, language or action…"
            }
            aria-label={isEs ? "Buscar comando" : "Search command"}
            className="w-full bg-transparent font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label={isEs ? "Cerrar paleta" : "Close palette"}
            className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <ul role="listbox" className="max-h-80 overflow-y-auto divide-y divide-[var(--border-hairline)]">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center font-mono text-xs text-[var(--text-secondary)]">
              {isEs ? "Sin resultados para tu búsqueda." : "No matching commands."}
            </li>
          ) : (
            filtered.map((item, idx) => {
              const selected = idx === activeIndex
              return (
                <li key={item.id} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={item.run}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                      selected
                        ? "bg-[var(--bg-tertiary)] text-[var(--accent-signal)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/60"
                    }`}
                  >
                    <span className="shrink-0 text-[var(--text-secondary)]">{item.icon}</span>
                    <span className="font-mono text-xs sm:text-sm">{item.label}</span>
                  </button>
                </li>
              )
            })
          )}
        </ul>

        {/* Footer hints */}
        <div className="flex items-center justify-between border-t border-[var(--border-hairline)] bg-[var(--bg-primary)] px-4 py-2 font-mono text-[11px] text-[var(--text-secondary)]">
          <span>↑↓ {isEs ? "navegar" : "navigate"} · ↵ {isEs ? "ejecutar" : "run"}</span>
          <span>ESC {isEs ? "cerrar" : "close"}</span>
        </div>
      </div>
    </div>
  )
}
