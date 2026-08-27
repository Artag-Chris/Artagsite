
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiDocker,
  SiAmazon,
  SiGit,
  SiN8N,
  SiTerraform,
  SiCloudflare,
  SiRedis,
  SiPrisma,
  SiVercel,
  SiKubernetes,
  SiNginx,
  SiLinux,
  SiGithubactions,
  SiPython,
  SiJest,
  SiTailwindcss,
  SiSupabase,
  SiFirebase,
  SiStripe,
  SiSocketdotio,
  SiExpo,
  SiZod,
  SiGrafana,
  SiPrometheus,
} from "react-icons/si"
import { useCasesDataEs } from "./skillsData.es"


// ============ TOOLS DATA (For optional secondary display) ============
export interface Tool {
  name: string;
  level: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: string;
}

export const toolsData: Tool[] = [
  // ── Languages & Frameworks ──
 {
   name: "TypeScript",
   level: "",
   description: "Strongly-typed JavaScript for building maintainable, scalable applications with confidence.",
   icon: SiTypescript,
   color: "text-blue-400",
   category: "Languages & Frameworks",
 },
  {
    name: "Node.js",
    level: "",
    description: "Runtime for building fast, scalable server-side applications and microservices.",
    icon: SiNodedotjs,
    color: "text-green-500",
    category: "Languages & Frameworks",
  },
  {
    name: "React",
    level: "",
    description: "Component library for building interactive, maintainable user interfaces.",
    icon: SiReact,
    color: "text-cyan-400",
    category: "Languages & Frameworks",
  },
  {
    name: "Next.js",
    level: "",
    description: "React framework for full-stack applications with server-side rendering and static generation.",
    icon: SiNextdotjs,
    color: "text-white",
    category: "Languages & Frameworks",
  },
  {
    name: "React Native",
    level: "",
    description: "Cross-platform mobile development with native performance using Expo.",
    icon: SiExpo,
    color: "text-blue-400",
    category: "Languages & Frameworks",
  },
  {
    name: "Express",
    level: "",
    description: "Minimal web framework for building APIs and server applications.",
    icon: SiExpress,
    color: "text-gray-400",
    category: "Languages & Frameworks",
  },
  {
    name: "GraphQL",
    level: "",
    description: "Query language for building efficient, type-safe APIs.",
    icon: SiGraphql,
    color: "text-pink-500",
    category: "Languages & Frameworks",
  },
  {
    name: "Python",
    level: "",
    description: "Versatile language for scripting, data processing, and backend services.",
    icon: SiPython,
    color: "text-yellow-400",
    category: "Languages & Frameworks",
  },
  // ── Databases ──
  {
    name: "PostgreSQL",
    level: "",
    description: "Enterprise-grade relational database for architecting reliable data systems.",
    icon: SiPostgresql,
    color: "text-blue-500",
    category: "Databases",
  },
  {
    name: "MongoDB",
    level: "",
    description: "NoSQL database for flexible, scalable data storage in modern applications.",
    icon: SiMongodb,
    color: "text-green-500",
    category: "Databases",
  },
  {
    name: "Redis",
    level: "",
    description: "In-memory data store for caching, sessions, and real-time features.",
    icon: SiRedis,
    color: "text-red-500",
    category: "Databases",
  },
  {
    name: "Prisma",
    level: "",
    description: "Next-generation ORM for type-safe database access and migrations.",
    icon: SiPrisma,
    color: "text-indigo-400",
    category: "Databases",
  },
  {
    name: "Supabase",
    level: "",
    description: "Open-source Firebase alternative with Postgres, auth, and real-time.",
    icon: SiSupabase,
    color: "text-green-400",
    category: "Databases",
  },
  {
    name: "Firebase",
    level: "",
    description: "Google's app development platform for auth, Firestore, and hosting.",
    icon: SiFirebase,
    color: "text-orange-400",
    category: "Databases",
  },
  // ── DevOps & Cloud ──
 {
   name: "Docker",
   level: "",
   description: "Containerization and orchestration for building scalable, isolated application environments.",
   icon: SiDocker,
   color: "text-blue-400",
   category: "DevOps & Cloud",
 },
  {
    name: "Kubernetes",
    level: "",
    description: "Container orchestration for deploying and managing microservices at scale.",
    icon: SiKubernetes,
    color: "text-blue-500",
    category: "DevOps & Cloud",
  },
  {
    name: "AWS",
    level: "",
    description: "Cloud infrastructure for architecting globally-distributed, resilient systems.",
    icon: SiAmazon,
    color: "text-orange-400",
    category: "DevOps & Cloud",
  },
  {
    name: "Cloudflare",
    level: "",
    description: "CDN, DDoS protection, and edge computing for fast, secure applications.",
    icon: SiCloudflare,
    color: "text-orange-400",
    category: "DevOps & Cloud",
  },
  {
    name: "Terraform",
    level: "",
    description: "Infrastructure as code for provisioning and managing cloud resources.",
    icon: SiTerraform,
    color: "text-purple-400",
    category: "DevOps & Cloud",
  },
  {
    name: "Vercel",
    level: "",
    description: "Deployment platform for Next.js with edge functions and analytics.",
    icon: SiVercel,
    color: "text-white",
    category: "DevOps & Cloud",
  },
  {
    name: "Nginx",
    level: "",
    description: "High-performance web server and reverse proxy for load balancing.",
    icon: SiNginx,
    color: "text-green-500",
    category: "DevOps & Cloud",
  },
  {
    name: "Linux",
    level: "",
    description: "Server administration, shell scripting, and system management.",
    icon: SiLinux,
    color: "text-yellow-400",
    category: "DevOps & Cloud",
  },
  {
    name: "GitHub Actions",
    level: "",
    description: "CI/CD pipelines for automated testing, building, and deployment.",
    icon: SiGithubactions,
    color: "text-blue-400",
    category: "DevOps & Cloud",
  },
  // ── Automation & Real-time ──
  {
    name: "n8n",
    level: "",
    description: "Visual automation platform for connecting services and transforming workflows.",
    icon: SiN8N,
    color: "text-orange-400",
    category: "Automation & Real-time",
  },
  {
    name: "Socket.IO",
    level: "",
    description: "Real-time bidirectional event-based communication for live features.",
    icon: SiSocketdotio,
    color: "text-white",
    category: "Automation & Real-time",
  },
  // ── Monitoring & Security ──
  {
    name: "Grafana",
    level: "",
    description: "Observability dashboards for monitoring metrics, logs, and traces.",
    icon: SiGrafana,
    color: "text-orange-400",
    category: "Monitoring & Security",
  },
  {
    name: "Prometheus",
    level: "",
    description: "Metrics collection and alerting for system monitoring.",
    icon: SiPrometheus,
    color: "text-red-400",
    category: "Monitoring & Security",
  },
  // ── Tools & Libraries ──
 {
   name: "Git",
   level: "",
   description: "Version control system for collaborative development and maintaining code history.",
   icon: SiGit,
   color: "text-orange-500",
   category: "Tools & Libraries",
 },
  {
    name: "Tailwind CSS",
    level: "",
    description: "Utility-first CSS framework for rapid UI development.",
    icon: SiTailwindcss,
    color: "text-cyan-400",
    category: "Tools & Libraries",
  },
  {
    name: "Zod",
    level: "",
    description: "TypeScript-first schema validation for forms and APIs.",
    icon: SiZod,
    color: "text-blue-400",
    category: "Tools & Libraries",
  },
  {
    name: "Stripe",
    level: "",
    description: "Payment processing infrastructure for online businesses.",
    icon: SiStripe,
    color: "text-indigo-400",
    category: "Tools & Libraries",
  },
  {
    name: "Jest",
    level: "",
    description: "Testing framework for JavaScript with snapshot and coverage support.",
    icon: SiJest,
    color: "text-red-400",
    category: "Tools & Libraries",
  },
]


  export interface Skill {
    name: string;
    level: string;
    description: string;
    icon: React.ElementType;
    color: string;
  }


// ============ USE CASES DATA (Primary section) ============
export interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  tab: "everyone" | "developer";
  
  // Problem statement - What business problem does this solve
  problem: string;
  
  // Solution approach - How you solve it
  solution: string;
  
  // Technical stack used
  techStack: string[];
  
  // Specific capabilities you demonstrate
  capabilities: string[];
  
  // Real-world impact metrics (placeholder for user to fill in)
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  
  // Workflow/process overview (multi-step execution)
  process?: string[];
  
  // Example or case study snippet
  example?: string;
}

export const useCasesData: UseCase[] = [
  // ── FOR EVERYONE ──
  {
    id: "whatsapp-integrations",
    title: "WhatsApp & Messaging Bots",
    icon: SiN8N,
    iconColor: "text-green-400",
    tab: "everyone",
    
    problem: "You're answering the same messages manually, or your team misses important requests because they come from too many places.",
    
    solution: "Build smart messaging flows that handle common questions, route messages to the right person, and follow up automatically — so nothing slips through.",
    
    techStack: ["WhatsApp API", "n8n", "Webhooks"],
    
    capabilities: [
      "Automated welcome messages and FAQs",
      "Smart routing to team members",
      "Order confirmations and follow-ups",
      "Integration with your CRM or spreadsheet",
    ],
    
    metrics: [
      {
        label: "Messages Handled",
        value: "1,000+",
        description: "Automated monthly"
      },
      {
        label: "Response Time",
        value: "<5 sec",
        description: "Average automated reply"
      },
      {
        label: "Manual Work Saved",
        value: "10+ hrs/week",
        description: "For small teams"
      }
    ],
    
    process: [
      "Map out your current message flow",
      "Design the automation logic",
      "Connect WhatsApp + your tools",
      "Test with real scenarios",
      "Launch and monitor"
    ]
  },
  {
    id: "service-connections",
    title: "Connecting Your Tools Together",
    icon: SiN8N,
    iconColor: "text-blue-400",
    tab: "everyone",
    
    problem: "Your data is scattered across spreadsheets, CRMs, email, and apps that don't talk to each other. You're copying info manually between them.",
    
    solution: "I build invisible bridges between your tools so data flows automatically. When something changes in one place, it updates everywhere it needs to.",
    
    techStack: ["n8n", "APIs", "Webhooks"],
    
    capabilities: [
      "Connect Google Sheets, email, CRMs, and more",
      "Auto-sync data between platforms",
      "Trigger actions when something changes",
      "Error alerts so you know if something breaks",
    ],
    
    metrics: [
      {
        label: "Services Connected",
        value: "12+",
        description: "Different platforms integrated"
      },
      {
        label: "Workflows Active",
        value: "50+",
        description: "Running daily in production"
      },
      {
        label: "Error Rate",
        value: "<0.1%",
        description: "Automated reliability"
      }
    ],
    
    process: [
      "Audit your current tools and pain points",
      "Design the data flow",
      "Build and test the connections",
      "Deploy with monitoring",
      "Hand off documentation"
    ]
  },
  {
    id: "custom-dashboards",
    title: "Custom Dashboards & Internal Tools",
    icon: SiReact,
    iconColor: "text-blue-400",
    tab: "everyone",
    
    problem: "You need a way to see your data in one place — sales, inventory, team performance — but off-the-shelf tools are expensive or don't fit your workflow.",
    
    solution: "I build clean, fast web dashboards tailored to exactly what you need to see. No bloat, no unused features — just the data that matters to you.",
    
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    
    capabilities: [
      "Real-time data visualization",
      "Role-based access for your team",
      "Mobile-friendly dashboards",
      "Connect to your existing databases",
    ],
    
    metrics: [
      {
        label: "Build Time",
        value: "2-4 weeks",
        description: "Typical dashboard project"
      },
      {
        label: "Devices",
        value: "All",
        description: "Desktop, tablet, and mobile"
      },
      {
        label: "Updates",
        value: "Real-time",
        description: "Data refreshes live"
      }
    ]
  },
  // ── FOR DEVELOPERS ──
  {
    id: "zero-downtime-migrations",
    title: "Zero-Downtime Database Migrations",
    icon: SiPostgresql,
    iconColor: "text-blue-500",
    tab: "developer",
    
    problem: "Legacy systems with millions of records need migration to modern databases without losing data or disrupting service. Traditional migrations cause downtime measured in hours.",
    
    solution: "Design and execute sophisticated multi-phase migration strategies with parallel processing, checksums verification, and binary log replication to ensure zero-downtime transitions.",
    
    techStack: ["PostgreSQL", "MySQL", "Docker", "AWS", "Node.js", "TypeScript"],
    
    capabilities: [
      "Design zero-downtime migration architectures",
      "Implement data consistency verification systems",
      "Build parallel processing pipelines for large datasets",
      "Create rollback procedures and failsafe mechanisms",
      "Monitor migration health in real-time",
      "Optimize for 99.99% uptime"
    ],
    
    metrics: [
      {
        label: "Users Migrated",
        value: "32,000+",
        description: "Records migrated without data loss"
      },
      {
        label: "Error Rate",
        value: "0.004%",
        description: "Data integrity maintained across full migration"
      },
      {
        label: "Downtime",
        value: "0 seconds",
        description: "Complete zero-downtime execution"
      }
    ],
    
    process: [
      "Analyze source database schema and constraints",
      "Design multi-stage replication strategy",
      "Set up parallel verification systems",
      "Execute incremental data transfers with checksums",
      "Monitor integrity continuously",
      "Perform instantaneous cutover with zero downtime"
    ]
  },
  {
    id: "multi-gateway-payments",
    title: "Multi-Gateway Payment Integration",
    icon: SiGraphql,
    iconColor: "text-pink-500",
    tab: "developer",
    
    problem: "Handle payments from multiple gateways (PayValid, AvallPay, etc.) with different protocols, error handling, and requirements. Need smart routing to prevent payment failures and optimize costs.",
    
    solution: "Build flexible, intelligent payment orchestration layer that intelligently routes transactions based on success rates, fees, geographic regions, and transaction types.",
    
    techStack: ["Node.js", "Express", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],
    
    capabilities: [
      "Integrate multiple payment processors",
      "Implement intelligent transaction routing",
      "Build context-aware payment fallback systems",
      "Handle transaction reconciliation and auditing",
      "Create real-time payment monitoring dashboards",
      "Support complex payment scenarios ($25M+ edge cases)"
    ],
    
    metrics: [
      {
        label: "Typical Volume",
        value: "$2M+",
        description: "Daily transaction processing"
      },
      {
        label: "Peak Capacity",
        value: "$25M",
        description: "Handled edge case transactions"
      },
      {
        label: "Success Rate",
        value: "99.7%+",
        description: "Through intelligent routing and fallbacks"
      }
    ],
    
    example: "Route international transactions through lower-fee gateways, fallback to premium gateways on failure, handle currency conversions, and provide real-time reconciliation."
  },
  {
    id: "performance-optimization",
    title: "High-Performance System Optimization",
    icon: SiAmazon,
    iconColor: "text-orange-400",
    tab: "developer",
    
    problem: "Applications suffering from slow load times, high latency, and poor scalability. Users experiencing degraded experience under load.",
    
    solution: "Comprehensive performance audit across full stack: database optimization, caching strategies, code efficiency, infrastructure scaling, and resource optimization.",
    
    techStack: ["TypeScript", "Node.js", "React", "Next.js", "PostgreSQL", "Redis", "AWS", "Docker"],
    
    capabilities: [
      "Profile and identify performance bottlenecks",
      "Implement database query optimization",
      "Design caching strategies (Redis, CDN)",
      "Optimize frontend bundle sizes and rendering",
      "Implement lazy loading and code splitting",
      "Scale infrastructure horizontally"
    ],
    
    metrics: [
      {
        label: "Average Improvement",
        value: "40-60%",
        description: "Performance gains across systems"
      },
      {
        label: "Load Time",
        value: "TBD",
        description: "Fill in after implementation"
      },
      {
        label: "Concurrent Users",
        value: "TBD",
        description: "Increase in supported concurrent load"
      }
    ]
  },
  {
    id: "scalable-architecture",
    title: "Scalable Microservices Architecture",
    icon: SiDocker,
    iconColor: "text-blue-400",
    tab: "developer",
    
    problem: "Monolithic applications struggling to scale. Need to handle millions of concurrent users with independent service scaling.",
    
    solution: "Design and implement microservices architecture with containerization, orchestration, service discovery, and independent scaling strategies.",
    
    techStack: ["Docker", "AWS", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "GraphQL", "Git"],
    
    capabilities: [
      "Design microservices communication patterns",
      "Implement service discovery and load balancing",
      "Build scalable data models across services",
      "Create deployment pipelines and CI/CD",
      "Implement distributed tracing and monitoring",
      "Lead teams through architecture implementation"
    ],
    
    metrics: [
      {
        label: "Concurrent Users",
        value: "100K+",
        description: "Supported by microservices architecture"
      },
      {
        label: "Team Size",
        value: "2-5+",
        description: "Led during architecture implementation"
      },
      {
        label: "Service Independence",
        value: "High",
        description: "Each service scales independently"
      }
    ]
  },
  {
    id: "real-time-features",
    title: "Real-Time Features & Live Updates",
    icon: SiReact,
    iconColor: "text-blue-300",
    tab: "developer",
    
    problem: "Applications need live data updates without polling. Users expect instant notifications and real-time collaborative features.",
    
    solution: "Implement WebSocket-based real-time infrastructure with efficient message broadcasting, presence systems, and sub-100ms latency.",
    
    techStack: ["React", "Next.js", "Node.js", "WebSockets", "TypeScript", "PostgreSQL"],
    
    capabilities: [
      "Implement WebSocket servers and clients",
      "Build presence and activity tracking systems",
      "Design efficient message broadcasting",
      "Create real-time collaborative features",
      "Handle connection resilience and reconnection",
      "Maintain sub-100ms latency under load"
    ],
    
    metrics: [
      {
        label: "Latency",
        value: "<100ms",
        description: "Average round-trip message latency"
      },
      {
        label: "Peak Connections",
        value: "TBD",
        description: "Concurrent WebSocket connections supported"
      },
      {
        label: "Broadcast Speed",
        value: "Sub-second",
        description: "Update delivery to all connected clients"
      }
    ]
  },
  {
    id: "automation-workflows-dev",
    title: "Advanced Workflow Automation",
    icon: SiN8N,
    iconColor: "text-blue-500",
    tab: "developer",
    
    problem: "Complex business logic spanning multiple services needs reliable automation with error handling, retries, and monitoring.",
    
    solution: "Design and build production-grade automation workflows with conditional logic, error recovery, dead-letter queues, and observability.",
    
    techStack: ["n8n", "Node.js", "TypeScript", "GraphQL", "PostgreSQL", "AWS"],
    
    capabilities: [
      "Design complex workflow automation",
      "Integrate 50+ different services and APIs",
      "Build conditional logic and error handling",
      "Create monitoring and alerting systems",
      "Design data transformation pipelines",
      "Implement webhook and scheduling systems"
    ],
    
    metrics: [
      {
        label: "Workflows Built",
        value: "50+",
        description: "Production automation workflows"
      },
      {
        label: "Manual Hours Saved",
        value: "TBD",
        description: "Weekly automation impact"
      },
      {
        label: "Error Rate",
        value: "<0.1%",
        description: "Automated workflow reliability"
      }
    ]
  }
]


export const skills = ["I Connect Things", "I Automate Workflows", "I Build Tools", "Let's Collaborate", "I Save You Time"]

// Localized use cases map. Select by locale: useCasesByLocale[locale]
export const useCasesByLocale: Record<"en" | "es", UseCase[]> = {
  en: useCasesData,
  es: useCasesDataEs,
}