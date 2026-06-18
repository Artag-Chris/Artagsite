import { ProjectProps } from "@/data/proyectData";
import { Github } from '@styled-icons/simple-icons'
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function ProjectCard({ project, onHover, isHovered }: ProjectProps) {
    return (
      <Card
        className={`bg-zinc-900 border-zinc-800 overflow-hidden transition-all duration-300 h-full ${
          isHovered ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : "hover:border-emerald-500/50"
        }`}
        onMouseEnter={() => onHover!!(false)}
      >
        <div className="relative h-48 w-full overflow-hidden group">
          <Image
            src={project!.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "group-hover:scale-105"
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60 transition-opacity duration-300 ${
              isHovered ? "opacity-80" : ""
            }`}
          />
        </div>
        <CardContent className="p-6 relative">
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
              className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 text-sm"
            >
              View Project <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 text-sm"
            >
              Source Code <Github className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }
  