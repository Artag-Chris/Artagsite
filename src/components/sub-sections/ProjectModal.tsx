"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Award, Calendar, CheckCircle2 } from "lucide-react"
import type { ProjectProps } from "@/data/proyectData"

interface ProjectModalProps {
  project: ProjectProps | null
  isOpen: boolean
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech">("overview")

  if (!project) return null

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "tech", label: "Tech Stack" },
  ] as const

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] shadow-2xl">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-[#262626] hover:bg-[#363636] text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>

              <div className="flex flex-col">
                {/* Video Section */}
                {project.youtubeEmbedId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative w-full bg-black h-64 sm:h-96 overflow-hidden"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(project.youtubeEmbedId)}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </motion.div>
                )}

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-3">
                          <span className="text-xs font-semibold text-cyan-300 uppercase">
                            {project.category === "personal" ? "Personal" : project.category === "client" ? "Client" : "Featured"}
                          </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h2>
                        {project.role && (
                          <p className="text-gray-400 text-sm flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            {project.role}
                          </p>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "live" ? "text-green-400 bg-green-500/10" :
                        project.status === "in-progress" ? "text-yellow-400 bg-yellow-500/10" :
                        "text-gray-400 bg-gray-500/10"
                      }`}>
                        {project.status === "live" ? "Live" : project.status === "in-progress" ? "In Progress" : "Archived"}
                      </div>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>
                  </motion.div>

                  {/* Meta Info */}
                  {(project.companyName || project.startDate) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                    >
                      {project.companyName && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Client</p>
                          <p className="text-sm text-indigo-300 font-semibold">{project.companyName}</p>
                        </div>
                      )}
                      {project.startDate && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Timeline</p>
                          <p className="text-sm text-indigo-300 font-semibold flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {project.startDate} {project.endDate && `- ${project.endDate}`}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Tabs */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="flex gap-2 border-b border-[#262626] mb-6">
                      {tabs.map((tab) => (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          whileHover={{ color: "#06b6d4" }}
                          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                            activeTab === tab.id
                              ? "text-cyan-400"
                              : "text-gray-400 hover:text-gray-300"
                          }`}
                        >
                          {tab.label}
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400"
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {activeTab === "overview" && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          {project.achievements && project.achievements.length > 0 && (
                            <div>
                              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                                Key Achievements
                              </h3>
                              <ul className="space-y-2">
                                {project.achievements.map((achievement, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-sm text-gray-300 flex items-start gap-2"
                                  >
                                    <span className="text-cyan-400 mt-1">•</span>
                                    {achievement}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === "features" && (
                        <motion.div
                          key="features"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-3"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.features && project.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-200 flex items-center gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "tech" && (
                        <motion.div
                          key="tech"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-3"
                        >
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-sm text-indigo-200"
                              >
                                {tech}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#262626]"
                  >
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-cyan-100 transition-all font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Live Site
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-indigo-500/10 border border-indigo-500/30 hover:border-indigo-500/60 text-indigo-300 hover:text-indigo-100 transition-all font-medium"
                      >
                        <Github className="h-4 w-4" />
                        {project.repositoryVisibility === "private" ? "Repository (Private)" : "View Code"}
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
