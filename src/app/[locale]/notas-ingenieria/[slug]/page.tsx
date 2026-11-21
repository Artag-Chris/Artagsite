import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import {
  getEngineeringArticleBySlug,
  getEngineeringArticlesByLocale,
} from "@/data/articles"
import { EngineeringNoteDetailView } from "@/components/notes/EngineeringNoteDetailView"
import { buildBilingualAlternates, buildSingleLocaleAlternates, SITE_URL } from "@/lib/seo/routes"

export function generateStaticParams() {
  return getEngineeringArticlesByLocale("es").map((article) => ({
    locale: "es",
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getEngineeringArticleBySlug(slug, "es")
  if (!article) return {}

  const title = `${article.title} | Artag Dev`
  const esPath = `/es/notas-ingenieria/${article.slug}`
  const alternates = article.alternateSlug
    ? buildBilingualAlternates(`/engineering-notes/${article.alternateSlug}`, esPath, "es")
    : buildSingleLocaleAlternates(esPath, "es")

  return {
    title,
    description: article.description,
    alternates,
    openGraph: {
      title,
      description: article.description,
      type: "article",
      url: `${SITE_URL}${esPath}`,
      siteName: "Artag Dev",
      locale: "es_CO",
      images: [{ url: `${SITE_URL}/og-home.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [`${SITE_URL}/og-home.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function NotaIngenieriaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const article = getEngineeringArticleBySlug(slug, "es")
  if (!article) notFound()

  if (locale !== "es") {
    permanentRedirect(
      article.alternateSlug
        ? `/engineering-notes/${article.alternateSlug}`
        : `/es/notas-ingenieria/${article.slug}`
    )
  }

  setRequestLocale("es")
  return <EngineeringNoteDetailView article={article} />
}
