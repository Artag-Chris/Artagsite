"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { DeferredN8nChat } from "@/components/chat/DeferredN8nChat"

const B2BExperience = dynamic(
  () => import("@/components/b2b/B2BExperience").then((m) => ({ default: m.B2BExperience })),
  { ssr: false }
)
const PersonalExperience = dynamic(
  () => import("@/components/personal/PersonalExperience").then((m) => ({ default: m.PersonalExperience })),
  { ssr: false }
)
const Skills = dynamic(() => import("@/components/page_components/Skills"), { ssr: false })
const Proyects = dynamic(() => import("@/components/page_components/Proyects"), { ssr: false })
const About = dynamic(() => import("@/components/page_components/About"), { ssr: false })
const FAQ = dynamic(
  () => import("@/components/sub-sections/FAQ").then((m) => ({ default: m.FAQ })),
  { ssr: false }
)
const Testimonials = dynamic(() => import("@/components/page_components/Testimonials"), {
  ssr: false,
})
const Contact = dynamic(() => import("@/components/page_components/Contact"), { ssr: false })

function ViewportGate({
  id,
  minHeight = "min-h-[320px]",
  children,
}: {
  id?: string
  minHeight?: string
  children: ReactNode
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const el = hostRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div ref={hostRef} id={!visible ? id : undefined} className={visible ? undefined : minHeight}>
      {visible ? children : null}
    </div>
  )
}

export function BelowFoldSections() {
  return (
    <>
      <ViewportGate minHeight="min-h-[120px]">
        <B2BExperience />
        <PersonalExperience />
      </ViewportGate>

      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <ViewportGate id="skills" minHeight="min-h-[420px]">
          <Skills />
        </ViewportGate>
        <ViewportGate id="projects" minHeight="min-h-[420px]">
          <Proyects />
        </ViewportGate>
        <ViewportGate id="about" minHeight="min-h-[420px]">
          <About />
        </ViewportGate>
      </div>

      <ViewportGate id="faq" minHeight="min-h-[360px]">
        <FAQ />
      </ViewportGate>

      <ViewportGate id="testimonials" minHeight="min-h-[360px]">
        <Testimonials />
      </ViewportGate>

      <ViewportGate id="contact" minHeight="min-h-[480px]">
        <Contact />
      </ViewportGate>

      <DeferredN8nChat />
    </>
  )
}
