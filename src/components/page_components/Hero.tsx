"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations, useLocale } from "next-intl"
import { useViewMode } from "@/contexts/ViewModeContext"
import { Link } from "@/i18n/navigation"
import { ArrowUpRight, Download, Terminal } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import PipelineSimulator, { type PipelineId } from "@/components/hero/PipelineSimulator"
import { NeuralRouterSvgFallback } from "@/components/hero/NeuralRouterSvgFallback"

// WebGL scene loaded strictly client-side after H1 hydration (Master Spec §3.2)
const HeroConstellation3D = dynamic(
  () => import("@/components/hero/HeroConstellation3D"),
  {
    ssr: false,
    loading: () => <NeuralRouterSvgFallback accentHex="#00E599" />,
  }
)

function Hero() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const { viewMode, setViewMode } = useViewMode()
  const [show3D, setShow3D] = useState(false)
  const [activePipeline, setActivePipeline] = useState<"idle" | PipelineId>("idle")

  useEffect(() => {
    // Only mount WebGL on desktop viewports (>= 1024px) once the browser is idle
    // or the user interacts, so initial load stays at ~0ms TBT while showing
    // the identical 1px SVG schematic immediately.
    if (window.innerWidth < 1024) return
    let mounted = false
    const activate = () => {
      if (mounted) return
      mounted = true
      setShow3D(true)
      cleanup()
    }
    const timer = setTimeout(activate, 2800)
    const cleanup = () => {
      clearTimeout(timer)
      window.removeEventListener("pointermove", activate)
      window.removeEventListener("scroll", activate)
      window.removeEventListener("keydown", activate)
    }
    window.addEventListener("pointermove", activate, { passive: true, once: true })
    window.addEventListener("scroll", activate, { passive: true, once: true })
    window.addEventListener("keydown", activate, { passive: true, once: true })
    return cleanup
  }, [])

  const accentHex = viewMode === "b2b" ? "#F59E0B" : "#00E599"

  return (
    <section className="relative w-full border-b border-[var(--border-hairline)] bg-[var(--bg-primary)] pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-x-clip">
      {/* Subtle 1px architectural blueprint grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--border-hairline) 1px, transparent 1px), linear-gradient(0deg, var(--border-hairline) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Focused 3D WebGL Neural Router backdrop (right half on desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block lg:w-[58%] opacity-70"
      >
        {show3D ? (
          <HeroConstellation3D mode={viewMode} activePipeline={activePipeline} />
        ) : (
          <NeuralRouterSvgFallback accentHex={accentHex} />
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left column — Immediate LCP Editorial Headline */}
          <div className="lg:col-span-6">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-xs text-[var(--accent-signal)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-signal)]" aria-hidden="true" />
                <span>{t("terminal.badge")}</span>
              </span>

              <div
                className="inline-flex items-center border border-[var(--border-hairline)] bg-[var(--bg-secondary)]"
                role="group"
                aria-label={t("audienceLabel")}
              >
                {(["b2b", "dev"] as const).map((mode) => {
                  const active = viewMode === mode
                  const label = mode === "b2b" ? "B2B" : "Dev"
                  return (
                    <button
                      key={mode}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setViewMode(mode)}
                      className={`border-r last:border-r-0 border-[var(--border-hairline)] px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                        active
                          ? mode === "b2b"
                            ? "bg-[var(--accent-amber)]/15 text-[var(--accent-amber)]"
                            : "bg-[var(--accent-signal)]/15 text-[var(--accent-signal)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            <h1
              className="mb-6 text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.04] tracking-[-0.02em] text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {/* Explicit spaces prevent crawler/screen-reader concatenation */}
              <span className="block">{t("h1line1")}</span>{" "}
              <span className="block italic text-[var(--accent-signal)]">{t("h1line2")}</span>{" "}
              <span className="block text-[var(--text-secondary)]">{t("h1line3")}</span>
            </h1>

            <p className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {t("bioIntro")}
              <strong className="font-medium text-[var(--text-primary)]">{t("bioBold1")}</strong>
              {t("bioMid")}
              <strong className="font-medium text-[var(--text-primary)]">{t("bioBold2")}</strong>
              {t("bioOutro")}
              {t("bioLocation")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/labs"
                className="inline-flex items-center justify-center gap-2 border border-[var(--accent-signal)] bg-[var(--accent-signal)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#0B0C0E] transition-colors hover:bg-[#34F5B2]"
              >
                <Terminal className="h-4 w-4" aria-hidden="true" />
                <span>{t("ctaProjects")}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="/resume.pdf"
                download="Christian_Resume.pdf"
                onClick={() =>
                  trackEvent("cv_download", {
                    location: "hero",
                    locale,
                    file_name: "Christian_Resume.pdf",
                  })
                }
                className="inline-flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-secondary)] px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>{t("ctaResume")}</span>
              </a>
            </div>
          </div>

          {/* Right column — Interactive Pipeline Simulator synced with 3D graph */}
          <div className="lg:col-span-6">
            <PipelineSimulator onPipelineStateChange={setActivePipeline} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
