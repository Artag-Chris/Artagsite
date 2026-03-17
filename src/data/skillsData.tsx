
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


export const skillsData = [
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


export const skills = ["Software Architect", "Automation Specialist", "System Designer", "Technical Founder", "DevOps Engineer"]