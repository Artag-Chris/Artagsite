import { getTranslations } from "next-intl/server"
import {
  ArrowDown,
  Award,
  GraduationCap,
  Layers,
} from "lucide-react"
import { getCourseStats } from "@/data/currentstudies/courseCertificationsData"

export async function AtAGlance() {
  const t = await getTranslations("studies")
  const certCount = getCourseStats().total

  const HIGHLIGHTS = [
    {
      icon: GraduationCap,
      iconClass: "text-amber-300",
      borderClass: "border-amber-500/30 hover:border-amber-400/60",
      bgClass: "bg-amber-500/15",
      title: "Misión TIC 2022 — UNAB",
      subtitle: t("atAGlance.misionSub"),
      jumpHref: "#formal-education",
      jumpLabel: t("atAGlance.formalEducation"),
    },
    {
      icon: Layers,
      iconClass: "text-blue-300",
      borderClass: "border-blue-500/30 hover:border-blue-400/60",
      bgClass: "bg-blue-500/15",
      title: t("atAGlance.microservices"),
      subtitle: t("atAGlance.microservicesSub"),
      jumpHref: "#active-studies",
      jumpLabel: t("atAGlance.activeStudies"),
    },
    {
      icon: Award,
      iconClass: "text-cyan-300",
      borderClass: "border-cyan-500/30 hover:border-cyan-400/60",
      bgClass: "bg-cyan-500/15",
      title: t("atAGlance.certifications", { count: certCount }),
      subtitle: t("atAGlance.certificationsSub"),
      jumpHref: "#certifications",
      jumpLabel: t("atAGlance.certifications", { count: certCount }),
    },
  ]

  return (
    <section
      aria-label="Credentials at a glance"
      className="max-w-5xl mx-auto mb-10"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 text-center mb-4">
        {t("atAGlance.title")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {HIGHLIGHTS.map((h) => {
          const Icon = h.icon
          return (
            <a
              key={h.title}
              href={h.jumpHref}
              className={`group flex flex-col gap-4 p-5 rounded-xl bg-zinc-900/40 border ${h.borderClass} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg ${h.bgClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className={`h-5 w-5 ${h.iconClass}`} />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-sm font-semibold text-white leading-tight tabular-nums">
                    {h.title}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 leading-snug">
                    {h.subtitle}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-zinc-700/60 text-xs text-zinc-400 group-hover:text-white transition-colors">
                <span>{h.jumpLabel}</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-700/40 border border-zinc-600/50 text-zinc-400 group-hover:bg-blue-500/20 group-hover:border-blue-400/30 group-hover:text-blue-300 transition-colors">
                  <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
