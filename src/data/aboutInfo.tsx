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
            <h4 className="text-white font-medium">Full Stack Developer</h4>
            <p className="text-indigo-400 text-sm">Finova • Dec 2024 - Present</p>
            <p className="text-zinc-400 text-sm mt-2">
              Promoted to Full Stack Developer after demonstrating strong skills in both frontend and backend development.
              Working with React, Node.js, and various database technologies.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-indigo-500/30">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1"></div>
            <h4 className="text-white font-medium">React Developer</h4>
            <p className="text-indigo-400 text-sm">Finova • aug 2024 - Dec 2024</p>
            <p className="text-zinc-400 text-sm mt-2">
              Developed and maintained web applications using React.js, Redux, and modern frontend technologies.
              Contributed to improving application performance and user experience.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-indigo-500/30">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1"></div>
            <h4 className="text-white font-medium">Freelance Web Developer</h4>
            <p className="text-indigo-400 text-sm">Various Platforms • 2021 - 2024</p>
            <p className="text-zinc-400 text-sm mt-2">
              Worked on diverse projects across multiple online platforms, building responsive websites and web applications for clients worldwide.
              Gained experience with different tech stacks and client requirements.
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
              Specialized training in modern web development technologies and frameworks.
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
              <h4 className="text-white text-sm font-medium">Pizza Champion</h4>
              <p className="text-zinc-400 text-xs">Won a pizza for telling the most jokes to colleagues (2020)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-indigo-500/10 rounded-full text-indigo-500">
              <Code className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-white text-sm font-medium">Fast Learner Award</h4>
              <p className="text-zinc-400 text-xs">Recognized for quickly mastering new technologies</p>
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