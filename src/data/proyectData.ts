// Legacy import path kept for backwards compatibility.
// Single source of truth lives in ./projects.ts.
export {
  ProjectSchema,
  ProjectStatusSchema,
  ProjectAvailabilitySchema,
  ProjectProofPointSchema,
  ProjectDecisionSchema,
  ProjectCaseStudySchema,
  projectsData,
  projectsDataEs,
  projectsByLocale,
  aiSystemSlugs,
  PRIVATE_MICROSERVICES_COUNT,
  getProjectBySlug,
  getFeaturedProjects,
  type ProjectStatus,
  type ProjectAvailability,
  type ProjectProofPoint,
  type ProjectDecision,
  type ProjectCaseStudy,
  type ProjectProps,
} from "./projects"
