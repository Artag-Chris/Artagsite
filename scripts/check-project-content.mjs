import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = process.cwd()
const readProjects = (locale) =>
  JSON.parse(
    readFileSync(resolve(root, `src/data/projects.${locale}.json`), "utf8"),
  )

const en = readProjects("en")
const es = readProjects("es")
const errors = []
const validStatuses = new Set([
  "in-use",
  "deployed",
  "validated",
  "in-progress",
  "live",
  "archived",
])
const validAvailability = new Set(["online", "offline", "not-public"])
const requiredAiSlugs = [
  "atiende",
  "cv-harness",
  "social-harness",
  "doc-harness",
]

const validateCatalog = (projects, locale) => {
  const ids = new Set()
  const slugs = new Set()

  for (const project of projects) {
    const label = `${locale}:${project.slug || project.id || "unknown"}`

    if (!project.id || ids.has(project.id)) errors.push(`${label}: duplicate or missing id`)
    if (!project.slug || slugs.has(project.slug)) errors.push(`${label}: duplicate or missing slug`)
    if (!/^[a-z0-9-]+$/.test(project.slug || "")) errors.push(`${label}: invalid slug`)
    ids.add(project.id)
    slugs.add(project.slug)

    if (!validStatuses.has(project.status)) errors.push(`${label}: invalid status`)
    if (!validAvailability.has(project.availability)) errors.push(`${label}: invalid availability`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(project.lastUpdated || "")) {
      errors.push(`${label}: lastUpdated must use YYYY-MM-DD`)
    }
    if (!Array.isArray(project.proofPoints) || project.proofPoints.length < 1 || project.proofPoints.length > 3) {
      errors.push(`${label}: expected between one and three proof points`)
    }
    if (!project.caseStudy?.architecture?.length || !project.caseStudy?.decisions?.length) {
      errors.push(`${label}: architecture and decisions are required`)
    }
    if (!project.caseStudy?.limitations?.length) {
      errors.push(`${label}: explicit limitations are required`)
    }
    if (project.sourceDoc && !existsSync(resolve(root, project.sourceDoc))) {
      errors.push(`${label}: missing sourceDoc ${project.sourceDoc}`)
    }
    if (Boolean(project.youtubeUrl) !== Boolean(project.youtubeEmbedId)) {
      errors.push(`${label}: youtubeUrl and youtubeEmbedId must be provided together`)
    }
  }

  const serialized = JSON.stringify(projects)
  for (const placeholder of ["yourusername", "example.com", "dQw4w9WgXcQ", "LvsgCdWss4I"]) {
    if (serialized.includes(placeholder)) errors.push(`${locale}: placeholder URL or media found: ${placeholder}`)
  }

  return { ids, slugs }
}

const enSets = validateCatalog(en, "en")
const esSets = validateCatalog(es, "es")

if (en.length !== es.length) errors.push("English and Spanish catalogs have different project counts")

for (const project of en) {
  const translated = es.find((candidate) => candidate.slug === project.slug)
  if (!translated) {
    errors.push(`Missing Spanish project for ${project.slug}`)
    continue
  }
  if (translated.id !== project.id) errors.push(`${project.slug}: id differs by locale`)
  if (translated.status !== project.status) errors.push(`${project.slug}: status differs by locale`)
  if (translated.availability !== project.availability) {
    errors.push(`${project.slug}: availability differs by locale`)
  }
}

for (const slug of requiredAiSlugs) {
  if (!enSets.slugs.has(slug)) errors.push(`Missing required AI system: ${slug}`)
}

const homeProjects = en.filter((project) => project.featuredOnHome).map((project) => project.slug)
if (homeProjects.length !== 2) errors.push(`Expected two home projects, found ${homeProjects.length}`)

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"))
  process.exit(1)
}

console.log(`Project content valid: ${en.length} projects in English and Spanish; ${homeProjects.join(", ")} featured on home.`)
