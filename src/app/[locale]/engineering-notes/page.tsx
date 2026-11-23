import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getEngineeringArticlesByLocale } from "@/data/articles"
import { EngineeringNotesIndexView } from "@/components/notes/EngineeringNotesIndexView"
import { buildBilingualAlternates, SITE_URL } from "@/lib/seo/routes"

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Production Engineering Notes — AI, RAG, Microservices & AppSec | Artag Dev"
  const description =
    "Production engineering notes by Artag Dev: pgvector semantic caching, multi-tenant RAG with RLS, Redis/BullMQ microservices, HMAC webhooks, and OWASP LLM."

  return {
    title,
    description,
    alternates: buildBilingualAlternates("/engineering-notes", "/es/notas-ingenieria", "en"),
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/engineering-notes`,
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

export default async function EngineeringNotesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale === "es") {
    permanentRedirect("/es/notas-ingenieria")
  }

  setRequestLocale("en")
  const articles = getEngineeringArticlesByLocale("en")
  return <EngineeringNotesIndexView locale="en" articles={articles} />
}
