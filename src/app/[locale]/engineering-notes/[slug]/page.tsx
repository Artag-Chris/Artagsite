import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import {
  getEngineeringArticleBySlug,
  getEngineeringArticlesByLocale,
} from "@/data/articles"
import { EngineeringNoteDetailView } from "@/components/notes/EngineeringNoteDetailView"
import {
  buildBilingualAlternates,
  buildSingleLocaleAlternates,
  clampMetaDescription,
  SITE_URL,
} from "@/lib/seo/routes"

export function generateStaticParams() {
  return getEngineeringArticlesByLocale("en").map((article) => ({
    locale: "en",
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getEngineeringArticleBySlug(slug, "en")
  if (!article) return {}

  const title = `${article.title} | Artag Dev`
  const description = clampMetaDescription(article.description)
  const enPath = `/engineering-notes/${article.slug}`
  const alternates = article.alternateSlug
    ? buildBilingualAlternates(enPath, `/es/notas-ingenieria/${article.alternateSlug}`, "en")
    : buildSingleLocaleAlternates(enPath, "en")

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}${enPath}`,
      siteName: "Artag Dev",
      locale: "en_US",
      images: [{ url: `${SITE_URL}/og-home.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-home.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function EngineeringNoteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const article = getEngineeringArticleBySlug(slug, "en")
  if (!article) notFound()

  if (locale === "es") {
    permanentRedirect(
      article.alternateSlug
        ? `/es/notas-ingenieria/${article.alternateSlug}`
        : "/es/notas-ingenieria"
    )
  }

  setRequestLocale("en")
  return <EngineeringNoteDetailView article={article} />
}
