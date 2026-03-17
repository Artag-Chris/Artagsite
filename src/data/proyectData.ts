export interface ProjectProps {
  id: string
  title: string
  description: string
  shortDescription?: string
  category: "personal" | "client" | "featured"
  status: "live" | "in-progress" | "archived"
  image?: string
  thumbnail?: string
  youtubeUrl?: string
  youtubeEmbedId?: string
  tech: string[]
  features?: string[]
  liveUrl?: string
  githubUrl?: string
  repositoryVisibility?: "public" | "private" // For client projects
  companyName?: string // For client projects
  role?: string // Your role in the project
  achievements?: string[]
  startDate?: string
  endDate?: string
  
  project?: any;
  onHover?: (hovered: boolean) => void;
  isHovered?: boolean;
}

export const projectsData: ProjectProps[] = [
  {
    id: "portfolio-2024",
    title: "Artag Portfolio",
    description:
      "My personal portfolio website showcasing my work, skills, and expertise. Built with modern technologies featuring smooth animations, interactive elements, and a premium design system (Techonic Precision).",
    shortDescription: "Personal portfolio with Next.js & animations",
    category: "personal",
    status: "live",
    youtubeUrl: "https://www.youtube.com/watch?v=LvsgCdWss4I&ab_channel=YourAverageTechBro",
    youtubeEmbedId: "LvsgCdWss4I",
    tech: ["Next.js", "React", "TailwindCSS", "Framer Motion", "TypeScript"],
    features: [
      "Responsive design",
      "Dark theme with Techonic Precision",
      "Animated hero section",
      "Smooth transitions",
      "Contact form",
      "Project showcase",
      "Full-width sections",
      "Performance optimized",
    ],
    liveUrl: "https://artagdev.com",
    githubUrl: "https://github.com/Artag-Chris/Artagsite",
    repositoryVisibility: "public",
    role: "Solo Developer",
    achievements: [
      "Designed custom design system",
      "Implemented advanced animations",
      "Optimized for performance",
      "Mobile-first approach",
    ],
    startDate: "2024-01",
    endDate: "2024-03",
  },
  {
    id: "automation-solution",
    title: "Enterprise Automation Suite",
    description:
      "A comprehensive automation solution for large-scale enterprise operations. This project demonstrates expertise in workflow automation, system integration, and performance optimization.",
    shortDescription: "Enterprise automation platform",
    category: "client",
    status: "live",
    companyName: "Enterprise Client",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedId: "dQw4w9WgXcQ",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    features: [
      "Workflow automation",
      "System integration",
      "Real-time monitoring",
      "Automated reporting",
      "Error handling & logging",
      "Scalable architecture",
    ],
    repositoryVisibility: "private",
    role: "Lead Developer",
    achievements: [
      "Reduced manual processes by 80%",
      "Improved system efficiency",
      "Implemented CI/CD pipeline",
      "Trained team on new systems",
    ],
    startDate: "2023-06",
    endDate: "2023-12",
  },
  {
    id: "fullstack-ecommerce",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with comprehensive product management, advanced cart functionality, secure payment processing, and an intuitive admin dashboard for store operations.",
    shortDescription: "Complete e-commerce solution",
    category: "personal",
    status: "live",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedId: "dQw4w9WgXcQ",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    features: [
      "User authentication",
      "Advanced product search",
      "Shopping cart with persistence",
      "Secure payment processing",
      "Order tracking system",
      "Admin dashboard",
      "Inventory management",
      "Customer analytics",
    ],
    liveUrl: "https://ecommerce-example.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
    repositoryVisibility: "public",
    role: "Full Stack Developer",
    achievements: [
      "Processed 1000+ orders",
      "99.9% uptime",
      "Optimized checkout flow",
      "Integrated multiple payment methods",
    ],
    startDate: "2023-03",
    endDate: "2023-09",
  },
  {
    id: "task-management",
    title: "Collaborative Task Manager",
    description: "A modern productivity application for managing tasks and projects with real-time collaboration features, enabling teams to work efficiently together with shared workspaces.",
    shortDescription: "Team productivity platform",
    category: "personal",
    status: "live",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedId: "dQw4w9WgXcQ",
    tech: ["TypeScript", "React", "Firebase", "TailwindCSS", "Socket.io"],
    features: [
      "Task creation & management",
      "Project organization",
      "Due date reminders",
      "Real-time collaboration",
      "Progress tracking",
      "File attachments",
      "Activity timeline",
      "Team permissions",
    ],
    liveUrl: "https://tasks-example.com",
    githubUrl: "https://github.com/yourusername/task-manager",
    repositoryVisibility: "public",
    role: "Full Stack Developer",
    achievements: [
      "Real-time sync across devices",
      "Supports 100+ concurrent users",
      "Optimized database queries",
      "Mobile app available",
    ],
    startDate: "2022-12",
    endDate: "2023-05",
  },
  {
    id: "weather-dashboard",
    title: "Weather Intelligence Dashboard",
    description:
      "A sophisticated real-time weather dashboard providing current conditions, detailed forecasts, and weather maps for locations worldwide with advanced data visualization.",
    shortDescription: "Real-time weather analytics",
    category: "personal",
    status: "live",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedId: "dQw4w9WgXcQ",
    tech: ["JavaScript", "React", "OpenWeather API", "ChartJS", "Mapbox"],
    features: [
      "Location search & geolocation",
      "Current weather conditions",
      "5-day forecast",
      "Weather maps & radar",
      "Historical data analysis",
      "Weather alerts",
      "Multiple locations tracking",
      "Climate trends",
    ],
    liveUrl: "https://weather-example.com",
    githubUrl: "https://github.com/yourusername/weather-app",
    repositoryVisibility: "public",
    role: "Frontend Developer",
    achievements: [
      "10M+ weather data points",
      "Fast API response times",
      "Beautiful data visualization",
      "Cross-platform compatible",
    ],
    startDate: "2022-08",
    endDate: "2022-11",
  },
  {
    id: "social-network",
    title: "Social Network Platform",
    description: "A modern social networking platform featuring user profiles, dynamic news feeds, real-time messaging, and community engagement tools for meaningful connections.",
    shortDescription: "Community platform",
    category: "personal",
    status: "archived",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedId: "dQw4w9WgXcQ",
    tech: ["Next.js", "GraphQL", "PostgreSQL", "Socket.io", "Redis"],
    features: [
      "User profiles & customization",
      "Dynamic news feed",
      "Real-time chat",
      "Post creation & sharing",
      "Friend connections",
      "Notifications system",
      "Follow/unfollow",
      "Media uploads",
    ],
    liveUrl: "https://social-example.com",
    githubUrl: "https://github.com/yourusername/social-network",
    repositoryVisibility: "public",
    role: "Full Stack Developer",
    achievements: [
      "Scaled to 50K+ users",
      "Real-time communication",
      "Optimized database performance",
      "Rich media support",
    ],
    startDate: "2022-01",
    endDate: "2022-07",
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracker & Analytics",
    description:
      "A comprehensive fitness application for tracking workouts, monitoring nutrition, and visualizing progress with personalized fitness plans and detailed analytics.",
    shortDescription: "Health & fitness platform",
    category: "personal",
    status: "in-progress",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedId: "dQw4w9WgXcQ",
    tech: ["React Native", "Redux", "Firebase", "D3.js", "TailwindCSS"],
    features: [
      "Workout logging",
      "Nutrition tracking",
      "Progress charts & graphs",
      "Goal setting",
      "Exercise library",
      "Personalized plans",
      "Wearable integration",
      "Community challenges",
    ],
    liveUrl: "https://fitness-example.com",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    repositoryVisibility: "public",
    role: "Mobile Developer",
    achievements: [
      "Cross-platform app",
      "Real-time sync",
      "Wearable device integration",
      "Advanced analytics",
    ],
    startDate: "2023-10",
    endDate: null,
  },
]
