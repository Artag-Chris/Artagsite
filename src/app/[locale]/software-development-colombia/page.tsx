import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { PILLARS_DATA } from "@/data/pillars"
import { PillarPageView } from "@/components/pillars/PillarPageView"
import { buildBilingualAlternates, SITE_URL } from "@/lib/seo/routes"

const pillar = PILLARS_DATA["local-pereira"].en

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export async function generateMetadata(): Promise<Metadata> {
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

export default async function NearshoreColombiaPillarPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale === "es") {
    permanentRedirect(pillar.alternatePath)
  }

  setRequestLocale("en")
  return <PillarPageView pillar={pillar} />
}
