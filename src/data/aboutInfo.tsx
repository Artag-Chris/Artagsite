import { Award, Briefcase, GraduationCap, Code } from "lucide-react"

export const tabs: TabItem[] = [
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      content: (
        <div className="space-y-4">
          <div className="relative pl-6 border-l-2 border-indigo-500/30">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1"></div>
            <h4 className="text-white font-medium">Full Stack Developer & Software Architect</h4>
            <p className="text-indigo-400 text-sm">Finova • Dec 2024 - Present</p>
            <p className="text-zinc-400 text-sm mt-2">
              Architecting scalable full-stack solutions across frontend and backend systems. Contributing to system design decisions, infrastructure optimization, and automation of deployment workflows. Building with React, Node.js, and cloud technologies.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-indigo-500/30">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1"></div>
            <h4 className="text-white font-medium">React & Frontend Architecture</h4>
            <p className="text-indigo-400 text-sm">Finova • Aug 2024 - Dec 2024</p>
            <p className="text-zinc-400 text-sm mt-2">
              Built component architectures and frontend systems using React.js and modern tools. Focused on scalability, performance optimization, and maintainable code structures that support growing product complexity.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-indigo-500/30">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1"></div>
            <h4 className="text-white font-medium">Freelance Architecture & Development</h4>
            <p className="text-indigo-400 text-sm">Various Clients • 2021 - 2024</p>
            <p className="text-zinc-400 text-sm mt-2">
              Designed and built technical solutions across diverse tech stacks. Worked with startups and enterprises to architect systems, optimize workflows, and deliver production applications. Gained expertise in different architectural patterns and client requirements.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      content: (
        <div className="space-y-4">
          <div className="relative pl-6 border-l-2 border-indigo-500/30">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1"></div>
            <h4 className="text-white font-medium">Web Application Development Program</h4>
            <p className="text-indigo-400 text-sm">Universidad de Bucaramanga • 2023</p>
            <p className="text-zinc-400 text-sm mt-2">
              Comprehensive training in modern web application architecture, design patterns, and full-stack development frameworks.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-indigo-500/10 rounded-full text-indigo-500">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-white text-sm font-medium">System Architecture Design</h4>
              <p className="text-zinc-400 text-xs">Designed scalable architectures supporting growth from 0 to 500+ concurrent users</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-indigo-500/10 rounded-full text-indigo-500">
              <Code className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-white text-sm font-medium">Automation Solutions</h4>
              <p className="text-zinc-400 text-xs">Engineered automation workflows saving teams 50+ hours monthly through n8n and custom solutions</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  export interface TabItem {
    id: string
    label: string
    icon: React.ElementType
    content: React.ReactNode
  }