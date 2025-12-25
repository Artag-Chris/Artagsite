import FooterMain from "@/components/footers/FooterMain";
import About from "@/components/page_components/About";
import Contact from "@/components/page_components/Contact";
import HeaderMain from "@/components/page_components/Headermain";
import Hero from "@/components/page_components/Hero";
import Proyects from "@/components/page_components/Proyects";
import Skills from "@/components/page_components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <HeaderMain />
      <main className="w-full max-w-[100vw]">
        <Hero />
        
        {/* Smooth transition gradient */}
        <div className="relative h-32 bg-gradient-to-b from-black/50 via-black/30 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <Skills />
          <Proyects />
          <About />
        </div>
        <Contact />
      </main>
      <FooterMain />
    </div>
  )
}
  
