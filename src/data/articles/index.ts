import { AI_ARTICLES } from "./ai-articles"
import { SYSTEMS_ARTICLES } from "./systems-articles"
import { SECURITY_LOCAL_ARTICLES } from "./security-local-articles"
import type { EngineeringArticle } from "./types"

export type { EngineeringArticle, ArticleSection, ArticleCodeBlock, ArticleMetric } from "./types"

export const ALL_ENGINEERING_ARTICLES: readonly EngineeringArticle[] = [
  ...AI_ARTICLES,
  ...SYSTEMS_ARTICLES,
  ...SECURITY_LOCAL_ARTICLES,
]

export function getEngineeringArticlesByLocale(locale: "en" | "es"): EngineeringArticle[] {
  return ALL_ENGINEERING_ARTICLES.filter((article) => article.locale === locale)
}

export function getEngineeringArticleBySlug(
  slug: string,
  locale: "en" | "es"
): EngineeringArticle | undefined {
  return ALL_ENGINEERING_ARTICLES.find(
    (article) => article.locale === locale && article.slug === slug
  )
}

export function getArticleWordCount(article: EngineeringArticle): number {
  const parts: string[] = [
    article.title,
    article.description,
    ...article.intro,
    ...article.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.list ?? []),
      s.code?.snippet ?? "",
    ]),
  ]
  return parts
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}
