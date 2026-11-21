export interface ArticleCodeBlock {
  language: string
  filename?: string
  snippet: string
}

export interface ArticleSection {
  id: string
  heading: string
  paragraphs: string[]
  list?: string[]
  code?: ArticleCodeBlock
}

export interface ArticleMetric {
  value: string
  label: string
}

export interface EngineeringArticle {
  id: string
  locale: "en" | "es"
  slug: string
  alternateSlug?: string
  title: string
  description: string
  category: string
  datePublished: string
  dateModified: string
  readingTime: number
  tags: string[]
  pillarPath: string
  pillarLabel: string
  metrics: ArticleMetric[]
  intro: string[]
  sections: ArticleSection[]
}
