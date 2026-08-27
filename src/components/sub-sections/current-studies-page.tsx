import { BookOpen } from "lucide-react"
import { getTranslations } from "next-intl/server"
import {
  currentStudies,
  getCategoriesWithCounts,
  getStudyStats,
} from "@/data/currentstudies/currentStudiesData"
import { AtAGlance } from "./current-studies/AtAGlance"
import { CourseCertifications } from "./current-studies/CourseCertifications"
import { FormalEducation } from "./current-studies/FormalEducation"
import { StudiesFilterableGrid } from "./current-studies/StudiesFilterableGrid"
import { StudyParticles } from "./current-studies/StudyParticles"

const LAST_UPDATED = "May 2026"

const studiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Full-Stack Developer Current Studies",
  description:
    "Ongoing learning topics of a Colombian full-stack developer covering software architecture, mobile, DevOps, system design and security.",
  itemListElement: currentStudies.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: s.provider },
      url: s.officialLink,
      educationalLevel: s.confidence,
      teaches: s.skills.join(", "),
      timeRequired: s.duration,
    },
  })),
}

const CONFIDENCE_LEGEND = [
  { icon: "🌱", key: "beginner", className: "text-orange-400" },
  { icon: "📚", key: "intermediate", className: "text-yellow-400" },
  { icon: "💪", key: "confident", className: "text-blue-400" },
  { icon: "🚀", key: "expert", className: "text-emerald-400" },
] as const

export default async function CurrentStudiesPage() {
  const t = await getTranslations("studies")
  const stats = getStudyStats()
  const categoriesWithCounts = getCategoriesWithCounts()

  return (
    <main className="bg-zinc-900 min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studiesJsonLd) }}
      />
      <StudyParticles />

      <div className="container mx-auto px-4 py-10 pt-32 md:pt-40 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              {t("titleAccent")}
            </span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-4">
            {t("intro")}
          </p>
          <p className="text-xs text-zinc-500 mb-8">{t("lastUpdated", { date: LAST_UPDATED })}</p>
        </div>

        <AtAGlance />

        <div className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
              <div className="text-sm text-zinc-400">{t("topicsTracked")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{stats.confident}</div>
              <div className="text-sm text-zinc-400">{t("confidentIn")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.active}</div>
              <div className="text-sm text-zinc-400">{t("activeRightNow")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">13</div>
              <div className="text-sm text-zinc-400">{t("microservicesShipped")}</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {CONFIDENCE_LEGEND.map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{item.icon}</span>
                <span className={item.className}>{t(`confidenceLegend.${item.key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <FormalEducation />

        <div className="max-w-4xl mx-auto mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="text-sm font-semibold text-blue-300 mb-4">📚 {t("categoryBreakdown")}</div>
          <div className="flex flex-wrap gap-4">
            {categoriesWithCounts.map(([category, count]) => (
              <div
                key={category}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
              >
                <span className="text-sm font-medium text-blue-300">{category}</span>
                <span className="text-xs text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="active-studies" className="scroll-mt-24">
          <StudiesFilterableGrid studies={currentStudies} />
        </div>

        <CourseCertifications />

        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">{t("learningNeverStops")}</h3>
          <p className="text-zinc-300 max-w-md mx-auto">
            {t("closing")}
          </p>
        </div>
      </div>
    </main>
  )
}
