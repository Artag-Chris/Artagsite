
import { Code, Palette, FileText, Globe, Monitor, Cpu, HardDrive,Server } from "lucide-react"

export interface WebsiteCard {
  id: number
  title: string
  description: string
  url: string
  category: string
  icon: React.ReactNode
  imageUrl: string
  tags: string[]
}

export interface ServerCard {
  id: number
  title: string
  description: string
  status: "planning" | "development" | "live" | "maintenance"
  category: string
  icon: React.ReactNode
  imageUrl: string
  specs: string[]
  technologies: string[]
  url?: string  // URL to access the server if live
  features?: string[]  // Key features of the server
}

export const websiteCards: WebsiteCard[] = [
  {
    id: 1,
    title: "GitHub",
    description: "Platform for version control and collaboration. Essential for any developer's workflow.",
    url: "https://github.com",
    category: "Development",
    icon: <Code className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090002/OIP_odkh0l.jpg",
    tags: ["Git", "Collaboration", "Open Source"],
  },
  {
    id: 2,
    title: "Figma",
    description: "Collaborative interface design tool. Perfect for creating mockups and prototypes.",
    url: "https://figma.com",
    category: "Design",
    icon: <Palette className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090119/Figma_l25qgm.png",
    tags: ["UI/UX", "Prototyping", "Collaboration"],
  },
  {
    id: 3,
    title: "Notion",
    description: "All-in-one workspace for notes, docs, and project management.",
    url: "https://notion.so",
    category: "Productivity",
    icon: <FileText className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090201/OIP_1_yc4ajg.jpg",
    tags: ["Notes", "Documentation", "Organization"],
  },
  {
    id: 4,
    title: "Vercel",
    description: "Platform for frontend frameworks and static sites, built to integrate with your headless content.",
    url: "https://vercel.com",
    category: "Deployment",
    icon: <Globe className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090273/638e4404afaf638665c741c9_Vercel_er9uqo.png",
    tags: ["Hosting", "CI/CD", "Performance"],
  },
]

export const serverCards: ServerCard[] = [
  {
    id: 1,
    title: "Personal Portfolio API",
    description: "RESTful API serving portfolio data, blog posts, and contact form submissions.",
    status: "live",
    category: "Web Server",
    icon: <Server className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090385/OIP_2_lbxmmg.jpg",
    specs: ["2 CPU Cores", "4GB RAM", "50GB SSD"],
    technologies: ["Node.js", "Express", "MongoDB", "Docker"],
  },
  {
    id: 2,
    title: "Media Streaming Server",
    description: "Self-hosted media server for streaming movies, TV shows, and music.",
    status: "development",
    category: "Media Server",
    icon: <Monitor className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090482/Screenshot_2025-06-04_212745_tuppwf.png",
    specs: ["4 CPU Cores", "8GB RAM", "2TB HDD"],
    technologies: ["Plex", "Jellyfin", "Nginx", "Linux"],
  },
  {
    id: 3,
    title: "Game Server Hub",
    description: "Dedicated gaming server hosting multiple game instances for friends and community.",
    status: "planning",
    category: "Game Server",
    icon: <Cpu className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090623/que-es-retroarch_frrclh.jpg",
    specs: ["8 CPU Cores", "16GB RAM", "500GB NVMe"],
    technologies: ["Docker", "Pterodactyl", "Redis", "MySQL"],
  },
  {
    id: 4,
    title: "Cloud Storage Server",
    description: "Private cloud storage solution with file synchronization and sharing capabilities.",
    status: "planning",
    category: "Storage Server",
    icon: <HardDrive className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1749090748/almacenamiento-nube_kthcrq.jpg",
    specs: ["2 CPU Cores", "8GB RAM", "4TB RAID"],
    technologies: ["Nextcloud", "PostgreSQL", "Redis", "Nginx"],
  }, 
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "live":
      return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
    case "development":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    case "planning":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    case "maintenance":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30"
    default:
      return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30"
  }
}
