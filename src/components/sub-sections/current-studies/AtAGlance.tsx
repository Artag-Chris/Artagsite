import { getTranslations } from "next-intl/server"
import {
  ArrowDown,
  Award,
  GraduationCap,
  Layers,
} from "lucide-react"

export async function AtAGlance() {
  const t = await getTranslations("studies")

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
      title: t("atAGlance.certifications"),
      subtitle: t("atAGlance.certificationsSub"),
      jumpHref: "#certifications",
      jumpLabel: t("atAGlance.certifications"),
    },
  ]

  return (
    <section
      aria-label="Credentials at a glance"
      className="max-w-5xl mx-auto mb-10"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 text-center mb-4">
        {t("atAGlance")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {HIGHLIGHTS.map((h) => {
          const Icon = h.icon
          return (
            <a
              key={h.title}
              href={h.jumpHref}
              className={`group flex items-center gap-3 p-4 rounded-xl bg-zinc-900/40 border ${h.borderClass} transition-colors`}
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-lg ${h.bgClass} flex items-center justify-center`}
              >
                <Icon className={`h-5 w-5 ${h.iconClass}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white leading-tight">
                  {h.title}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5 leading-snug">
                  {h.subtitle}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-xs text-zinc-500 group-hover:text-white transition-colors">
                <span className="hidden sm:inline">{h.jumpLabel}</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
