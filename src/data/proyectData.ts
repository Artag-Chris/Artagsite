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
    thumbnail: "/firstScreen.png",
    gallery: [
      "/firstScreen.png",
      "/secondScreen.png",
      "/thirdScreen.png",
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
    id: "whatsapp-automation-dual-deployment",
    title: "Intelligent WhatsApp Management System for Colombian Coffee Region Companies",
    description: "Complete WhatsApp automation architecture solving message loss, Meta blocks, and critical response times for mid-sized companies. Implementation with Node.js, custom WebSockets, and Redis as state manager.",
    shortDescription: "WhatsApp platform with Node.js + React + Redis",
    category: "client",
    status: "live",
    companyName: "Mid-sized companies in Colombia's coffee region (retail and services sectors)",
    youtubeUrl: "https://www.youtube.com/watch?v=-ofLY0GiPCQ",
    youtubeEmbedId: "-ofLY0GiPCQ",
    tech: [
      "Node.js",
      "TypeScript",
      "React",
      "Vite",
      "MySQL",
      "WebSockets",
      "Redis",
      "WhatsApp Business API",
      "Docker",
      "PM2"
    ],
    gallery: [
      "/whatsapp flujo.png",
      "/visual.png",
    ],
    techTags: {
      "Backend": ["Node.js", "TypeScript", "Express", "Custom WebSockets"],
      "Frontend": ["React", "Vite", "Tailwind", "Socket.io-client"],
      "Database": ["MySQL", "Redis (assignment state and cache)"],
      "Integrations": ["WhatsApp Business API", "Meta Cloud API"],
      "Infrastructure": ["Private server", "Docker", "PM2", "Nginx"],
      "Real-time": ["Custom WebSockets", "Redis Pub/Sub"],
    },
    features: [
      "Bridge between Meta Webhook and agents via WebSockets",
      "Real-time message receiving and sending",
      "Redis as central 'who has whom assigned' manager",
      "Automatic chat balancing across 5+ concurrent agents",
      "Complete conversation persistence in MySQL",
      "Anti-block system with intelligent rate limit handling",
      "Recent message caching in Redis for quick responses",
      "Real-time agent dashboard with React + Vite",
      "Double-assignment prevention with atomic Redis locks",
    ],
    repositoryVisibility: "private",
    role: "Solution Architect and Lead Developer (sole developer)",
    achievements: [
      "Designed and implemented complete architecture from scratch as sole developer",
      "Eliminated 100% of message loss (previously entire conversations were lost)",
      "Reduced response times from '24+ hours' to minutes",
      "Support for 1000+ daily messages with 5 concurrent agents",
      "Solved critical desynchronization issues using Redis as source of truth",
      "Zero Meta blocks post-implementation thanks to intelligent rate limiting",
    ],
    startDate: "2024-01",
    endDate: "2024-06",
    caseStudy: {
      problem: "Two mid-sized companies in Colombia's coffee region faced a customer service crisis on WhatsApp: they lost complete conversations because they couldn't keep up, response times exceeded 24 hours (causing Meta to close conversations), and account blocks were frequent due to poor rate limit handling. With 5 agents per company, they had no way to track who was handling which chat, causing duplicate responses or customers ignored for days.",
      solution: "I designed a monolithic architecture with Node.js + TypeScript that acted as a bridge between Meta's webhooks and agents. I implemented custom WebSockets for bidirectional real-time communication: when a message arrived, the server persisted it to MySQL, updated state in Redis, and emitted it to the correct dashboard. Redis became the 'source of truth' for assignments: each agent had a Redis set with active chats, and atomic operations prevented two agents from taking the same chat. For rate limits, I implemented queues with exponential backoff that respected Meta's limits without losing messages.",
      results: [
        "Message loss: 100% eliminated (from lost conversations to complete persistence)",
        "Response time: From '>24 hours' to 5-15 minutes (95%+ improvement)",
        "Volume: System processes 1000+ daily messages without degradation",
        "Concurrency: 5 simultaneous agents per company working conflict-free",
        "Meta blocks: 0 incidents post-implementation (vs multiple before)",
        "Customer satisfaction: Direct reports of happier customers due to fast responses",
      ],
      keyLearnings: [
        "Redis isn't just for caching: as a real-time state manager it solved assignment desynchronization",
        "Custom WebSockets give total control over 'who gets what' logic vs generic libraries",
        "Redis atomic operations (SETNX, LPUSH, etc) are perfect for preventing race conditions",
        "A well-organized monolithic architecture scales perfectly for medium volumes",
        "The biggest risk isn't technical but agent experience design: they need complete context",
      ],
      challenges: [
        "Critical desynchronization: Initially, multiple agents would see the same chat as 'available' and take it simultaneously, causing duplicate responses and confused customers. The solution was implementing Redis as the single source of truth: each chat when taken was marked with an atomic operation (SETNX) that only allowed one success. Then broadcasting via WebSockets to update all dashboards instantly.",
        "Meta rate limits: Webhooks returned 429 errors when sending too many messages. I implemented priority queues: agent messages (replies) had higher priority than automatic messages, all with exponential backoff and persistent retries.",
        "Traffic spikes: During peak hours, the server received message bursts. Redis caching for frequent queries (e.g., recent chat messages) reduced MySQL load. Also implemented connection pooling and optimized queries.",
        "Persistence vs speed: Saving every message to MySQL before responding could block the flow. Solution: write to Redis first as a 'buffer' then persist asynchronously to MySQL with a worker.",
        "Limited private server resources: Query optimization, MySQL indexes, and PM2 for backend clustering.",
      ],
    },

  },
  // {
  //   id: "fullstack-ecommerce",
  //   title: "E-commerce Platform",
  //   description:
  //     "A full-featured e-commerce platform with comprehensive product management, advanced cart functionality, secure payment processing, and an intuitive admin dashboard for store operations.",
  //   shortDescription: "Complete e-commerce solution",
  //   category: "personal",
  //   status: "live",
  //   youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   youtubeEmbedId: "dQw4w9WgXcQ",
  //   tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1572883454114-1601a06fdf4d?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1563062928-c3a4e62f3f6f?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
  //   ],
  //   techTags: {
  //     "Frontend": ["React", "Redux", "React Router"],
  //     "Backend": ["Node.js", "Express", "Stripe API"],
  //     "Database": ["MongoDB", "Redis"],
  //   },
  //   features: [
  //     "User authentication",
  //     "Advanced product search",
  //     "Shopping cart with persistence",
  //     "Secure payment processing",
  //     "Order tracking system",
  //     "Admin dashboard",
  //     "Inventory management",
  //     "Customer analytics",
  //   ],
  //   liveUrl: "https://ecommerce-example.com",
  //   githubUrl: "https://github.com/yourusername/ecommerce",
  //   githubRepo: "yourusername/ecommerce",
  //   repositoryVisibility: "public",
  //   role: "Full Stack Developer",
  //   achievements: [
  //     "Processed 1000+ orders",
  //     "99.9% uptime",
  //     "Optimized checkout flow",
  //     "Integrated multiple payment methods",
  //   ],
  //   startDate: "2023-03",
  //   endDate: "2023-09",
  //   caseStudy: {
  //     problem: "Businesses needed an affordable, scalable e-commerce solution with advanced features but without the complexity of major platforms.",
  //     solution: "Developed a full-stack platform with modern tech stack featuring real-time inventory management, secure Stripe payment integration, and comprehensive admin analytics.",
  //     results: [
  //       "Successfully launched 50+ online stores",
  //       "Average $50K+ monthly revenue per store",
  //       "98% payment success rate",
  //       "Mobile conversion rate: 35%",
  //     ],
  //     keyLearnings: [
  //       "Payment processing best practices",
  //       "Building scalable inventory systems",
  //       "E-commerce UX optimization",
  //       "Real-time analytics implementation",
  //     ],
  //     challenges: [
  //       "Managing concurrent checkouts",
  //       "Preventing fraudulent transactions",
  //       "Optimizing large product catalogs",
  //     ],
  //   },
  // },
  // {
  //   id: "task-management",
  //   title: "Collaborative Task Manager",
  //   description: "A modern productivity application for managing tasks and projects with real-time collaboration features, enabling teams to work efficiently together with shared workspaces.",
  //   shortDescription: "Team productivity platform",
  //   category: "personal",
  //   status: "live",
  //   youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   youtubeEmbedId: "dQw4w9WgXcQ",
  //   tech: ["TypeScript", "React", "Firebase", "TailwindCSS", "Socket.io"],
  //   features: [
  //     "Task creation & management",
  //     "Project organization",
  //     "Due date reminders",
  //     "Real-time collaboration",
  //     "Progress tracking",
  //     "File attachments",
  //     "Activity timeline",
  //     "Team permissions",
  //   ],
  //   liveUrl: "https://tasks-example.com",
  //   githubUrl: "https://github.com/yourusername/task-manager",
  //   repositoryVisibility: "public",
  //   role: "Full Stack Developer",
  //   achievements: [
  //     "Real-time sync across devices",
  //     "Supports 100+ concurrent users",
  //     "Optimized database queries",
  //     "Mobile app available",
  //   ],
  //   startDate: "2022-12",
  //   endDate: "2023-05",
  // },
  // {
  //   id: "weather-dashboard",
  //   title: "Weather Intelligence Dashboard",
  //   description:
  //     "A sophisticated real-time weather dashboard providing current conditions, detailed forecasts, and weather maps for locations worldwide with advanced data visualization.",
  //   shortDescription: "Real-time weather analytics",
  //   category: "personal",
  //   status: "live",
  //   youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   youtubeEmbedId: "dQw4w9WgXcQ",
  //   tech: ["JavaScript", "React", "OpenWeather API", "ChartJS", "Mapbox"],
  //   features: [
  //     "Location search & geolocation",
  //     "Current weather conditions",
  //     "5-day forecast",
  //     "Weather maps & radar",
  //     "Historical data analysis",
  //     "Weather alerts",
  //     "Multiple locations tracking",
  //     "Climate trends",
  //   ],
  //   liveUrl: "https://weather-example.com",
  //   githubUrl: "https://github.com/yourusername/weather-app",
  //   repositoryVisibility: "public",
  //   role: "Frontend Developer",
  //   achievements: [
  //     "10M+ weather data points",
  //     "Fast API response times",
  //     "Beautiful data visualization",
  //     "Cross-platform compatible",
  //   ],
  //   startDate: "2022-08",
  //   endDate: "2022-11",
  // },
  // {
  //   id: "social-network",
  //   title: "Social Network Platform",
  //   description: "A modern social networking platform featuring user profiles, dynamic news feeds, real-time messaging, and community engagement tools for meaningful connections.",
  //   shortDescription: "Community platform",
  //   category: "personal",
  //   status: "archived",
  //   youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   youtubeEmbedId: "dQw4w9WgXcQ",
  //   tech: ["Next.js", "GraphQL", "PostgreSQL", "Socket.io", "Redis"],
  //   features: [
  //     "User profiles & customization",
  //     "Dynamic news feed",
  //     "Real-time chat",
  //     "Post creation & sharing",
  //     "Friend connections",
  //     "Notifications system",
  //     "Follow/unfollow",
  //     "Media uploads",
  //   ],
  //   liveUrl: "https://social-example.com",
  //   githubUrl: "https://github.com/yourusername/social-network",
  //   repositoryVisibility: "public",
  //   role: "Full Stack Developer",
  //   achievements: [
  //     "Scaled to 50K+ users",
  //     "Real-time communication",
  //     "Optimized database performance",
  //     "Rich media support",
  //   ],
  //   startDate: "2022-01",
  //   endDate: "2022-07",
  // },
  // {
  //   id: "fitness-tracker",
  //   title: "Fitness Tracker & Analytics",
  //   description:
  //     "A comprehensive fitness application for tracking workouts, monitoring nutrition, and visualizing progress with personalized fitness plans and detailed analytics.",
  //   shortDescription: "Health & fitness platform",
  //   category: "personal",
  //   status: "in-progress",
  //   youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   youtubeEmbedId: "dQw4w9WgXcQ",
  //   tech: ["React Native", "Redux", "Firebase", "D3.js", "TailwindCSS"],
  //   features: [
  //     "Workout logging",
  //     "Nutrition tracking",
  //     "Progress charts & graphs",
  //     "Goal setting",
  //     "Exercise library",
  //     "Personalized plans",
  //     "Wearable integration",
  //     "Community challenges",
  //   ],
  //   liveUrl: "https://fitness-example.com",
  //   githubUrl: "https://github.com/yourusername/fitness-tracker",
  //   repositoryVisibility: "public",
  //   role: "Mobile Developer",
  //   achievements: [
  //     "Cross-platform app",
  //     "Real-time sync",
  //     "Wearable device integration",
  //     "Advanced analytics",
  //   ],
  //   startDate: "2023-10",
  //   endDate: null,
  // },
]
