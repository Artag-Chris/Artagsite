import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getPillarBySlug, PILLARS_DATA, type PillarId } from "@/data/pillars"
import { PillarPageView } from "@/components/pillars/PillarPageView"
import { buildBilingualAlternates, SITE_URL } from "@/lib/seo/routes"

const SERVICIO_SLUGS = [
  "ingenieria-ia-agentes",
  "arquitectura-microservicios",
  "ciberseguridad-aplicaciones",
  "desarrollo-de-software",
] as const

export function generateStaticParams() {
  return SERVICIO_SLUGS.map((slug) => ({ locale: "es", slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pillar = getPillarBySlug(slug, "es")
  if (!pillar) return {}

  return {
    title: pillar.metaTitle,
    description: pillar.metaDescription,
    alternates: buildBilingualAlternates(pillar.alternatePath, pillar.path, "es"),
    openGraph: {
      title: pillar.metaTitle,
      description: pillar.metaDescription,
      type: "website",
      url: `${SITE_URL}${pillar.path}`,
      siteName: "Artag Dev",
      locale: "es_CO",
      images: [{ url: `${SITE_URL}/og-home.png`, width: 1200, height: 630, alt: pillar.metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pillar.metaTitle,
      description: pillar.metaDescription,
      images: [`${SITE_URL}/og-home.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function SpanishServicePillarPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const pillar = getPillarBySlug(slug, "es")
  if (!pillar) notFound()

  if (locale !== "es") {
    permanentRedirect(PILLARS_DATA[pillar.id as PillarId].en.path)
  }

  setRequestLocale("es")
  return <PillarPageView pillar={pillar} />
}
