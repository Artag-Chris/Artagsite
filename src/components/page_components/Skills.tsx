"use client"
import { useRef } from "react"
import { skillsData } from "@/data/skillsData"
import { SkillCard } from "../sub-sections/SkillCard"
import { GeometricBackground } from "../compontents/GeometricBackground"


function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <section id="skills" className="bg-zinc-900 py-20 relative overflow-hidden" ref={sectionRef}>
        {/* Geometric Background */}
        <GeometricBackground />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Tools of the <span className='text-emerald-500'>Trade</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
            {skillsData.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills
