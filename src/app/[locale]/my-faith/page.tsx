import type { Metadata } from "next"
import MyFaithPage from "@/components/sub-sections/my-faith-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"
  const baseUrl = "https://www.artagdev.com.co"

  return {
    title: es ? "Mi Fe | Artag" : "My Faith | Artag",
    description: es
      ? "La fe y los valores que moldean mi trabajo y mi vida como desarrollador. Construyendo con propósito e integridad."
      : "Faith and values that shape my work and life as a developer. Building with purpose and integrity.",
    keywords: [
      "faith and technology",
      "christian developer",
      "purpose-driven development",
      "fe y tecnología",
      "desarrollador cristiano",
      "desarrollo con propósito",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/my-faith` : `${baseUrl}/my-faith`,
      languages: { en: `${baseUrl}/my-faith`, es: `${baseUrl}/es/my-faith` },
    },
    openGraph: {
      title: es ? "Mi Fe | Artag" : "My Faith | Artag",
      description: es
        ? "La fe y los valores que moldean mi trabajo y mi vida como desarrollador."
        : "Faith and values that shape my work and life as a developer.",
      url: es ? `${baseUrl}/es/my-faith` : `${baseUrl}/my-faith`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-faith.png`, width: 1200, height: 630, alt: "Artag — My Faith" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es ? "Mi Fe | Artag" : "My Faith | Artag",
      description: es
        ? "La fe y los valores que moldean mi trabajo y mi vida como desarrollador."
        : "Faith and values that shape my work and life as a developer.",
      images: [`${baseUrl}/og-faith.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: true, follow: true },
  }
}

export default async function Page() {

  return (
  <main className="bg-zinc-950">
      <MyFaithPage />
  </main>
  );
}
