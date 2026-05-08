import {
  Award,
  Brain,
  Calendar,
  Clock,
  Code,
  Container,
  Cpu,
  Database,
  Globe,
  Layers,
  Network,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
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
  const Icon = ICON_MAP[study.iconName]
  const delay = `${Math.min(index, 8) * 60}ms`

  return (
    <div
      style={{ animationDelay: delay }}
      className="study-card group relative flex flex-col items-center p-6 bg-zinc-800/30 rounded-3xl border border-zinc-700/50 transition-[border-color,transform,box-shadow] duration-300 cursor-pointer hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 motion-safe:hover:scale-[1.02] hover:z-50 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:fill-mode-both"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${PRIORITY_COLOR[study.priority]}`} />
      </div>

      <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-blue-400 flex items-center justify-center text-blue-400">
        <StatusIcon status={study.status} />
      </div>

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
            {study.confidence.charAt(0).toUpperCase() + study.confidence.slice(1)}
          </span>
        </div>

        <div className="text-xs text-zinc-500">{study.duration}</div>
      </div>

      <div className="absolute inset-x-0 top-full mt-4 p-4 bg-zinc-800/95 rounded-xl border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[60] shadow-2xl shadow-black/50 pointer-events-none group-hover:pointer-events-auto">
        <p className="text-sm text-zinc-300 mb-3">{study.description}</p>

        <div className="space-y-2">
          <div className="text-xs text-zinc-500">Skills:</div>
          <div className="flex flex-wrap gap-1">
            {study.skills.map((skill) => (
              <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {study.startDate}
          </span>
          <span className="capitalize">{study.status}</span>
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-700">
          <a
            href={study.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
          >
            <Globe className="h-3 w-3" />
            Official Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
