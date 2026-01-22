import { Home, BookOpen, Gamepad2, Server, Heart, User } from "lucide-react"

export interface NavLink {
  href: string
  label: string
  shortLabel?: string
  icon: React.ReactNode
}

export const navLinks: NavLink[] = [
  {
    href: "/",
    label: "Home",
    shortLabel: "Home",
    icon: <Home className="w-4 h-4" />,
  },
  {
    href: "/currentStudies",
    label: "My current topics of study",
    shortLabel: "Studies",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    href: "/favorites",
    label: "My favorite games",
    shortLabel: "Games",
    icon: <Gamepad2 className="w-4 h-4" />,
  },
  {
    href: "/private-servers",
    label: "My private servers",
    shortLabel: "Servers",
    icon: <Server className="w-4 h-4" />,
  },
  {
    href: "/my-faith",
    label: "My faith",
    shortLabel: "Faith",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    href: "/about-me",
    label: "My History",
    shortLabel: "History",
    icon: <User className="w-4 h-4" />,
  },
]