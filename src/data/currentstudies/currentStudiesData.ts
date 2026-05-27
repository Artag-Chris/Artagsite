export type StudyIconName =
  | "layers"
  | "smartphone"
  | "container"
  | "network"
  | "trending-up"
  | "code"
  | "globe"
  | "shield"
  | "brain"
  | "zap"
  | "database"
  | "cpu"

export type StudyStatus = "active" | "completed" | "upcoming"
export type StudyConfidence = "beginner" | "intermediate" | "confident" | "expert"
export type StudyPriority = "high" | "medium" | "low"

export interface Study {
  id: number
  title: string
  category: string
  provider: string
  confidence: StudyConfidence
  duration: string
  startDate: string
  status: StudyStatus
  iconName: StudyIconName
  description: string
  skills: string[]
  priority: StudyPriority
  officialLink: string
  usedIn?: string
  proofLink?: string
  proofLabel?: string
}

export const currentStudies: Study[] = [
  {
    id: 1,
    title: "Software Architecture Patterns",
    category: "System Design",
    provider: "Self-taught · production work",
    confidence: "confident",
    duration: "Ongoing",
    startDate: "Since 2024",
    status: "active",
    iconName: "layers",
    description:
      "Microservices, event-driven architecture, gateway patterns and scalable system design — applied across 13 production TypeScript services I architected and ship.",
    skills: ["Microservices", "Event-driven", "API Gateway", "Domain-Driven Design"],
    priority: "high",
    officialLink: "https://docs.microsoft.com/en-us/azure/architecture/",
    usedIn: "13 production microservices on the artag-services org",
    proofLink: "https://github.com/orgs/artag-services/repositories",
    proofLabel: "See the org",
  },
  {
    id: 2,
    title: "React Native Development",
    category: "Mobile Development",
    provider: "Self-taught · Expo docs",
    confidence: "intermediate",
    duration: "Ongoing",
    startDate: "Since 2025",
    status: "active",
    iconName: "smartphone",
    description:
      "Cross-platform mobile development with React Native + Expo — coming from a deep React/TypeScript background, focusing on native modules and performance.",
    skills: ["React Native", "Expo", "Native Modules", "Performance Optimization"],
    priority: "high",
    officialLink: "https://reactnative.dev/",
  },
  {
    id: 3,
    title: "Docker & Containerization",
    category: "DevOps",
    provider: "Self-taught · production work",
    confidence: "confident",
    duration: "Ongoing",
    startDate: "Since 2023",
    status: "active",
    iconName: "container",
    description:
      "Containerization strategies, multi-stage builds, compose orchestration — every service in my microservices org is dockerized.",
    skills: ["Docker", "Docker Compose", "Multi-stage Builds", "Container Orchestration"],
    priority: "high",
    officialLink: "https://docs.docker.com/",
    usedIn: "Infra repo + every service in artag-services",
    proofLink: "https://github.com/artag-services/Microservices",
    proofLabel: "See infra repo",
  },
  {
    id: 4,
    title: "WebSocket & Real-time Communication",
    category: "Backend Development",
    provider: "Self-taught · production work",
    confidence: "intermediate",
    duration: "Ongoing",
    startDate: "Since 2024",
    status: "active",
    iconName: "network",
    description:
      "Real-time features with WebSockets and event broadcasting — applied in integration services that push live updates between platforms.",
    skills: ["WebSockets", "Socket.IO", "Real-time Apps", "Event Broadcasting"],
    priority: "medium",
    officialLink: "https://socket.io/",
    usedIn: "sync-service · whatsapp/slack integrations in artag-services",
    proofLink: "https://github.com/artag-services/sync-service",
    proofLabel: "See sync-service",
  },
  {
    id: 5,
    title: "System Scalability & Performance",
    category: "System Design",
    provider: "Self-taught · AWS docs",
    confidence: "intermediate",
    duration: "Ongoing",
    startDate: "Since 2024",
    status: "active",
    iconName: "trending-up",
    description:
      "Horizontal scaling, gateway pattern, caching strategies — applied via API gateway routing across my microservices fleet.",
    skills: ["Load Balancing", "API Gateway", "Caching", "CDN"],
    priority: "high",
    officialLink: "https://aws.amazon.com/architecture/",
    usedIn: "gateway-service routing 12+ downstream microservices",
    proofLink: "https://github.com/artag-services/gateway-service",
    proofLabel: "See gateway-service",
  },
  {
    id: 6,
    title: "Advanced TypeScript",
    category: "Programming Languages",
    provider: "Self-taught · daily driver",
    confidence: "confident",
    duration: "4+ years",
    startDate: "Since 2021",
    status: "active",
    iconName: "code",
    description:
      "Advanced TypeScript patterns, generics, conditional types and type-safe APIs — primary language since I learned to code at Misión TIC 2022.",
    skills: ["Advanced Types", "Generics", "Type Guards", "Utility Types"],
    priority: "high",
    officialLink: "https://www.typescriptlang.org/",
    usedIn: "Every project I ship — microservices, this site, integrations",
    proofLink: "https://github.com/orgs/artag-services/repositories",
    proofLabel: "100% TS across the org",
  },
  {
    id: 7,
    title: "GraphQL & Apollo",
    category: "API Development",
    provider: "Self-taught · Apollo docs",
    confidence: "beginner",
    duration: "Exploring",
    startDate: "Since 2025",
    status: "active",
    iconName: "globe",
    description:
      "Building efficient APIs with GraphQL and subscriptions — currently exploring as an alternative to my REST-based gateway pattern.",
    skills: ["GraphQL", "Apollo Server", "Subscriptions", "Query Optimization"],
    priority: "low",
    officialLink: "https://graphql.org/",
  },
  {
    id: 8,
    title: "Web Application Security",
    category: "Security",
    provider: "OWASP · production work",
    confidence: "intermediate",
    duration: "Ongoing",
    startDate: "Since 2024",
    status: "active",
    iconName: "shield",
    description:
      "OWASP Top 10, JWT/OAuth flows and CSP hardening — applied in my identity service and in the CSP/middleware of this very site.",
    skills: ["OWASP Top 10", "JWT", "OAuth", "CSP & Security Headers"],
    priority: "medium",
    officialLink: "https://owasp.org/",
    usedIn: "identity-service · CSP and rate-limit on this site",
    proofLink: "https://github.com/artag-services/identity-service",
    proofLabel: "See identity-service",
  },
  {
    id: 9,
    title: "AI Agents & LLM Integration",
    category: "Artificial Intelligence",
    provider: "Self-taught · n8n + LLM APIs",
    confidence: "intermediate",
    duration: "Ongoing",
    startDate: "Since 2025",
    status: "active",
    iconName: "brain",
    description:
      "Building AI agents and chat experiences with LLM APIs and n8n workflows — including the conversational agent powering this very site.",
    skills: ["LLM APIs", "n8n", "AI Agents", "Conversational UX"],
    priority: "high",
    officialLink: "https://n8n.io/",
    usedIn: "agent service · n8n chat widget on artagdev.com.co",
    proofLink: "https://github.com/artag-services/agent",
    proofLabel: "See agent service",
  },
  {
    id: 10,
    title: "Serverless & Edge Architecture",
    category: "Cloud Computing",
    provider: "Self-taught · production work",
    confidence: "confident",
    duration: "Ongoing",
    startDate: "Since 2023",
    status: "active",
    iconName: "zap",
    description:
      "Serverless apps with edge functions and Next.js — this site itself runs on Vercel with edge middleware doing CSP and security headers.",
    skills: ["Edge Functions", "Vercel", "Next.js App Router", "Middleware"],
    priority: "medium",
    officialLink: "https://vercel.com/docs/functions",
    usedIn: "This site (artagdev.com.co) — middleware + serverless API routes",
    proofLink: "https://github.com/Artag-Chris/Artagsite",
    proofLabel: "See this site's repo",
  },
  {
    id: 11,
    title: "Database Design & Optimization",
    category: "Backend Development",
    provider: "Self-taught · production work",
    confidence: "confident",
    duration: "Ongoing",
    startDate: "Since 2022",
    status: "active",
    iconName: "database",
    description:
      "Schema design, indexing strategies and query optimization across PostgreSQL and Prisma — powering identity, scheduling and sync services.",
    skills: ["PostgreSQL", "Prisma", "Query Optimization", "Schema Design"],
    priority: "high",
    officialLink: "https://www.postgresql.org/",
    usedIn: "identity-service · scheduler · sync-service",
    proofLink: "https://github.com/artag-services/scheduler",
    proofLabel: "See scheduler",
  },
  {
    id: 12,
    title: "System Monitoring & Observability",
    category: "DevOps",
    provider: "Self-taught · Prometheus + Grafana",
    confidence: "beginner",
    duration: "Exploring",
    startDate: "Since 2026",
    status: "upcoming",
    iconName: "cpu",
    description:
      "Next on the roadmap: instrumenting the microservices fleet with structured logging, Prometheus metrics and Grafana dashboards.",
    skills: ["Prometheus", "Grafana", "Structured Logging", "Alerting"],
    priority: "medium",
    officialLink: "https://prometheus.io/",
  },
]

export function getStudyStats() {
  let active = 0
  let completed = 0
  let confident = 0
  for (const s of currentStudies) {
    if (s.status === "active") active++
    if (s.status === "completed") completed++
    if (s.confidence === "confident" || s.confidence === "expert") confident++
  }
  return { total: currentStudies.length, active, completed, confident }
}

export function getCategoriesWithCounts(): [string, number][] {
  const categories: Record<string, number> = {}
  for (const s of currentStudies) {
    categories[s.category] = (categories[s.category] || 0) + 1
  }
  return Object.entries(categories).sort((a, b) => b[1] - a[1])
}
