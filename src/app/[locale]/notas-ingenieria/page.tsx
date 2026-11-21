import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getEngineeringArticlesByLocale } from "@/data/articles"
import { EngineeringNotesIndexView } from "@/components/notes/EngineeringNotesIndexView"
import { buildBilingualAlternates, SITE_URL } from "@/lib/seo/routes"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Notas de Ingeniería en Producción — IA, RAG, Microservicios y AppSec | Artag Dev"
  const description =
    "Artículos técnicos de Artag Dev sobre caché semántico con pgvector, arquitectura RAG multi-tenant con RLS, microservicios con Redis/BullMQ, webhooks HMAC-SHA256, WhatsApp API en Pereira y OWASP LLM."

  return {
    title,
    description,
    alternates: buildBilingualAlternates("/engineering-notes", "/es/notas-ingenieria", "es"),
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/es/notas-ingenieria`,
      siteName: "Artag Dev",
      locale: "es_CO",
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

export default async function NotasIngenieriaIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale !== "es") {
    permanentRedirect("/es/notas-ingenieria")
  }

  setRequestLocale("es")
  const articles = getEngineeringArticlesByLocale("es")
  return <EngineeringNotesIndexView locale="es" articles={articles} />
}
