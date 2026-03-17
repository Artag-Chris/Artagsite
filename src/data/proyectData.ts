export interface ProjectProps {
  id: string
  title: string
  description: string
  shortDescription?: string
  category: "personal" | "client" | "featured"
  status: "live" | "in-progress" | "archived"
  
  // Media & Gallery
  image?: string
  thumbnail?: string
  gallery?: string[] // Array of image URLs
  
  // Video
  youtubeUrl?: string
  youtubeEmbedId?: string
  
  // Technologies
  tech: string[]
  techTags?: {
    [category: string]: string[] // e.g., { "Frontend": ["React"], "Backend": ["Node.js"] }
  }
  
  // Features list
  features?: string[]
  
  // Links
  liveUrl?: string
  githubUrl?: string
  repositoryVisibility?: "public" | "private"
  githubRepo?: string // Format: "username/repo" for API integration
  
  // Client info
  companyName?: string
  role?: string
  
  // Achievements
  achievements?: string[]
  
  // Timeline
  startDate?: string
  endDate?: string | null
  
  // Case Study
  caseStudy?: {
    problem: string
    solution: string
    results: string[]
    keyLearnings?: string[]
    challenges?: string[]
  }
  
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
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop",
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=LvsgCdWss4I&ab_channel=YourAverageTechBro",
    youtubeEmbedId: "LvsgCdWss4I",
    tech: ["Next.js", "React", "TailwindCSS", "Framer Motion", "TypeScript"],
    techTags: {
      "Frontend": ["Next.js", "React", "TailwindCSS", "Framer Motion"],
      "Language": ["TypeScript"],
    },
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
    githubRepo: "Artag-Chris/Artagsite",
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
    caseStudy: {
      problem: "Needed a professional portfolio that stands out and showcases technical expertise with smooth interactions and modern design.",
      solution: "Built a custom Next.js site with Techonic Precision design system featuring animated components, full-width sections, and advanced Framer Motion animations.",
      results: [
        "Created a memorable portfolio experience",
        "Implemented 15+ animated components",
        "Achieved 95+ Lighthouse score",
        "Mobile-optimized for all devices",
      ],
      keyLearnings: [
        "Creating reusable component systems",
        "Advanced animation choreography with Framer Motion",
        "Performance optimization techniques",
        "Responsive design patterns",
      ],
      challenges: [
        "Balancing animations with performance",
        "Creating a unique design system",
        "Optimizing video background playback",
      ],
    },
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
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518932458119-e5bf12a0ae0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    ],
    techTags: {
      "Backend": ["Node.js", "Express", "TypeScript"],
      "Database": ["PostgreSQL", "Redis"],
      "DevOps": ["Docker", "AWS", "CI/CD"],
    },
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
    caseStudy: {
      problem: "Client was spending 40+ hours/week on manual data processing and system synchronization across multiple platforms.",
      solution: "Built a comprehensive automation suite with workflow orchestration, real-time monitoring, and intelligent error handling to streamline enterprise operations.",
      results: [
        "Reduced manual work from 40 hours to 8 hours per week",
        "Achieved 99.9% uptime SLA",
        "Automated 500+ daily workflows",
        "Saved client $200K+ annually",
      ],
      keyLearnings: [
        "Enterprise system architecture patterns",
        "Building resilient automation systems",
        "CI/CD pipeline optimization",
        "Team leadership and documentation",
      ],
      challenges: [
        "Integrating legacy systems",
        "Handling large data volumes",
        "Ensuring data consistency across services",
      ],
    },
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
    gallery: [
      "https://images.unsplash.com/photo-1572883454114-1601a06fdf4d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563062928-c3a4e62f3f6f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    ],
    techTags: {
      "Frontend": ["React", "Redux", "React Router"],
      "Backend": ["Node.js", "Express", "Stripe API"],
      "Database": ["MongoDB", "Redis"],
    },
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
    githubRepo: "yourusername/ecommerce",
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
    caseStudy: {
      problem: "Businesses needed an affordable, scalable e-commerce solution with advanced features but without the complexity of major platforms.",
      solution: "Developed a full-stack platform with modern tech stack featuring real-time inventory management, secure Stripe payment integration, and comprehensive admin analytics.",
      results: [
        "Successfully launched 50+ online stores",
        "Average $50K+ monthly revenue per store",
        "98% payment success rate",
        "Mobile conversion rate: 35%",
      ],
      keyLearnings: [
        "Payment processing best practices",
        "Building scalable inventory systems",
        "E-commerce UX optimization",
        "Real-time analytics implementation",
      ],
      challenges: [
        "Managing concurrent checkouts",
        "Preventing fraudulent transactions",
        "Optimizing large product catalogs",
      ],
    },
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
