
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
  description: "My visual automation workhorse: Connecting apps and services to transform complex workflows into effortless digital symphonies.",
  icon: SiN8N, // Asegúrate de tener este icono importado
  color: "text-blue-500", // Sugerencia de color para n8n
},
  {
    name: "TypeScript",
    level: "",
    description: "A strongly typed programming language that builds on JavaScript, giving better tooling at any scale.",
    icon: SiTypescript,
    color: "text-blue-400",
  },
  {
    name: "React",
    level: "",
    description: "A JavaScript library for building user interfaces, particularly single-page applications.",
    icon: SiReact,
    color: "text-cyan-400",
  },
  {
    name: "Next.js",
    level: "",
    description: "A React framework that enables server-side rendering and generating static websites.",
    icon: SiNextdotjs,
    color: "text-white",
  },
  {
    name: "Node.js",
    level: "",
    description:
      "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
    icon: SiNodedotjs,
    color: "text-indigo-400",
  },
  {
    name: "Express",
    level: "",
    description: "A minimal and flexible Node.js web application framework for building web and mobile applications.",
    icon: SiExpress,
    color: "text-gray-400",
  },
  {
    name: "MongoDB",
    level: "",
    description: "A NoSQL database that uses JSON-like documents with optional schemas for storing data.",
    icon: SiMongodb,
    color: "text-indigo-500",
  },
  {
    name: "PostgreSQL",
    level: "",
    description: "A powerful, open source object-relational database system with a strong reputation for reliability.",
    icon: SiPostgresql,
    color: "text-blue-500",
  },
  {
    name: "GraphQL",
    level: "",
    description: "A query language for APIs and a runtime for executing those queries with your existing data.",
    icon: SiGraphql,
    color: "text-pink-500",
  },
  {
    name: "Docker",
    level: "",
    description: "A platform for developing, shipping, and running applications in containers.",
    icon: SiDocker,
    color: "text-blue-400",
  },
  {
    name: "AWS",
    level: "",
    description: "A comprehensive cloud platform offering over 200 fully featured services from data centers globally.",
    icon: SiAmazon,
    color: "text-orange-400",
  },
  {
    name: "Git",
    level: "",
    description:
      "A distributed version control system for tracking changes in source code during software development.",
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


export const skills = ["React Developer", "UI/UX Enthusiast", "Next.js Expert", "Problem Solver", "Full Stack Developer"]