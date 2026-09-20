"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Award,
  Brain,
  Calendar,
  ChevronDown,
  Clock,
  Code,
  Container,
  Cpu,
  Database,
  Github,
  Globe,
  Layers,
  Network,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react"
import type { Study, StudyConfidence, StudyIconName, StudyPriority, StudyStatus } from "@/data/currentstudies/currentStudiesData"

const ICON_MAP: Record<StudyIconName, React.ComponentType<{ className?: string }>> = {
  layers: Layers,
  smartphone: Smartphone,
  container: Container,
  network: Network,
  "trending-up": TrendingUp,
  code: Code,
  globe: Globe,
  shield: Shield,
  brain: Brain,
  zap: Zap,
  database: Database,
  cpu: Cpu,
}

const PRIORITY_COLOR: Record<StudyPriority, string> = {
  high: "from-blue-500 to-cyan-400",
  medium: "from-blue-400 to-sky-300",
  low: "from-sky-300 to-blue-200",
}

const CONFIDENCE_COLOR: Record<StudyConfidence, string> = {
  expert: "text-indigo-400 bg-indigo-500/20",
  confident: "text-blue-400 bg-blue-500/20",
  intermediate: "text-yellow-400 bg-yellow-500/20",
  beginner: "text-orange-400 bg-orange-500/20",
}

const CONFIDENCE_ICON: Record<StudyConfidence, string> = {
  expert: "🚀",
  confident: "💪",
  intermediate: "📚",
  beginner: "🌱",
}

function StatusIcon({ status }: { status: StudyStatus }) {
  if (status === "active") return <TrendingUp className="h-4 w-4" />
  if (status === "completed") return <Award className="h-4 w-4" />
  if (status === "upcoming") return <Clock className="h-4 w-4" />
  return <Target className="h-4 w-4" />
}

export function StudyCard({ study, index = 0 }: { study: Study; index?: number }) {
  const t = useTranslations("studies")
  const Icon = ICON_MAP[study.iconName]
  const delay = `${Math.min(index, 8) * 60}ms`

  // Desktop reveals the detail on hover; touch uses the tap toggle instead.
  const [open, setOpen] = useState(false)
  const supportsHoverRef = useRef(false)

  useEffect(() => {
    supportsHoverRef.current = window.matchMedia("(hover: hover)").matches
  }, [])

  const toggleOpen = () => {
    if (supportsHoverRef.current) setOpen(true)
    else setOpen((prev) => !prev)
  }

  return (
    <div
      style={{ animationDelay: delay }}
      onClick={toggleOpen}
      onMouseEnter={() => {
        if (supportsHoverRef.current) setOpen(true)
      }}
      onMouseLeave={() => {
        if (supportsHoverRef.current) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false)
      }}
      className="study-card group relative flex flex-col items-center p-6 bg-zinc-800/30 rounded-3xl border border-zinc-700/50 transition-[border-color,transform,box-shadow] duration-300 cursor-pointer hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 motion-safe:hover:scale-[1.02] hover:z-50 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:fill-mode-both"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${PRIORITY_COLOR[study.priority]}`} />
      </div>

      <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-blue-400 flex items-center justify-center text-blue-400">
        <StatusIcon status={study.status} />
      </div>

      {/* Card face — always within its own cell */}
      <div className="flex flex-col items-center flex-1 w-full">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
            <Icon className="h-8 w-8" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center text-sm">
            {CONFIDENCE_ICON[study.confidence]}
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{study.title}</h3>
          <p className="text-sm text-blue-400 font-medium">{study.category}</p>
          <p className="text-xs text-zinc-400">{study.provider}</p>

          <div className="flex items-center justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${CONFIDENCE_COLOR[study.confidence]}`}>
              {t(`confidenceLevels.${study.confidence}`)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
            <Calendar className="h-3 w-3" />
            <span>{study.startDate}</span>
          </div>

          {study.usedIn && (
            <p className="text-xs text-zinc-400 mt-2 px-2 leading-relaxed">
              <span className="text-blue-300 font-medium">{t("usedIn")}</span>{" "}
              {study.usedIn}
            </p>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation()
              toggleOpen()
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-700/40 hover:bg-zinc-700/70 border border-zinc-600/60 hover:border-blue-400/40 text-zinc-300 hover:text-blue-200 text-xs font-medium transition-colors"
          >
            <ChevronDown className={`h-3.5 w-3.5 text-blue-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            {t("viewDetails")}
          </button>
        </div>
      </div>

      {/* Detail overlay — same footprint as the card, never overflows the grid */}
      <div
        onClick={(e) => e.stopPropagation()}
        aria-hidden={!open}
        inert={!open}
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        className="absolute inset-0 z-10 flex flex-col rounded-3xl bg-zinc-800/95 backdrop-blur-sm border border-blue-400/20 p-5 shadow-2xl shadow-black/60 transition-opacity duration-300 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">{t("skills")}</span>
          <button
            type="button"
            aria-label={t("closeDetails")}
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zinc-700/60 hover:bg-zinc-600/80 text-zinc-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed">{study.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {study.skills.map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 space-y-1.5">
          <a
            href={study.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1.5 transition-colors py-1"
          >
            <Globe className="h-3.5 w-3.5 shrink-0" />
            {t("officialDocs")}
          </a>
          {study.proofLink && (
            <a
              href={study.proofLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1.5 transition-colors py-1"
            >
              <Github className="h-3.5 w-3.5 shrink-0" />
              {study.proofLabel ?? t("viewProof")}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
