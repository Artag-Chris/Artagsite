import projectsEn from "./projects.en.json"
import projectsEs from "./projects.es.json"

export type ProjectStatus =
  | "in-use"
  | "deployed"
  | "validated"
  | "in-progress"
  | "live"
  | "archived"

export type ProjectAvailability = "online" | "offline" | "not-public"

export interface ProjectProofPoint {
  value: string
  label: string
}

export interface ProjectDecision {
  title: string
  description: string
}

export interface ProjectCaseStudy {
  problem: string
  solution: string
  results: string[]
  keyLearnings?: string[]
  challenges?: string[]
  architecture: string[]
  decisions: ProjectDecision[]
  limitations: string[]
}

export interface ProjectProps {
  id: string
  slug: string
  title: string
  description: string
  shortDescription?: string
  category: "personal" | "client" | "featured"
  status: ProjectStatus
  availability: ProjectAvailability
  sourceDoc?: string
  lastVerified?: string
  lastUpdated: string
  featuredOnHome: boolean
  proofPoints: ProjectProofPoint[]
  image?: string
  thumbnail?: string
  gallery?: string[]
  youtubeUrl?: string
  youtubeEmbedId?: string
  tech: string[]
  techTags?: Record<string, string[]>
  features?: string[]
  liveUrl?: string
  githubUrl?: string
  repositoryVisibility?: "public" | "private"
  githubRepo?: string
  companyName?: string
  role?: string
  achievements?: string[]
  startDate?: string
  endDate?: string | null
  caseStudy: ProjectCaseStudy
}

export const projectsData = projectsEn as ProjectProps[]
export const projectsDataEs = projectsEs as ProjectProps[]

export const projectsByLocale: Record<"en" | "es", ProjectProps[]> = {
  en: projectsData,
  es: projectsDataEs,
}

export const aiSystemSlugs = [
  "atiende",
  "cv-harness",
  "social-harness",
  "doc-harness",
] as const

export function getProjectBySlug(slug: string, locale: "en" | "es") {
  return projectsByLocale[locale].find((project) => project.slug === slug)
}
