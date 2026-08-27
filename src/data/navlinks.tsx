import { Home, BookOpen, Gamepad2, Server, Heart, User } from "lucide-react"

export interface NavLink {
  href: string
  label: string
  shortLabel?: string
  icon: React.ReactNode
}

const baseLinks = [
  {
    href: "/",
    icon: <Home className="w-4 h-4" />,
  },
  {
    href: "/currentStudies",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    href: "/favorites",
    icon: <Gamepad2 className="w-4 h-4" />,
  },
  {
    href: "/private-servers",
    icon: <Server className="w-4 h-4" />,
  },
  {
    href: "/my-faith",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    href: "/about-me",
    icon: <User className="w-4 h-4" />,
  },
]

export const navLinks: Record<"en" | "es", NavLink[]> = {
  en: [
    { ...baseLinks[0], label: "Home", shortLabel: "Home" },
    { ...baseLinks[1], label: "My current topics of study", shortLabel: "Studies" },
    { ...baseLinks[2], label: "My favorite games", shortLabel: "Games" },
    { ...baseLinks[3], label: "My private servers", shortLabel: "Servers" },
    { ...baseLinks[4], label: "My faith", shortLabel: "Faith" },
    { ...baseLinks[5], label: "My History", shortLabel: "History" },
  ],
  es: [
    { ...baseLinks[0], label: "Inicio", shortLabel: "Inicio" },
    { ...baseLinks[1], label: "Mis temas de estudio actuales", shortLabel: "Estudios" },
    { ...baseLinks[2], label: "Mis juegos favoritos", shortLabel: "Juegos" },
    { ...baseLinks[3], label: "Mis servidores privados", shortLabel: "Servidores" },
    { ...baseLinks[4], label: "Mi fe", shortLabel: "Fe" },
    { ...baseLinks[5], label: "Mi Historia", shortLabel: "Historia" },
  ],
}
