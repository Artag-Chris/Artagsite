import dynamic from "next/dynamic"
import HeaderMain from "@/components/page_components/Headermain";
import Hero from "@/components/page_components/Hero";
import Proyects from "@/components/page_components/Proyects";
import Skills from "@/components/page_components/Skills";
import PageWrapper from "@/components/page-wrapper";

const About = dynamic(() => import("@/components/page_components/About"))
const FAQ = dynamic(() => import("@/components/sub-sections/FAQ").then(m => ({ default: m.FAQ })))
const Testimonials = dynamic(() => import("@/components/page_components/Testimonials"))
const Contact = dynamic(() => import("@/components/page_components/Contact"))
const N8nChat = dynamic(() => import("@/components/chat/N8nChat"))
const FooterMain = dynamic(() => import("@/components/footers/FooterMain"))

import { N8N_CHAT_CONFIG } from "@/config/n8n-chat.config";

export default function Home() {
  return (
    <PageWrapper>
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
           <FAQ />
           <Testimonials /> 
           <Contact />
           <N8nChat {...N8N_CHAT_CONFIG} />
        </main>
        <FooterMain />
      </div>
    </PageWrapper>
  )
}
