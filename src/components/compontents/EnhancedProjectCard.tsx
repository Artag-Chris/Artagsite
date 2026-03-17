"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Play, Lock, Calendar, Award } from "lucide-react"
import type { ProjectProps } from "@/data/proyectData"

interface EnhancedProjectCardProps {
  project: ProjectProps
  index: number
}

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    personal: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    client: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
    featured: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  }

  const categoryLabels = {
    personal: "Personal Project",
    client: "Client Project",
    featured: "Featured",
  }

  const statusColors = {
    live: "text-green-400 bg-green-500/10",
    "in-progress": "text-yellow-400 bg-yellow-500/10",
    archived: "text-gray-400 bg-gray-500/10",
  }

  const statusLabels = {
    live: "Live",
    "in-progress": "In Progress",
    archived: "Archived",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <div className="group relative h-full overflow-hidden rounded-2xl">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Main card */}
        <div className={`relative h-full bg-gradient-to-br ${categoryColors[project.category]} backdrop-blur-xl border rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col`}>
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] rounded-2xl pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header with Category and Status */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <motion.div
                  className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
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
                    className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#262626] text-xs text-gray-300 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                  >
                    {tech}
                  </motion.div>
                ))}
                {project.tech.length > 4 && (
                  <div className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#262626] text-xs text-gray-400">
                    +{project.tech.length - 4} more
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

            {/* Client info for client projects */}
            {project.category === "client" && project.companyName && (
              <motion.div
                className="mb-6 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-xs text-indigo-300">
                  <span className="font-semibold">Client:</span> {project.companyName}
                </p>
                {project.repositoryVisibility === "private" && (
                  <p className="text-xs text-indigo-300 flex items-center gap-1 mt-1">
                    <Lock className="h-3 w-3" />
                    Private Repository
                  </p>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              {project.youtubeEmbedId && (
                <motion.a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/60 hover:from-cyan-500/30 hover:to-cyan-500/20 text-cyan-300 hover:text-cyan-100 transition-all text-sm font-medium"
                >
                  <Play className="h-4 w-4" />
                  Demo
                </motion.a>
              )}

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500/20 to-indigo-500/10 border border-indigo-500/30 hover:border-indigo-500/60 hover:from-indigo-500/30 hover:to-indigo-500/20 text-indigo-300 hover:text-indigo-100 transition-all text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live
                </motion.a>
              )}

              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#141414] border border-[#262626] hover:border-gray-400 text-gray-400 hover:text-white transition-all text-sm font-medium"
                >
                  <Github className="h-4 w-4" />
                  Code
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
