import type { Metadata } from "next"
import ResourcesPage from "@/components/sub-sections/resources-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  const baseUrl = "https://www.artagdev.com.co"

  return {
    title: es
      ? "Infraestructura Personal y Herramientas | Artag"
      : "Personal Infrastructure & Developer Tools | Artag",
    description: es
      ? "Mis proyectos de infraestructura personal, servicios auto-alojados y las herramientas y sitios web que uso a diario para desarrollar y desplegar software."
      : "My personal server infrastructure projects, self-hosted services, and the daily tools and websites I use to build, deploy, and maintain modern software.",
    keywords: [
      "self-hosted infrastructure",
      "developer tools",
      "personal servers",
      "web development resources",
      "infraestructura personal",
      "servicios auto-alojados",
      "herramientas desarrollo",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/private-servers` : `${baseUrl}/private-servers`,
      languages: { en: `${baseUrl}/private-servers`, es: `${baseUrl}/es/private-servers` },
    },
    openGraph: {
      title: es
        ? "Infraestructura Personal y Herramientas | Artag"
        : "Personal Infrastructure & Developer Tools | Artag",
      description: es
        ? "Proyectos de infraestructura personal, servicios auto-alojados y herramientas de desarrollo diario."
        : "Personal server infrastructure projects, self-hosted services, and daily developer tools.",
      url: es ? `${baseUrl}/es/private-servers` : `${baseUrl}/private-servers`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-servers.png`, width: 1200, height: 630, alt: "Artag — Personal Infrastructure & Tools" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es
        ? "Infraestructura Personal y Herramientas | Artag"
        : "Personal Infrastructure & Developer Tools | Artag",
      description: es
        ? "Proyectos de infraestructura personal, servicios auto-alojados y herramientas de desarrollo diario."
        : "Personal server infrastructure projects, self-hosted services, and daily developer tools.",
      images: [`${baseUrl}/og-servers.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: false, follow: true },
  }
}

export default async function PrivateServersPage() {
    return (
        <main className="bg-zinc-900 min-h-screen">
            <div className="container mx-auto px-4 py-10 pt-32 md:pt-40">
                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
                    <ResourcesPage />
                </div>
            </div>
        </main>
    )
}
