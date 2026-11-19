import Hero from "@/components/page_components/Hero"
import PageWrapper from "@/components/page-wrapper"
import { BelowFoldSections } from "@/components/home/BelowFoldSections"

export default function Home() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-clip">
        <main className="w-full max-w-[100vw]">
          <Hero />
          <BelowFoldSections />
        </main>
      </div>
    </PageWrapper>
  )
}
