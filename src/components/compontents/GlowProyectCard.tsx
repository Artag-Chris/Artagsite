"use client"

import type React from "react"

import { useRef, useState, type MouseEvent } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { extractYouTubeId } from "@/lib/youtubeUtils/youtube-utils"
import { Modal } from "../ui/modal"
import { YouTubeThumbnail } from "../youtubeComponents/youtube-thumbnails"
import { YouTubePlayer } from "../youtubeComponents/yputube-player"

interface ProjectProps {
  title: string
  description: string
  youtubeUrl: string
  tech: string[]
  liveUrl: string
  githubUrl: string
}

interface GlowProjectCardProps {
  project: ProjectProps
  index: number
  onHover: (isHovered: boolean) => void
  isHovered: boolean
}

const GlowProjectCard: React.FC<GlowProjectCardProps> = ({ project, onHover, isHovered, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const videoId = extractYouTubeId(project.youtubeUrl)

  // Manejo del movimiento del mouse para el brillo
  const handleMouseMove = (index: number) => (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRefs.current[index]
    if (!card) return

    // Obtener posición relativa del mouse
    const rect = card.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2

    // Calcular el ángulo
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)
    angle = (angle + 360) % 360

    // Establecer el ángulo como una variable CSS
    card.style.setProperty("--start", `${angle + 60}deg`)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        ref={(el) => {
          if (el) cardRefs.current[index] = el
        }}
        onMouseMove={handleMouseMove(index)}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className={`relative card card-border timeline-card rounded-xl mb-5 break-inside-avoid-column overflow-hidden ${
          isHovered ? "shadow-lg shadow-indigo-500/20" : ""
        }`}
      >
        {/* Efecto de brillo */}
        <div className="glow"></div>

        {/* Contenido del proyecto */}
        <div
          className={`bg-zinc-900 border-zinc-800 overflow-hidden transition-all duration-300 h-full ${
            isHovered ? "border-indigo-500" : "hover:border-indigo-500"
          }`}
        >
          {/* YouTube thumbnail con botón de reproducción */}
          {videoId && (
            <YouTubeThumbnail videoId={videoId} alt={project.title} onClick={openModal} isHovered={isHovered} />
          )}

          {/* Contenido principal dentro de la tarjeta */}
          <div className="p-6 relative">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-zinc-400 mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech: string, i: number) => (
                <Badge key={i} variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-400 flex items-center gap-1 text-sm"
              >
                View Project <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-400 flex items-center gap-1 text-sm"
              >
                Source Code <Github className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para reproducir el video */}
      {videoId && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-1">
            <YouTubePlayer videoId={videoId} title={project.title} />
          </div>
        </Modal>
      )}
    </>
  )
}

export default GlowProjectCard
