export interface PersonalLogEntry {
  date: string
  text: string
}

export interface PersonalData {
  hardware: string[]
  readings: string[]
  hobbies: string[]
  log: PersonalLogEntry[]
}

const en: PersonalData = {
  hardware: [
    'Main laptop for development and editing',
    'External monitor for multitasking',
    'Mechanical keyboard and ergonomic mouse',
    'Home server for experiments (when it is on)',
  ],
  readings: [
    'Books and articles on applied AI and distributed systems',
    'Engineering and product podcasts',
    'Music to focus while coding',
  ],
  hobbies: [
    'Hardware and private-server experiments',
    'Video games and emulation',
    'Learning new things outside of work',
  ],
  log: [
    { date: '2026-10-30', text: 'Started the 3-path redesign (B2B, Dev, Personal) of the portfolio.' },
    { date: '2026-10-29', text: 'Published the first case studies and engineering notes.' },
    { date: '2026-10-28', text: 'Reviewed real traffic: most of it was bots. Time to measure for real.' },
  ],
}

const es: PersonalData = {
  hardware: [
    'Laptop principal para desarrollo y edición',
    'Monitor externo para multitarea',
    'Teclado mecánico y mouse ergonómico',
    'Servidor casero para experimentos (cuando está encendido)',
  ],
  readings: [
    'Libros y artículos sobre IA aplicada y sistemas distribuidos',
    'Podcasts de ingeniería y producto',
    'Música para concentrarse mientras programo',
  ],
  hobbies: [
    'Experimentos con hardware y servidores privados',
    'Videojuegos y emulación',
    'Aprender cosas nuevas fuera del trabajo',
  ],
  log: [
    { date: '2026-10-30', text: 'Arranqué el rediseño de 3 caminos (B2B, Dev, Personal) en el portafolio.' },
    { date: '2026-10-29', text: 'Publiqué los primeros casos de estudio y notas de ingeniería.' },
    { date: '2026-10-28', text: 'Revisé el tráfico real: la mayoría era bots. Hora de medir de verdad.' },
  ],
}

export const personalDataByLocale: Record<'en' | 'es', PersonalData> = { en, es }

export function getPersonalData(locale: 'en' | 'es'): PersonalData {
  return personalDataByLocale[locale] ?? personalDataByLocale.en
}
