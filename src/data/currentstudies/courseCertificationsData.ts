export interface CourseCertification {
  id: number
  title: string
  topic: string
  instructor: string
  platform: "Udemy" | "Platzi" | "Coursera" | "Other"
  year: string
  hours?: number
  certUrl: string
  reinforces?: string
}

export interface PendingCourse {
  id: number
  title: string
  topic: string
  instructor: string
  platform: string
  year: string
}

export const courseCertifications: CourseCertification[] = [
  {
    id: 1,
    title: "NestJS: Microservicios",
    topic: "Microservices",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2024",
    certUrl:
      "https://www.udemy.com/certificate/UC-57eae89a-69f7-4b94-8cbc-729ae7c38905/",
    reinforces: "Architecture behind the 13-service artag-services org",
  },
  {
    id: 2,
    title: "Patrones de Diseño",
    topic: "Software Architecture",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2025",
    certUrl:
      "https://www.udemy.com/certificate/UC-1de866e4-e14a-47bf-b376-846a1febd8a6/",
    reinforces: "Design patterns applied across microservices",
  },
  {
    id: 3,
    title: "React Native + Expo",
    topic: "Mobile Development",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2024",
    certUrl:
      "https://www.udemy.com/certificate/UC-da575419-392f-4bd5-b548-a6336b41b096/",
    reinforces: "Mobile development with React Native + Expo",
  },
  {
    id: 4,
    title: "Flutter: De cero a experto",
    topic: "Mobile Development",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2024",
    certUrl:
      "https://www.udemy.com/certificate/UC-caa8836f-7d8b-4dab-9915-dccdd3e30c30/",
    reinforces: "Second mobile stack — Dart / Flutter",
  },
  {
    id: 5,
    title: "n8n — Automation & Workflows",
    topic: "Automation & AI",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2026",
    certUrl:
      "https://www.udemy.com/certificate/UC-604912bb-3d15-4cb5-94b6-f0fd8c60892c/",
    reinforces: "n8n chat widget powering this site",
  },
  {
    id: 6,
    title: "Next.js: El framework de React para producción",
    topic: "Frontend / Full-Stack",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2026",
    certUrl:
      "https://www.udemy.com/certificate/UC-026e5de6-7207-4ba0-939d-96aacf1bf4fd/",
    reinforces: "App Router, server components y edge middleware — este sitio está construido con él",
  },
  {
    id: 7,
    title: "NodeJS: De cero a experto",
    topic: "Backend Development",
    instructor: "Fernando Herrera",
    platform: "Udemy",
    year: "2026",
    certUrl:
      "https://www.udemy.com/certificate/UC-60a14d18-a871-40d8-8975-a0f95e74a533/",
    reinforces: "Backend en Node y microservicios — base de artag-services",
  },
]

export const pendingCourses: PendingCourse[] = [
  {
    id: 1,
    title: "Ethical Hacking — De principiante a profesional",
    topic: "Cybersecurity",
    instructor: "Alejandro Escobar",
    platform: "Udemy",
    year: "2026",
  },
  {
    id: 2,
    title: "Kubernetes Certified Administrator (CKA)",
    topic: "DevOps",
    instructor: "Mumshad Mannambeth",
    platform: "KodeKloud",
    year: "2026",
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect — Associate",
    topic: "Cloud",
    instructor: "Stéphane Maarek",
    platform: "Udemy",
    year: "2026",
  },
  {
    id: 4,
    title: "AZ-104 Microsoft Azure Administrator",
    topic: "Cloud",
    instructor: "Alan Rodrigues",
    platform: "Udemy",
    year: "2027",
  },
]

export function getCourseStats() {
  const total = courseCertifications.length
  const totalHours = courseCertifications.reduce(
    (sum, c) => sum + (c.hours ?? 0),
    0,
  )
  const instructors = new Set(courseCertifications.map((c) => c.instructor)).size
  return { total, totalHours, instructors }
}
