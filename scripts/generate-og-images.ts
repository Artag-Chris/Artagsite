import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const WIDTH = 1200
const HEIGHT = 630

const COLORS = {
  bgDark: '#0a0a0a',
  bgLight: '#111113',
  cyan: '#06b6d4',
  indigo: '#6366f1',
  indigoDark: '#4f46e5',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  white: '#ffffff',
}

interface OgMeta {
  file: string
  monogram: string
  titleLine1: string
  titleA: string
  titleB: string
  titleC: string
  tagline: string
  url: string
}

const IMAGES: OgMeta[] = [
  {
    file: 'og-home.png',
    monogram: 'AD',
    titleLine1: 'I Connect Stuff.',
    titleA: 'I Automate',
    titleB: 'the Boring.',
    titleC: 'Let\'s Build Something.',
    tagline: 'FULL-STACK DEVELOPER & SOFTWARE ARCHITECT',
    url: 'artagdev.com.co',
  },
  {
    file: 'og-about.png',
    monogram: 'LE',
    titleLine1: 'The Architect\'s',
    titleA: 'Ledger',
    titleB: '',
    titleC: 'A journey from uncertainty to mastery.',
    tagline: 'ABOUT ME — DEVELOPER JOURNEY 2006 · 2024',
    url: 'artagdev.com.co/about-me',
  },
  {
    file: 'og-studies.png',
    monogram: 'LS',
    titleLine1: 'Always Learning.',
    titleA: 'Microservices.',
    titleB: 'React Native.',
    titleC: 'Cloud. Serverless. GraphQL.',
    tagline: 'CURRENT STUDIES — FULL-STACK ENGINEERING',
    url: 'artagdev.com.co/currentStudies',
  },
  {
    file: 'og-faith.png',
    monogram: 'BU',
    titleLine1: 'Built with',
    titleA: 'Purpose',
    titleB: '',
    titleC: 'Faith, values & integrity behind the code.',
    tagline: 'MY FAITH — DEVELOPMENT WITH MEANING',
    url: 'artagdev.com.co/my-faith',
  },
  {
    file: 'og-favorites.png',
    monogram: 'GM',
    titleLine1: 'A Life',
    titleA: 'in Games',
    titleB: '',
    titleC: 'The titles that shaped a developer.',
    tagline: 'FAVORITES — PERSONAL PICKS & INSPIRATION',
    url: 'artagdev.com.co/favorites',
  },
  {
    file: 'og-servers.png',
    monogram: 'SR',
    titleLine1: 'Private',
    titleA: 'Servers',
    titleB: '',
    titleC: 'Guides & real infrastructure experience.',
    tagline: 'RESOURCES — GAME SERVER ADMINISTRATION',
    url: 'artagdev.com.co/private-servers',
  },
]

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSvg(meta: OgMeta): string {
  const { monogram, titleLine1, titleA, titleB, titleC, tagline, url } = meta
  const gridSize = 40

  let grid = ''
  for (let x = 0; x <= WIDTH; x += gridSize) {
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="#6366f1" stroke-opacity="0.07" stroke-width="1"/>`
  }
  for (let y = 0; y <= HEIGHT; y += gridSize) {
    grid += `<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" stroke="#6366f1" stroke-opacity="0.07" stroke-width="1"/>`
  }

  let titleBlock = ''
  if (titleA) {
    titleBlock += `<text x="80" y="300" font-family="'Segoe UI',sans-serif" font-size="84" font-weight="700" letter-spacing="-1" fill="#ffffff">${escapeXml(titleA)}</text>`
  }
  if (titleB) {
    titleBlock += `<text x="80" y="392" font-family="'Segoe UI',sans-serif" font-size="84" font-weight="700" letter-spacing="-1" fill="#06b6d4">${escapeXml(titleB)}</text>`
  }
  if (titleC) {
    titleBlock += `<text x="80" y="${titleB ? 476 : 392}" font-family="'Segoe UI',sans-serif" font-size="30" font-weight="400" fill="#a1a1aa">${escapeXml(titleC)}</text>`
  }

  return `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.bgDark}"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>
    <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="${COLORS.indigo}"/>
    </linearGradient>
    <radialGradient id="cyanGlow" cx="0" cy="0" r="600" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${COLORS.cyan}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${COLORS.cyan}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="indigoGlow" cx="1200" cy="630" r="620" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${COLORS.indigo}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${COLORS.indigo}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>

  <circle cx="100" cy="100" r="260" fill="url(#cyanGlow)" filter="url(#soft)"/>
  <circle cx="1100" cy="530" r="280" fill="url(#indigoGlow)" filter="url(#soft)"/>

  <g>${grid}</g>

  <rect x="80" y="88" width="64" height="64" rx="14" fill="url(#indigoGrad)"/>
  <text x="112" y="132" font-family="'Segoe UI',sans-serif" font-size="34" font-weight="700" fill="${COLORS.white}" text-anchor="middle">${escapeXml(monogram)}</text>

  <text x="164" y="130" font-family="'Segoe UI',sans-serif" font-size="26" font-weight="700" fill="${COLORS.white}">Artag</text>
  <text x="232" y="130" font-family="'Segoe UI',sans-serif" font-size="26" font-weight="400" fill="${COLORS.zinc500}">Dev</text>

  <rect x="80" y="180" width="1040" height="2" fill="url(#indigoGrad)" opacity="0.35"/>

  <text x="80" y="238" font-family="'Segoe UI',sans-serif" font-size="40" font-weight="600" letter-spacing="-0.5" fill="#52525b">${escapeXml(titleLine1)}</text>

  ${titleBlock}

  <rect x="80" y="${titleA ? 512 : 460}" width="48" height="4" rx="2" fill="${COLORS.cyan}" opacity="0.9"/>

  <text x="80" y="${titleA ? 560 : titleC ? 536 : 520}" font-family="Consolas,monospace" font-size="19" font-weight="400" letter-spacing="1.5" fill="${COLORS.cyan}">${escapeXml(tagline)}</text>

  <text x="80" y="${titleA ? 596 : 574}" font-family="'Segoe UI',sans-serif" font-size="20" font-weight="500" fill="${COLORS.zinc500}">${escapeXml(url)}</text>

  <rect x="0" y="${HEIGHT - 6}" width="${WIDTH}" height="6" fill="url(#indigoGrad)" opacity="0.5"/>
</svg>
  `
}

async function main(): Promise<void> {
  const outDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  for (const meta of IMAGES) {
    const svg = buildSvg(meta)
    const target = path.join(outDir, meta.file)
    await sharp(Buffer.from(svg)).png({ quality: 95, compressionLevel: 8 }).toFile(target)
    const stat = fs.statSync(target)
    console.log(`✅ ${meta.file}  (${(stat.size / 1024).toFixed(1)} KB)`)
  }
  console.log('\n🎨 6 OG images created in /public')
}

main().catch((err: Error) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})