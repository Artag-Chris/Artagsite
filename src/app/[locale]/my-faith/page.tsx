import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import MyFaithPage from "@/components/sub-sections/my-faith-page"
import { navLinks } from "@/data/navlinks"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "es" ? "Mi Fe | Artag" : "My Faith | Artag",
    description:
      locale === "es"
        ? "La fe y los valores que moldean mi trabajo y mi vida como desarrollador. Construyendo con propósito e integridad."
        : "Faith and values that shape my work and life as a developer. Building with purpose and integrity.",
  }
}

export default async function Page() {
  const locale = await getLocale()
  const links = navLinks[locale as "en" | "es"] ?? navLinks.en

  return (
  <main className="bg-zinc-950">
    <CosmicNavbar links={links} currentPath="/my-faith" />
      <MyFaithPage />
  </main>
  );
}
