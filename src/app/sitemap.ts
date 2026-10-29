import { MetadataRoute } from 'next'
import { projectsByLocale } from '@/data/proyectData'
import { notesByLocale } from '@/data/notes'

const baseUrl = 'https://www.artagdev.com.co'

// Static routes with the date the content actually changed.
// Never use new Date(): a fresh lastmod on every request teaches Google to
// ignore the signal for the whole sitemap.
const staticRoutes = [
  { path: '', lastModified: '2026-10-29', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: 'projects', lastModified: '2026-10-29', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: 'engineering-notes', lastModified: '2026-10-29', changeFrequency: 'weekly' as const, priority: 0.85 },
  { path: 'about-me', lastModified: '2026-09-29', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'currentStudies', lastModified: '2026-09-21', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: 'my-faith', lastModified: '2026-09-29', changeFrequency: 'monthly' as const, priority: 0.3 },
  { path: 'favorites', lastModified: '2026-09-29', changeFrequency: 'monthly' as const, priority: 0.3 },
  // /private-servers is intentionally excluded: it is public but noindex.
]

// Generated from the project catalog so adding a project updates the sitemap.
const projectRoutes = projectsByLocale.en.map((project) => ({
  path: `projects/${project.slug}`,
  lastModified: project.lastUpdated,
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}))

const noteRoutes = notesByLocale.en.map((note) => ({
  path: `engineering-notes/${note.slug}`,
  lastModified: note.dateModified,
  changeFrequency: 'monthly' as const,
  priority: 0.75,
}))

function toEntry(
  path: string,
  lastModified: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number
): MetadataRoute.Sitemap {
  const enUrl = path ? `${baseUrl}/${path}` : baseUrl
  const esUrl = path ? `${baseUrl}/es/${path}` : `${baseUrl}/es`

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
          'x-default': enUrl,
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
          'x-default': enUrl,
        },
      },
    },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...projectRoutes, ...noteRoutes].flatMap((route) =>
    toEntry(route.path, route.lastModified, route.changeFrequency, route.priority)
  )
}
