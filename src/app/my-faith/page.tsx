"use client";

import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import MyFaithPage from "@/components/sub-sections/my-faith-page";
import { navLinks } from "@/data/navlinks";

export default function Page() {
  return (
  <main className="bg-zinc-950">
    <CosmicNavbar links={navLinks} currentPath="/my-faith" />
      <MyFaithPage />
  </main>
  );
}
 