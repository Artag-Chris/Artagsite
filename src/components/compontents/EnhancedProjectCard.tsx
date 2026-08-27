"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ExternalLink, Github, Play, Lock, Calendar, Award } from "lucide-react"
import type { ProjectProps } from "@/data/proyectData"

interface EnhancedProjectCardProps {
  project: ProjectProps
  index: number
}

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ project, index }) => {
  const t = useTranslations("projects.card")
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    personal: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    client: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
    featured: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  }

  const categoryLabels = {
    personal: t("personal"),
    client: t("client"),
    featured: t("featured"),
  }

  const statusColors = {
    live: "text-green-400 bg-green-500/10",
    "in-progress": "text-yellow-400 bg-yellow-500/10",
    archived: "text-gray-400 bg-gray-500/10",
  }

  const statusLabels = {
    live: t("live"),
    "in-progress": t("inProgress"),
    archived: t("archived"),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <div className="group relative h-full overflow-hidden rounded-xl">
        {/* Main card */}
        <div className="relative h-full bg-zinc-900/60 backdrop-blur-sm border border-white/5 rounded-xl p-6 sm:p-8 transition-all duration-200 flex flex-col hover:border-white/10">
          <div className="relative z-10 flex flex-col h-full">
            {/* Header with Category and Status */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <motion.div
                  className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {categoryLabels[project.category]}
                  </span>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight max-w-xs">
                  {project.title}
                </h3>
              </div>

              <motion.div
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}
                whileHover={{ scale: 1.05 }}
              >
                {statusLabels[project.status]}
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base mb-4 flex-grow leading-relaxed">
              {project.shortDescription || project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="px-2.5 py-1 rounded-lg bg-[#111111] border border-white/5 text-xs text-zinc-400 hover:border-white/10 hover:text-zinc-300 transition-colors"
                  >
                    {tech}
                  </motion.div>
                ))}
                {project.tech.length > 4 && (
                  <div className="px-2.5 py-1 rounded-lg bg-[#111111] border border-white/5 text-xs text-zinc-500">
                    {t("more", { count: project.tech.length - 4 })}
                  </div>
                )}
              </div>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {project.role && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Award className="h-3.5 w-3.5 text-cyan-500/60" />
                  <span>{project.role}</span>
                </div>
              )}
              {project.startDate && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5 text-cyan-500/60" />
                  <span>{project.startDate}</span>
                </div>
              )}
            </div>



            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              {project.youtubeEmbedId && (
                <motion.a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-sm font-medium"
                >
                  <Play className="h-4 w-4" />
                  {t("demo")}
                </motion.a>
              )}

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("liveBtn")}
                </motion.a>
              )}

              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#111111] border border-white/5 hover:border-white/10 text-zinc-500 hover:text-zinc-300 transition-all text-sm font-medium"
                >
                  <Github className="h-4 w-4" />
                  {t("code")}
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EnhancedProjectCard
