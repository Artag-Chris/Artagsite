import type { Testimonial } from "./contactData";

export const testimonialsEs: Testimonial[] = [
  {
    id: 1,
    name: "Mauricio Marín Jimenez",
    title: "Desarrollador Senior en IKEA",
    linkedinUrl: "https://www.linkedin.com/in/mauriciomarinj/",
    company: "IKEA",
    text: "He seguido el progreso de Christian como desarrollador y puedo decir que es un aprendiz rápido y entiende los principios de programación, y los aplica a su trabajo.",
    relationship: "colleague",
    avatar: { type: "linkedin" },
    featured: true,
    date: "2024-03-15"
  },
  {
    id: 2,
    name: "Alejandro Vargas Méndez",
    title: "Ingeniero QA",
    linkedinUrl: "https://www.linkedin.com/in/jorge-alejandro-vargas-mendez-bb866713a/",
    text: "Christian tiene una habilidad excepcional para escribir código testeable. Trabajar con él en la integración de QA fue fluido: su atención al detalle y comunicación clara hicieron que el descubrimiento y la resolución de bugs fueran increíblemente eficientes. No es solo un desarrollador, es un colaborador que piensa en el panorama completo.",
    relationship: "colleague",
    avatar: { type: "linkedin" },
    featured: true,
  },
  {
    id: 3,
    name: "Jean Fernando Durán Zapata",
    title: "Desarrollador Backend",
    linkedinUrl: "https://www.linkedin.com/in/jean-fernando-duran-zapata/",
    text: "Las decisiones de arquitectura backend de Christian han moldeado cómo escalan nuestros sistemas. Su enfoque sistemático ante problemas complejos y la mentoría de desarrolladores junior muestra una madurez que va más allá de programar. Tenerlo como par técnico ha elevado los estándares de todo nuestro equipo.",
    relationship: "colleague",
    avatar: { type: "linkedin" },
    featured: true,
  },
];
