
import { Code, Palette, FileText, Globe, Monitor, Cpu, HardDrive, Server, FileUp, Music, Zap } from "lucide-react"

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
    title: "File Browser",
    description: "Self-hosted file management server for uploading, downloading, and organizing files securely.",
    status: "live",
    category: "Storage",
    icon: <FileUp className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1769098760/Screenshot_2026-01-22_111855_cwrrl6.png",
    specs: ["2 CPU Cores", "4GB RAM", "100GB Storage"],
    technologies: ["File Browser", "Nginx", "Linux"],
    url: "https://file_browser.artagdev.com.co/",
    features: ["Secure file uploads", "Directory browsing", "File management", "Download support"],
  },
  {
    id: 2,
    title: "Navidrome",
    description: "Personal music streaming server for your collection with a beautiful web interface.",
    status: "live",
    category: "Media Server",
    icon: <Music className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1769098873/Screenshot_2026-01-22_112102_pqwkhe.png",
    specs: ["2 CPU Cores", "4GB RAM", "500GB Storage"],
    technologies: ["Navidrome", "Nginx", "PostgreSQL"],
    url: "https://navidrome.artagdev.com.co/",
    features: ["Music streaming", "Playlist management", "Web player", "Cross-platform"],
  },
  {
    id: 3,
    title: "N8N Automation",
    description: "Workflow automation platform for connecting apps, automating tasks, and orchestrating integrations.",
    status: "live",
    category: "Automation",
    icon: <Zap className="h-6 w-6" />,
    imageUrl: "https://res.cloudinary.com/dfg2xrsqz/image/upload/v1769099065/Screenshot_2026-01-22_112412_xq9skh.png",
    specs: ["2 CPU Cores", "8GB RAM", "50GB Storage"],
    technologies: ["N8N", "Node.js", "PostgreSQL"],
    url: "https://n8n.artagdev.com.co/",
    features: ["Workflow automation", "Integration builder", "Scheduling", "Error handling"],
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
