import { z } from "zod"
import projectsEn from "./projects.en.json"
import projectsEs from "./projects.es.json"

/**
 * Single source of truth for all projects, case studies, statuses and
 * audited metrics shared between `/` (Home) and `/labs` (Engineering Lab).
 * Validated at module load time with Zod so malformed entries fail fast.
 */

export const ProjectStatusSchema = z.enum([
  "in-use",
  "deployed",
  "validated",
  "in-progress",
  "live",
  "archived",
])

export const ProjectAvailabilitySchema = z.enum([
  "online",
  "offline",
  "not-public",
])

export const ProjectProofPointSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
})

export const ProjectDecisionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export const ProjectCaseStudySchema = z.object({
  problem: z.string().min(1),
  solution: z.string().min(1),
  results: z.array(z.string().min(1)),
  keyLearnings: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  architecture: z.array(z.string().min(1)),
  decisions: z.array(ProjectDecisionSchema),
  limitations: z.array(z.string()),
})

export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  category: z.enum(["personal", "client", "featured"]),
  status: ProjectStatusSchema,
  availability: ProjectAvailabilitySchema,
  sourceDoc: z.string().optional(),
  lastVerified: z.string().optional(),
  lastUpdated: z.string().min(1),
  featuredOnHome: z.boolean(),
  proofPoints: z.array(ProjectProofPointSchema),
  image: z.string().optional(),
  thumbnail: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  youtubeUrl: z.string().optional(),
  youtubeEmbedId: z.string().optional(),
  tech: z.array(z.string()),
  techTags: z.record(z.string(), z.array(z.string())).optional(),
  features: z.array(z.string()).optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  repositoryVisibility: z.enum(["public", "private"]).optional(),
  githubRepo: z.string().optional(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().nullable().optional(),
  caseStudy: ProjectCaseStudySchema,
})

const ProjectListSchema = z.array(ProjectSchema)

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>
export type ProjectAvailability = z.infer<typeof ProjectAvailabilitySchema>
export type ProjectProofPoint = z.infer<typeof ProjectProofPointSchema>
export type ProjectDecision = z.infer<typeof ProjectDecisionSchema>
export type ProjectCaseStudy = z.infer<typeof ProjectCaseStudySchema>
export type ProjectProps = z.infer<typeof ProjectSchema>

export const projectsData: ProjectProps[] = ProjectListSchema.parse(projectsEn)
export const projectsDataEs: ProjectProps[] = ProjectListSchema.parse(projectsEs)

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

export const PRIVATE_MICROSERVICES_COUNT = 13 as const

export function getProjectBySlug(slug: string, locale: "en" | "es"): ProjectProps | undefined {
  return projectsByLocale[locale].find((project) => project.slug === slug)
}

export function getFeaturedProjects(locale: "en" | "es"): ProjectProps[] {
  return projectsByLocale[locale].filter((project) => project.featuredOnHome)
}
