
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
  SiN8N
} from "react-icons/si"


// ============ TOOLS DATA (For optional secondary display) ============
export const toolsData = [
 {
  name: "n8n",
  level: "",
  description: "Visual automation platform: Connecting services and transforming workflows into seamless digital experiences.",
  icon: SiN8N,
  color: "text-blue-500",
},
 {
   name: "Docker",
   level: "",
   description: "Containerization and orchestration for building scalable, isolated application environments.",
   icon: SiDocker,
   color: "text-blue-400",
 },
 {
   name: "AWS",
   level: "",
   description: "Cloud infrastructure for architecting globally-distributed, resilient systems.",
   icon: SiAmazon,
   color: "text-orange-400",
 },
  {
    name: "TypeScript",
    level: "",
    description: "Strongly-typed JavaScript for building maintainable, scalable applications with confidence.",
    icon: SiTypescript,
    color: "text-blue-400",
  },
  {
    name: "Node.js",
    level: "",
    description: "Runtime for building fast, scalable server-side applications and microservices.",
    icon: SiNodedotjs,
    color: "text-indigo-400",
  },
  {
    name: "Next.js",
    level: "",
    description: "React framework for full-stack applications with server-side rendering and static generation.",
    icon: SiNextdotjs,
    color: "text-white",
  },
  {
    name: "React",
    level: "",
    description: "Component library for building interactive, maintainable user interfaces.",
    icon: SiReact,
    color: "text-cyan-400",
  },
  {
    name: "PostgreSQL",
    level: "",
    description: "Enterprise-grade relational database for architecting reliable data systems.",
    icon: SiPostgresql,
    color: "text-blue-500",
  },
  {
    name: "MongoDB",
    level: "",
    description: "NoSQL database for flexible, scalable data storage in modern applications.",
    icon: SiMongodb,
    color: "text-indigo-500",
  },
  {
    name: "Express",
    level: "",
    description: "Minimal web framework for building APIs and server applications.",
    icon: SiExpress,
    color: "text-gray-400",
  },
  {
    name: "GraphQL",
    level: "",
    description: "Query language for building efficient, type-safe APIs.",
    icon: SiGraphql,
    color: "text-pink-500",
  },
  {
    name: "Git",
    level: "",
    description: "Version control system for collaborative development and maintaining code history.",
    icon: SiGit,
    color: "text-orange-500",
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
  {
    id: "zero-downtime-migrations",
    title: "Zero-Downtime Database Migrations",
    icon: SiPostgresql,
    iconColor: "text-blue-500",
    
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
    iconColor: "text-cyan-400",
    
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
    id: "automation-workflows",
    title: "Business Process Automation",
    icon: SiN8N,
    iconColor: "text-blue-500",
    
    problem: "Repetitive business processes consuming manual effort. Different systems need to communicate and share data seamlessly.",
    
    solution: "Design and build automation workflows connecting disparate systems, eliminating manual work, and ensuring data consistency across platforms.",
    
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


export const skills = ["Software Architect", "Automation Specialist", "System Designer", "Technical Founder", "DevOps Engineer"]