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
}

export const currentStudies: Study[] = [
  {
    id: 1,
    title: "Software Architecture Patterns",
    category: "System Design",
    provider: "Microsoft Learn",
    confidence: "confident",
    duration: "10 weeks",
    startDate: "Jan 2024",
    status: "active",
    iconName: "layers",
    description:
      "Mastering microservices, event-driven architecture, and scalable system design patterns for enterprise applications.",
    skills: ["Microservices", "Event Sourcing", "CQRS", "Domain-Driven Design"],
    priority: "high",
    officialLink: "https://docs.microsoft.com/en-us/azure/architecture/",
  },
  {
    id: 2,
    title: "React Native Development",
    category: "Mobile Development",
    provider: "Meta Developers",
    confidence: "intermediate",
    duration: "8 weeks",
    startDate: "Feb 2024",
    status: "active",
    iconName: "smartphone",
    description:
      "Building cross-platform mobile applications with React Native, focusing on performance optimization and native integrations.",
    skills: ["React Native", "Expo", "Native Modules", "Performance Optimization"],
    priority: "high",
    officialLink: "https://reactnative.dev/",
  },
  {
    id: 3,
    title: "Docker & Containerization",
    category: "DevOps",
    provider: "Docker Inc",
    confidence: "confident",
    duration: "6 weeks",
    startDate: "Jan 2024",
    status: "active",
    iconName: "container",
    description:
      "Advanced containerization strategies, multi-stage builds, and orchestration with Docker Swarm and Kubernetes.",
    skills: ["Docker", "Kubernetes", "Container Orchestration", "Multi-stage Builds"],
    priority: "high",
    officialLink: "https://docs.docker.com/",
  },
  {
    id: 4,
    title: "WebSocket & Real-time Communication",
    category: "Backend Development",
    provider: "Socket.IO",
    confidence: "intermediate",
    duration: "5 weeks",
    startDate: "Mar 2024",
    status: "active",
    iconName: "network",
    description:
      "Implementing real-time features with WebSockets, Socket.IO, and building scalable chat applications and live updates.",
    skills: ["WebSockets", "Socket.IO", "Real-time Apps", "Event Broadcasting"],
    priority: "medium",
    officialLink: "https://socket.io/",
  },
  {
    id: 5,
    title: "System Scalability & Performance",
    category: "System Design",
    provider: "AWS Architecture Center",
    confidence: "intermediate",
    duration: "12 weeks",
    startDate: "Feb 2024",
    status: "active",
    iconName: "trending-up",
    description:
      "Learning horizontal scaling, load balancing, caching strategies, and building systems that handle millions of users.",
    skills: ["Load Balancing", "Caching", "Database Sharding", "CDN"],
    priority: "high",
    officialLink: "https://aws.amazon.com/architecture/",
  },
  {
    id: 6,
    title: "Advanced TypeScript",
    category: "Programming Languages",
    provider: "TypeScript Team",
    confidence: "confident",
    duration: "4 weeks",
    startDate: "Jan 2024",
    status: "active",
    iconName: "code",
    description:
      "Mastering advanced TypeScript patterns, generics, conditional types, and building type-safe applications at scale.",
    skills: ["Advanced Types", "Generics", "Type Guards", "Utility Types"],
    priority: "high",
    officialLink: "https://www.typescriptlang.org/",
  },
  {
    id: 7,
    title: "GraphQL & Apollo",
    category: "API Development",
    provider: "Apollo GraphQL",
    confidence: "intermediate",
    duration: "7 weeks",
    startDate: "Mar 2024",
    status: "active",
    iconName: "globe",
    description:
      "Building efficient APIs with GraphQL, implementing subscriptions, and optimizing queries for better performance.",
    skills: ["GraphQL", "Apollo Server", "Subscriptions", "Query Optimization"],
    priority: "medium",
    officialLink: "https://graphql.org/",
  },
  {
    id: 8,
    title: "Cybersecurity Fundamentals",
    category: "Security",
    provider: "OWASP Foundation",
    confidence: "beginner",
    duration: "9 weeks",
    startDate: "Apr 2024",
    status: "upcoming",
    iconName: "shield",
    description:
      "Understanding web application security, implementing authentication, authorization, and protecting against common vulnerabilities.",
    skills: ["OWASP Top 10", "JWT", "OAuth", "Security Best Practices"],
    priority: "medium",
    officialLink: "https://owasp.org/",
  },
  {
    id: 9,
    title: "Machine Learning for Developers",
    category: "Artificial Intelligence",
    provider: "TensorFlow",
    confidence: "beginner",
    duration: "14 weeks",
    startDate: "May 2024",
    status: "upcoming",
    iconName: "brain",
    description:
      "Integrating ML models into web applications, understanding neural networks, and building intelligent features.",
    skills: ["TensorFlow.js", "Neural Networks", "Model Integration", "AI APIs"],
    priority: "low",
    officialLink: "https://www.tensorflow.org/",
  },
  {
    id: 10,
    title: "Serverless Architecture",
    category: "Cloud Computing",
    provider: "Vercel",
    confidence: "intermediate",
    duration: "6 weeks",
    startDate: "Mar 2024",
    status: "active",
    iconName: "zap",
    description:
      "Building serverless applications with edge functions, understanding cold starts, and optimizing for performance.",
    skills: ["Edge Functions", "Serverless", "Edge Computing", "Performance"],
    priority: "medium",
    officialLink: "https://vercel.com/docs/functions",
  },
  {
    id: 11,
    title: "Database Design & Optimization",
    category: "Backend Development",
    provider: "PostgreSQL",
    confidence: "confident",
    duration: "8 weeks",
    startDate: "Feb 2024",
    status: "active",
    iconName: "database",
    description:
      "Advanced database design patterns, query optimization, indexing strategies, and building high-performance databases.",
    skills: ["PostgreSQL", "Query Optimization", "Indexing", "Database Design"],
    priority: "high",
    officialLink: "https://www.postgresql.org/",
  },
  {
    id: 12,
    title: "System Monitoring & Observability",
    category: "DevOps",
    provider: "Prometheus",
    confidence: "beginner",
    duration: "7 weeks",
    startDate: "Apr 2024",
    status: "upcoming",
    iconName: "cpu",
    description:
      "Implementing comprehensive monitoring, logging, and alerting systems for production applications.",
    skills: ["Prometheus", "Grafana", "Logging", "Alerting"],
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
