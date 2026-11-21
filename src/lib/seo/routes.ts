export const SITE_URL = "https://www.artagdev.com.co" as const

export const OFFICIAL_NAP = {
  name: "Artag Dev",
  location: "Pereira, Risaralda, Colombia",
  phoneDisplay: "+57 320 571 1428",
  phoneE164: "+573205711428",
  email: "info@artagdev.com.co",
  postalCode: "660001",
  geo: { latitude: 4.8133, longitude: -75.6961 },
} as const

export interface BilingualRoutePair {
  id: string
  en: string
  es: string
  priority: number
  lastModified: string
}

export const PILLAR_ROUTES: readonly BilingualRoutePair[] = [
  {
    id: "ai-engineering",
    en: "/services/ai-engineering",
    es: "/es/servicios/ingenieria-ia-agentes",
    priority: 0.95,
    lastModified: "2026-11-21",
  },
  {
    id: "local-pereira",
    en: "/software-development-colombia",
    es: "/es/desarrollo-de-software-pereira",
    priority: 0.95,
    lastModified: "2026-11-21",
  },
  {
    id: "microservices",
    en: "/services/microservices-architecture",
    es: "/es/servicios/arquitectura-microservicios",
    priority: 0.9,
    lastModified: "2026-11-21",
  },
  {
    id: "cybersecurity",
    en: "/services/application-cybersecurity",
    es: "/es/servicios/ciberseguridad-aplicaciones",
    priority: 0.9,
    lastModified: "2026-11-21",
  },
  {
    id: "software-development",
    en: "/services/software-development",
    es: "/es/servicios/desarrollo-de-software",
    priority: 0.9,
    lastModified: "2026-11-21",
  },
] as const

export interface EngineeringArticlePair {
  id: string
  enSlug?: string
  esSlug: string
  pillarId: string
  datePublished: string
  dateModified: string
}

export const ENGINEERING_ARTICLE_PAIRS: readonly EngineeringArticlePair[] = [
  {
    id: "semantic-cache-pgvector",
    enSlug: "semantic-caching-pgvector-llm-cost-reduction",
    esSlug: "cache-semantico-pgvector-reduccion-costos-llm",
    pillarId: "ai-engineering",
    datePublished: "2026-11-10",
    dateModified: "2026-11-21",
  },
  {
    id: "multi-tenant-rag",
    enSlug: "secure-multi-tenant-rag-architecture",
    esSlug: "arquitectura-rag-multi-tenant-segura",
    pillarId: "ai-engineering",
    datePublished: "2026-11-12",
    dateModified: "2026-11-21",
  },
  {
    id: "microservices-redis-bullmq",
    enSlug: "microservices-idempotency-redis-bullmq",
    esSlug: "microservicios-idempotencia-redis-bullmq",
    pillarId: "microservices",
    datePublished: "2026-11-14",
    dateModified: "2026-11-21",
  },
  {
    id: "webhook-hmac-sha256",
    enSlug: "webhook-security-hmac-sha256-anti-replay",
    esSlug: "seguridad-webhooks-hmac-sha256",
    pillarId: "cybersecurity",
    datePublished: "2026-11-16",
    dateModified: "2026-11-21",
  },
  {
    id: "pereira-whatsapp-ia",
    // Spanish-only local SEO article (Pereira & Eje Cafetero)
    esSlug: "automatizacion-ia-whatsapp-empresas-pereira",
    pillarId: "local-pereira",
    datePublished: "2026-11-18",
    dateModified: "2026-11-21",
  },
  {
    id: "owasp-llm-security",
    enSlug: "owasp-llm-top-10-agent-hardening",
    esSlug: "owasp-llm-seguridad-agentes-ia",
    pillarId: "cybersecurity",
    datePublished: "2026-11-20",
    dateModified: "2026-11-21",
  },
] as const

export function getPillarById(id: string): BilingualRoutePair {
  const found = PILLAR_ROUTES.find((r) => r.id === id)
  if (!found) {
    throw new Error(`Unknown pillar route id: ${id}`)
  }
  return found
}

export function buildBilingualAlternates(enPath: string, esPath: string, locale: "en" | "es") {
  const enUrl = `${SITE_URL}${enPath === "/" ? "" : enPath}`
  const esUrl = `${SITE_URL}${esPath}`
  return {
    canonical: locale === "es" ? esUrl : enUrl,
    languages: {
      es: esUrl,
      en: enUrl,
      "x-default": enUrl,
    },
  }
}

export function buildSingleLocaleAlternates(path: string, locale: "en" | "es") {
  const url = `${SITE_URL}${path}`
  return {
    canonical: url,
    languages: {
      [locale]: url,
      "x-default": url,
    },
  }
}

/**
 * Given a `pathname` (with locale prefix stripped, as returned by next-intl's usePathname),
 * returns the localized path (with `/es` stripped for next-intl router.replace) for targetLocale.
 */
export function resolveLocalizedPathname(
  strippedPathname: string,
  targetLocale: "en" | "es"
): string {
  const normalized = strippedPathname === "/" ? "/" : strippedPathname.replace(/\/+$/, "")

  // 1. Check pillar pages
  for (const pillar of PILLAR_ROUTES) {
    const esStripped = pillar.es.replace(/^\/es/, "")
    if (normalized === pillar.en || normalized === esStripped) {
      return targetLocale === "es" ? esStripped : pillar.en
    }
  }

  // 2. Check Engineering Notes index
  if (normalized === "/engineering-notes" || normalized === "/notas-ingenieria") {
    return targetLocale === "es" ? "/notas-ingenieria" : "/engineering-notes"
  }

  // 3. Check Engineering Notes articles
  for (const art of ENGINEERING_ARTICLE_PAIRS) {
    const enPath = art.enSlug ? `/engineering-notes/${art.enSlug}` : null
    const esPath = `/notas-ingenieria/${art.esSlug}`
    if (normalized === enPath || normalized === esPath) {
      if (targetLocale === "es") return esPath
      return enPath ?? "/engineering-notes"
    }
  }

  // Default: same path in target locale
  return normalized
}
