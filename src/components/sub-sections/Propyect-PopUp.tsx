"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ProjectProps } from "@/data/proyectData"
import { extractYouTubeId } from "@/lib/youtubeUtils/youtube-utils"
import { Play, ExternalLink, Github } from "lucide-react"


interface ProjectPopupProps {
  project: ProjectProps
  isVisible: boolean
  position: { x: number; y: number }
}

export function ProjectPopup({ project, isVisible, position }: ProjectPopupProps) {
  const videoId = project.youtubeUrl ? extractYouTubeId(project.youtubeUrl) : ""

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50 w-72 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            left: `${position.x - 136}px`, // Center horizontally (272/2 = 136)
            top: `${position.y - 200}px`, // Position above the card
          }}
        >
          {/* YouTube thumbnail with play button */}
          {videoId && (
            <div className="relative h-36 w-full overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/mqdefault.jpg)` }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-12 h-12 rounded-full bg-emerald-500/90 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            </div>
          )}

          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{project.title}</h3>
            <p className="text-zinc-300 text-sm mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.tech.slice(0, 3).map((tech, i) => (
                <Badge key={i} variant="outline" className="bg-zinc-800 text-xs py-0">
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <Badge variant="outline" className="bg-zinc-800 text-xs py-0">
                  +{project.tech.length - 3}
                </Badge>
              )}
            </div>

            {/* Features section - only show if features exist */}
            {project.features && project.features.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-emerald-500 mb-2">Key Features:</h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="text-zinc-400 text-sm flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-between items-center text-xs">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  View <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  Code <Github className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
