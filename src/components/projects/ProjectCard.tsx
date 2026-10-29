"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { ProjectProps } from "@/data/proyectData"
import { ProjectStatusBadge } from "./ProjectStatusBadge"
import { trackEvent } from "@/lib/analytics"

interface ProjectCardProps {
  project: ProjectProps
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("projectPages")
  const locale = useLocale()
  const primaryProof = project.proofPoints[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
      className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 transition-colors hover:border-cyan-500/25 hover:bg-zinc-900/70 sm:p-7"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <ProjectStatusBadge project={project} />
        <span className="font-mono text-xs text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h3 className="mb-3 text-2xl font-semibold leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
        {project.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-7 text-zinc-400 sm:text-base">
        {project.shortDescription || project.description}
      </p>

      {primaryProof && (
        <div className="mb-6 rounded-xl border border-white/[0.06] bg-black/20 p-4">
          <div className="mb-1 text-xl font-semibold text-cyan-300">{primaryProof.value}</div>
          <div className="text-xs leading-5 text-zinc-500">{primaryProof.label}</div>
        </div>
      )}

      <div className="mb-7 flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((technology) => (
          <span key={technology} className="rounded-md border border-white/[0.06] bg-[#111111] px-2.5 py-1 font-mono text-[11px] text-zinc-500">
            {technology}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        onClick={() =>
          trackEvent('select_project', {
            project_slug: project.slug,
            location: 'projects_index',
            locale,
          })
        }
        className="mt-auto inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-zinc-200 transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-200"
      >
        {t("viewCaseStudy")}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  )
}
