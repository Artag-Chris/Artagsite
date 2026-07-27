"use client"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInViewOnReady } from "@/hooks/useInViewOnReady"
import { UseCasesCarousel } from "../sub-sections/UseCasesCarousel"
import { UseCaseModal } from "../sub-sections/UseCaseModal"
import { ToolsShowcase } from "../sub-sections/ToolsShowcase"
import { UseCase, useCasesData } from "@/data/skillsData"
import { Users, Code2 } from "lucide-react"

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
}

const headerItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

type Tab = "everyone" | "developer"

const tabs: { id: Tab; label: string; icon: React.ElementType; description: string }[] = [
  {
    id: "everyone",
    label: "For Everyone",
    icon: Users,
    description: "I connect your tools, automate the boring stuff, and build what you need — no tech jargon required.",
  },
  {
    id: "developer",
    label: "For Developers",
    icon: Code2,
    description: "Technical deep dives — architecture decisions, performance metrics, and the stack behind the solutions.",
  },
]

function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("everyone")
  const { ref: headerInViewRef, isReady: headerReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })

  const filteredUseCases = useCasesData.filter((uc) => uc.tab === activeTab)

  return (
    <div>
      <section id="skills" className="bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#080808] py-16 sm:py-32 relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]" ref={sectionRef}>
        {/* Subtle background glows */}
        <div className="absolute top-20 right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 bg-amber-500/3 rounded-full blur-3xl pointer-events-none"></div>

        {/* Content - Full Width */}
        <div className="w-full relative z-10">
          {/* Header Section with enhanced typography */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
            <motion.div
              ref={headerInViewRef}
              className="space-y-4 sm:space-y-6"
              variants={headerContainer}
              initial="hidden"
              animate={headerReady ? "visible" : "hidden"}
            >
              <motion.div className="inline-block" variants={headerItem}>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  What I Do
                </span>
              </motion.div>
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
                variants={headerItem}
              >
                How I Can <span className='text-blue-400'>Help</span>
              </motion.h2>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 text-left ${
                      isActive
                        ? "bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/5"
                        : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg transition-colors duration-200 ${
                        isActive ? "bg-blue-500/20" : "bg-white/5"
                      }`}>
                        <Icon className={`w-5 h-5 transition-colors duration-200 ${
                          isActive ? "text-blue-400" : "text-zinc-500"
                        }`} />
                      </div>
                      <span className={`font-bold text-base sm:text-lg transition-colors duration-200 ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}>
                        {tab.label}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed transition-colors duration-200 ${
                      isActive ? "text-zinc-300" : "text-zinc-500"
                    }`}>
                      {tab.description}
                    </p>
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Use Cases Carousel */}
              <div className="w-full px-0 sm:px-0 mb-12 sm:mb-16">
                <UseCasesCarousel
                  useCases={filteredUseCases}
                  onSelectUseCase={setSelectedUseCase}
                />
              </div>

              {/* Tools Showcase Section - only for developers tab */}
              {activeTab === "developer" && (
                <div className="mt-16 sm:mt-24 w-full px-4 sm:px-6 lg:px-8 border-t border-white/5">
                  <div className="max-w-6xl mx-auto py-12 sm:py-16">
                    <ToolsShowcase showLabel={true} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom accent element */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Use Case Modal */}
      {selectedUseCase && (
        <UseCaseModal
          useCase={selectedUseCase}
          isOpen={!!selectedUseCase}
          onClose={() => setSelectedUseCase(null)}
        />
      )}
    </div>
  )
}

export default Skills
