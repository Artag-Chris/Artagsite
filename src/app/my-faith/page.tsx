"use client";

import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import MyFaithPage from "@/components/sub-sections/my-faith-page";
import { navLinks } from "@/data/navlinks";

export default function Page() {
  return (
  <main>
    <CosmicNavbar links={navLinks} currentPath="/my-faith" />
      <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
        <MyFaithPage />
      </div>
  </main>
  );
}
 