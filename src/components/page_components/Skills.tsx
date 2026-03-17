"use client"
import { useRef, useState } from "react"
import { skillsData, type Skill } from "@/data/skillsData"
import { SkillCard } from "../sub-sections/SkillCard"
import { SkillModal } from "../sub-sections/SkillModal"
import { GeometricBackground } from "../compontents/GeometricBackground"

function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (skill: Skill) => {
    setSelectedSkill(skill)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedSkill(null), 300)
  }

  return (
    <div>
      <section id="skills" className="w-full bg-gradient-to-b from-black via-black to-[#0a0a0a] py-16 sm:py-32 relative overflow-hidden" ref={sectionRef}>
        {/* Animated background grid - more prominent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Enhanced background glows with animation */}
        <div className="absolute top-20 right-1/4 w-1/2 h-1/2 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-cyan-600/4 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>

        {/* Content - Full Width */}
        <div className="w-full relative z-10">
          {/* Header Section with enhanced typography */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                  Architecture & Automation
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Tools of the <span className='text-cyan-400 drop-shadow-lg' style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>Trade</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-4xl leading-relaxed">
                I leverage these technologies and platforms to architect scalable systems and build powerful automation solutions. 
                From n8n workflows to cloud infrastructure, these tools enable elegant technical solutions that solve real problems.
              </p>
            </div>
          </div>

          {/* Skills Grid - Full Width with Padding */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Mobile Carousel */}
            <div className="md:hidden w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              <div className="flex gap-4 pb-6 px-1">
                {skillsData.map((skill, index) => (
                  <div key={index} className="snap-start shrink-0 w-[280px]">
                    <SkillCard skill={skill} index={index} onCardClick={handleCardClick} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <p className="text-gray-500 text-sm font-medium">Tap card to see more →</p>
              </div>
            </div>

            {/* Desktop Grid - Responsive with improved spacing */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 text-white max-w-7xl mx-auto">
              {skillsData.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} onCardClick={handleCardClick} />
              ))}
            </div>
          </div>

          {/* Bottom accent element */}
          <div className="mt-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Skill Modal */}
      <SkillModal skill={selectedSkill} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Skills
