import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.artagdev.com.co'

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: 'about-me', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'currentStudies', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: 'my-faith', changeFrequency: 'monthly' as const, priority: 0.3 },
    { path: 'favorites', changeFrequency: 'monthly' as const, priority: 0.3 },
    { path: 'private-servers', changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  return routes.flatMap(({ path, changeFrequency, priority }) => {
    const enUrl = path ? `${baseUrl}/${path}` : baseUrl
    const esUrl = path ? `${baseUrl}/es/${path}` : `${baseUrl}/es`

    return [
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: enUrl,
            es: esUrl,
          },
        },
      },
      {
        url: esUrl,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: enUrl,
            es: esUrl,
          },
        },
      },
    ]
  })
}
