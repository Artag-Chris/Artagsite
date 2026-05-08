import { BookOpen } from "lucide-react"
import {
  currentStudies,
  getCategoriesWithCounts,
  getStudyStats,
} from "@/data/currentstudies/currentStudiesData"
import { StudiesFilterableGrid } from "./current-studies/StudiesFilterableGrid"
import { StudyParticles } from "./current-studies/StudyParticles"

const CONFIDENCE_LEGEND = [
  { icon: "🌱", label: "Beginner", className: "text-orange-400" },
  { icon: "📚", label: "Intermediate", className: "text-yellow-400" },
  { icon: "💪", label: "Confident", className: "text-blue-400" },
  { icon: "🚀", label: "Expert", className: "text-emerald-400" },
] as const

export default function CurrentStudiesPage() {
  const stats = getStudyStats()
  const categoriesWithCounts = getCategoriesWithCounts()

  return (
    <main className="bg-zinc-900 min-h-screen relative overflow-hidden">
      <StudyParticles />

      <div className="container mx-auto px-4 py-10 pt-32 md:pt-40 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Learning Journey
            </span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Continuously learning and expanding my skills through focused study programs and courses. Here&apos;s what
            I&apos;m currently working on and how confident I feel about each technology.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
              <div className="text-sm text-zinc-400">Total Studies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{stats.confident}</div>
              <div className="text-sm text-zinc-400">Confident In</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.active}</div>
              <div className="text-sm text-zinc-400">Active Studies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">{stats.completed}</div>
              <div className="text-sm text-zinc-400">Completed</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {CONFIDENCE_LEGEND.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{item.icon}</span>
                <span className={item.className}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="text-sm font-semibold text-blue-300 mb-4">📚 Category Breakdown</div>
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

        <StudiesFilterableGrid studies={currentStudies} />

        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Learning Never Stops</h3>
          <p className="text-zinc-300 max-w-md mx-auto">
            Knowledge is power, and I&apos;m committed to staying at the forefront of technology through continuous
            learning and hands-on practice.
          </p>
        </div>
      </div>
    </main>
  )
}
