import { BookOpen } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { currentStudies } from "@/data/currentstudies/currentStudiesData"
import { AtAGlance } from "./current-studies/AtAGlance"
import { CourseCertifications } from "./current-studies/CourseCertifications"
import { FormalEducation } from "./current-studies/FormalEducation"
import { StudiesFilterableGrid } from "./current-studies/StudiesFilterableGrid"
import { StudyParticles } from "./current-studies/StudyParticles"

const LAST_UPDATED = "September 2026"

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

export default async function CurrentStudiesPage() {
  const t = await getTranslations("studies")

  return (
    <main className="bg-zinc-900 min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studiesJsonLd) }}
      />
      <StudyParticles />

      <div className="container mx-auto px-4 py-10 pt-32 md:pt-40 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {t("title")}
            <span className="block text-cyan-400">{t("titleAccent")}</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-4">
            {t("intro")}
          </p>
          <p className="text-xs text-zinc-400 mb-8">{t("lastUpdated", { date: LAST_UPDATED })}</p>
        </div>

        <AtAGlance />

        <div id="active-studies" className="scroll-mt-24">
          <StudiesFilterableGrid studies={currentStudies} />
        </div>

        <FormalEducation />

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
