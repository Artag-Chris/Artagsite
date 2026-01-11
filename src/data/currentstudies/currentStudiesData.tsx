"use client"

import type React from "react"

import {
  Code,
  Brain,
  Database,
  Zap,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Target,
  Smartphone,
  Network,
  Layers,
  Globe,
  Shield,
  Cpu,
  Container,
} from "lucide-react"
import { useRef } from "react"

export interface Study {
  id: number
  title: string
  category: string
  provider: string
  confidence: "beginner" | "intermediate" | "confident" | "expert"
  duration: string
  startDate: string
  status: "active" | "completed" | "upcoming"
  icon: React.ReactNode
  description: string
  skills: string[]
  priority: "high" | "medium" | "low"
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
    icon: <Layers className="h-8 w-8" />,
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
    icon: <Smartphone className="h-8 w-8" />,
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
    icon: <Container className="h-8 w-8" />,
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
    icon: <Network className="h-8 w-8" />,
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
    icon: <TrendingUp className="h-8 w-8" />,
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
    icon: <Code className="h-8 w-8" />,
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
    icon: <Globe className="h-8 w-8" />,
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
    icon: <Shield className="h-8 w-8" />,
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
    icon: <Brain className="h-8 w-8" />,
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
    icon: <Zap className="h-8 w-8" />,
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
    icon: <Database className="h-8 w-8" />,
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
    icon: <Cpu className="h-8 w-8" />,
    description: "Implementing comprehensive monitoring, logging, and alerting systems for production applications.",
    skills: ["Prometheus", "Grafana", "Logging", "Alerting"],
    priority: "medium",
    officialLink: "https://prometheus.io/",
  },
]

export const StudyIcon = ({
  study,
  index,
}: {
  study: Study
  index: number
}) => {
  const iconRef = useRef<HTMLDivElement>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-blue-500 to-cyan-400"
      case "medium":
        return "from-blue-400 to-sky-300"
      case "low":
        return "from-sky-300 to-blue-200"
      default:
        return "from-blue-500 to-cyan-400"
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "expert":
        return "text-indigo-400 bg-indigo-500/20"
      case "confident":
        return "text-blue-400 bg-blue-500/20"
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/20"
      case "beginner":
        return "text-orange-400 bg-orange-500/20"
      default:
        return "text-blue-400 bg-blue-500/20"
    }
  }

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case "expert":
        return "🚀"
      case "confident":
        return "💪"
      case "intermediate":
        return "📚"
      case "beginner":
        return "🌱"
      default:
        return "📚"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <TrendingUp className="h-4 w-4" />
      case "completed":
        return <Award className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div
      ref={iconRef}
      className="study-icon group relative flex flex-col items-center p-6 bg-zinc-800/30 backdrop-blur-sm rounded-3xl border border-zinc-700/50 hover:border-blue-400/50 transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 hover:z-50"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

      {/* Priority indicator */}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(study.priority)}`}></div>
      </div>

      {/* Status badge */}
      <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-blue-400 flex items-center justify-center">
        {getStatusIcon(study.status)}
      </div>

      {/* Main icon */}
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
          {study.icon}
        </div>

        {/* Confidence indicator instead of progress ring */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center text-sm">
          {getConfidenceIcon(study.confidence)}
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{study.title}</h3>
        <p className="text-sm text-blue-400 font-medium">{study.category}</p>
        <p className="text-xs text-zinc-400">{study.provider}</p>

        {/* Confidence level */}
        <div className="flex items-center justify-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(study.confidence)}`}>
            {study.confidence.charAt(0).toUpperCase() + study.confidence.slice(1)}
          </span>
        </div>

        {/* Duration */}
        <div className="text-xs text-zinc-500">{study.duration}</div>
      </div>

      {/* Hover details - Z-INDEX ALTO */}
      <div className="absolute inset-x-0 top-full mt-4 p-4 bg-zinc-800/95 backdrop-blur-sm rounded-xl border border-zinc-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[9999] shadow-2xl shadow-black/50">
        <p className="text-sm text-zinc-300 mb-3">{study.description}</p>

        <div className="space-y-2">
          <div className="text-xs text-zinc-500">Skills:</div>
          <div className="flex flex-wrap gap-1">
            {study.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {study.startDate}
          </span>
          <span className="capitalize">{study.status}</span>
        </div>

        {/* Official link */}
        <div className="mt-3 pt-3 border-t border-zinc-700">
          <a
            href={study.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
          >
            <Globe className="h-3 w-3" />
            Official Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
