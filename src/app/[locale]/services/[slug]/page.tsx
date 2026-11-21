import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getPillarBySlug, PILLARS_DATA, type PillarId } from "@/data/pillars"
import { PillarPageView } from "@/components/pillars/PillarPageView"
import { buildBilingualAlternates, SITE_URL } from "@/lib/seo/routes"

const SERVICE_SLUGS = [
  "ai-engineering",
  "microservices-architecture",
  "application-cybersecurity",
  "software-development",
] as const

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ locale: "en", slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pillar = getPillarBySlug(slug, "en")
  if (!pillar) return {}

  return {
    title: pillar.metaTitle,
    description: pillar.metaDescription,
    alternates: buildBilingualAlternates(pillar.path, pillar.alternatePath, "en"),
    openGraph: {
      title: pillar.metaTitle,
      description: pillar.metaDescription,
      type: "website",
      url: `${SITE_URL}${pillar.path}`,
      siteName: "Artag Dev",
      locale: "en_US",
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

export default async function EnglishServicePillarPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const pillar = getPillarBySlug(slug, "en")
  if (!pillar) notFound()

  if (locale === "es") {
    permanentRedirect(PILLARS_DATA[pillar.id as PillarId].es.path)
  }

  setRequestLocale("en")
  return <PillarPageView pillar={pillar} />
}
