import { Mail } from "lucide-react"
import { Github, Linkedin, Instagram, Youtube } from "@styled-icons/simple-icons"

// Only real, verified profiles.
export const socialLinksFooter = [
  { name: "GitHub", icon: Github, url: "https://github.com/Artag-Chris" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/artag/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/artagdev/" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@Artag888" },
  { name: "Email", icon: Mail, url: "mailto:info@artagdev.com.co" },
]

export interface FooterServiceLink {
  key: string
  enHref: string
  esHref: string
}

// Direct links to dedicated bilingual pillar pages & Engineering Notes (zero #contact anchors)
export const footerServices: readonly FooterServiceLink[] = [
  {
    key: "aiEngineering",
    enHref: "/services/ai-engineering",
    esHref: "/es/servicios/ingenieria-ia-agentes",
  },
  {
    key: "localPereira",
    enHref: "/software-development-colombia",
    esHref: "/es/desarrollo-de-software-pereira",
  },
  {
    key: "microservices",
    enHref: "/services/microservices-architecture",
    esHref: "/es/servicios/arquitectura-microservicios",
  },
  {
    key: "cybersecurity",
    enHref: "/services/application-cybersecurity",
    esHref: "/es/servicios/ciberseguridad-aplicaciones",
  },
  {
    key: "softwareDevelopment",
    enHref: "/services/software-development",
    esHref: "/es/servicios/desarrollo-de-software",
  },
  {
    key: "engineeringNotes",
    enHref: "/engineering-notes",
    esHref: "/es/notas-ingenieria",
  },
] as const
