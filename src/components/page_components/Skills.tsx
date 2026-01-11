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
      <section id="skills" className="w-full bg-zinc-950 py-16 sm:py-24 relative overflow-hidden" ref={sectionRef}>
        {/* Geometric Background */}
        <GeometricBackground />

        {/* Content - Full Width */}
        <div className="w-full relative z-10">
          {/* Header Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Tools of the <span className='text-indigo-500'>Trade</span>
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              Every day, I leverage these powerful technologies and platforms to craft seamless digital experiences. 
              From frontend frameworks to backend infrastructure, these are the tools that transform ideas into 
              production-ready solutions. Each one plays a crucial role in delivering excellence.
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
                <p className="text-zinc-400 text-sm">Tap card to see more →</p>
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
