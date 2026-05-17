import type { Metadata } from "next"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import MyFaithPage from "@/components/sub-sections/my-faith-page"
import { navLinks } from "@/data/navlinks"

export const metadata: Metadata = {
  title: "My Faith | Artag",
  description:
    "Faith and values that shape my work and life as a developer. Building with purpose and integrity.",
}

export default function Page() {
  return (
  <main className="bg-zinc-950">
    <CosmicNavbar links={navLinks} currentPath="/my-faith" />
      <MyFaithPage />
  </main>
  );
}
