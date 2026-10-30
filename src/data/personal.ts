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

export const personalData: PersonalData = {
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
