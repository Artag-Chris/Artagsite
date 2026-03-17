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
      <section id="skills" className="w-full bg-black py-16 sm:py-24 relative overflow-hidden" ref={sectionRef}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, #6366f1 1px, transparent 1px), linear-gradient(0deg, #6366f1 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Background glows */}
        <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Content - Full Width */}
        <div className="w-full relative z-10">
          {/* Header Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Tools of the <span className='text-cyan-400'>Trade</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              I leverage these technologies and platforms to architect scalable systems and build powerful automation solutions. 
              From n8n workflows to cloud infrastructure, these tools enable elegant technical solutions that solve real problems.
            </p>
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
              <div className="flex justify-center mt-4">
                <p className="text-gray-500 text-sm">Tap card to see more →</p>
              </div>
            </div>

            {/* Desktop Grid - Responsive */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-white max-w-7xl mx-auto">
              {skillsData.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} onCardClick={handleCardClick} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Modal */}
      <SkillModal skill={selectedSkill} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Skills
