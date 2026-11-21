import { MetadataRoute } from "next"
import { projectsByLocale } from "@/data/proyectData"
import {
  ENGINEERING_ARTICLE_PAIRS,
  PILLAR_ROUTES,
  SITE_URL,
} from "@/lib/seo/routes"

// Static routes that share the same slug across locales
const sharedStaticRoutes = [
  { path: "", lastModified: "2026-11-21", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "projects", lastModified: "2026-10-29", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "about-me", lastModified: "2026-09-29", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "labs", lastModified: "2026-10-31", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "currentStudies", lastModified: "2026-10-31", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "my-faith", lastModified: "2026-09-29", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "favorites", lastModified: "2026-09-29", changeFrequency: "monthly" as const, priority: 0.3 },
]

const projectRoutes = projectsByLocale.en.map((project) => ({
  path: `projects/${project.slug}`,
  lastModified: project.lastUpdated,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}))

function toSharedEntry(
  path: string,
  lastModified: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  const enUrl = path ? `${SITE_URL}/${path}` : SITE_URL
  const esUrl = path ? `${SITE_URL}/es/${path}` : `${SITE_URL}/es`

  return [
    {
      url: enUrl,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: enUrl,
          es: esUrl,
          "x-default": enUrl,
        },
      },
    },
    {
      url: esUrl,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: enUrl,
          es: esUrl,
          "x-default": enUrl,
        },
      },
    },
  ]
}

function toLocalizedPair(
  enPath: string,
  esPath: string,
  lastModified: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  const enUrl = `${SITE_URL}${enPath}`
  const esUrl = `${SITE_URL}${esPath}`

  return [
    {
      url: enUrl,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: enUrl,
          es: esUrl,
          "x-default": enUrl,
        },
      },
    },
    {
      url: esUrl,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: enUrl,
          es: esUrl,
          "x-default": enUrl,
        },
      },
    },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sharedEntries = [...sharedStaticRoutes, ...projectRoutes].flatMap((route) =>
    toSharedEntry(route.path, route.lastModified, route.changeFrequency, route.priority)
  )

  // 10 Bilingual Pillar Pages (5 ES + 5 EN)
  const pillarEntries = PILLAR_ROUTES.flatMap((pillar) =>
    toLocalizedPair(pillar.en, pillar.es, pillar.lastModified, "weekly", pillar.priority)
  )

  // Engineering Notes Hub Index
  const notesHubEntries = toLocalizedPair(
    "/engineering-notes",
    "/es/notas-ingenieria",
    "2026-11-21",
    "weekly",
    0.85
  )

  // 6 Technical Engineering Articles (5 bilingual pairs + 1 ES-only Pereira local article)
  const articleEntries: MetadataRoute.Sitemap = ENGINEERING_ARTICLE_PAIRS.flatMap((art) => {
    const esPath = `/es/notas-ingenieria/${art.esSlug}`
    if (art.enSlug) {
      return toLocalizedPair(
        `/engineering-notes/${art.enSlug}`,
        esPath,
        art.dateModified,
        "monthly",
        0.8
      )
    }
    const esUrl = `${SITE_URL}${esPath}`
    return [
      {
        url: esUrl,
        lastModified: new Date(art.dateModified),
        changeFrequency: "monthly" as const,
        priority: 0.85,
        alternates: {
          languages: {
            es: esUrl,
            "x-default": esUrl,
          },
        },
      },
    ]
  })

  return [...sharedEntries, ...pillarEntries, ...notesHubEntries, ...articleEntries]
}
