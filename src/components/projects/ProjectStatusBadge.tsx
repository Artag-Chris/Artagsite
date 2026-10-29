import { useTranslations } from "next-intl"
import type { ProjectProps } from "@/data/proyectData"

const statusStyles: Record<ProjectProps["status"], string> = {
  "in-use": "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  deployed: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  validated: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
  "in-progress": "border-amber-500/20 bg-amber-500/10 text-amber-300",
  live: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  archived: "border-white/10 bg-white/5 text-zinc-400",
}

export function ProjectStatusBadge({ project }: { project: ProjectProps }) {
  const t = useTranslations("projectPages")
  const isOffline = project.availability === "offline"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${isOffline ? "border-amber-500/20 bg-amber-500/10 text-amber-300" : statusStyles[project.status]}`}>
        {isOffline ? t("availability.offline") : t(`status.${project.status}`)}
      </span>
      {isOffline && (
        <span className="text-xs text-zinc-500">{t(`status.${project.status}`)}</span>
      )}
    </div>
  )
}
