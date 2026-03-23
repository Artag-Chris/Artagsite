import { Github, Linkedin, Twitter, Instagram, Youtube,} from '@styled-icons/simple-icons'

export const socialLinksContact = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Artag-Chris",
      color: "hover:text-[#6e5494]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/artag/",
      color: "hover:text-[#0077b5]",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@Artag888",
      color: "hover:text-[#ff0000]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/yourusername",
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/artagdev/",
      color: "hover:text-[#E1306C]",
    },
  ]

// Testimonials interface
export interface Testimonial {
  id: number
  name: string
  title: string
  linkedinUrl: string
  company?: string
  text: string
  relationship: "colleague" | "manager" | "mentee" | "friend" | "client"
  avatar: {
    type: "linkedin"
    linkedinId?: string
  }
  featured: boolean
  date?: string
}

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mauricio Marín Jimenez",
    title: "Senior Developer at IKEA",
    linkedinUrl: "https://www.linkedin.com/in/mauriciomarinj/",
    company: "IKEA",
    text: "I have been following Christian's progress as a developer and I can say he is a fast learner and understands programming principles, and he applies them to his work.",
    relationship: "colleague",
    avatar: { type: "linkedin" },
    featured: true,
    date: "2024-03-15"
  },
  {
    id: 2,
    name: "Alejandro Vargas Méndez",
    title: "QA Engineer",
    linkedinUrl: "https://www.linkedin.com/in/jorge-alejandro-vargas-mendez-bb866713a/",
    text: "Christian has an exceptional ability to write testable code. Working with him on QA integration was seamless—his attention to detail and clear communication made bug discovery and resolution incredibly efficient. He's not just a developer, he's a collaborator who thinks about the whole picture.",
    relationship: "colleague",
    avatar: { type: "linkedin" },
    featured: true,
  },
  {
    id: 3,
    name: "Jean Fernando Durán Zapata",
    title: "Backend Developer",
    linkedinUrl: "https://www.linkedin.com/in/jean-fernando-duran-zapata/",
    text: "Christian's backend architecture decisions have shaped how our systems scale. His systematic approach to complex problems and mentorship of junior developers shows maturity beyond just coding. Having him as a technical peer has elevated our entire team's standards.",
    relationship: "colleague",
    avatar: { type: "linkedin" },
    featured: true,
  },
]