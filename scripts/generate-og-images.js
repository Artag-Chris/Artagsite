const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Crear imagen OG (1200x630)
async function createOGImage() {
  const width = 1200;
  const height = 630;

  // SVG base con tema dark + indigo
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Fondo gradient -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#09090b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#18181b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Fondo -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Decorativo: círculos con blur -->
      <circle cx="100" cy="100" r="150" fill="#4f46e5" opacity="0.1" filter="blur(40px)"/>
      <circle cx="${width - 100}" cy="${height - 100}" r="150" fill="#6366f1" opacity="0.1" filter="blur(40px)"/>
      
      <!-- Logo cuadrado (simulado) -->
      <rect x="100" y="80" width="80" height="80" rx="12" fill="url(#accentGradient)" opacity="0.9"/>
      <text x="140" y="135" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">AD</text>
      
      <!-- Título principal -->
      <text x="${width / 2}" y="240" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
        Artag Dev
      </text>
      
      <!-- Subtítulo -->
      <text x="${width / 2}" y="320" font-family="Arial, sans-serif" font-size="36" fill="#d4d4d8" text-anchor="middle">
        Full Stack Developer
      </text>
      
      <!-- Línea decorativa -->
      <line x1="300" y1="360" x2="${width - 300}" y2="360" stroke="url(#accentGradient)" stroke-width="3" opacity="0.5"/>
      
      <!-- Descripción -->
      <text x="${width / 2}" y="420" font-family="Arial, sans-serif" font-size="28" fill="#a1a1aa" text-anchor="middle">
        Web • Mobile • Modern Tech
      </text>
      
      <!-- Website -->
      <text x="${width / 2}" y="520" font-family="Arial, sans-serif" font-size="24" fill="#818cf8" text-anchor="middle">
        www.artagdev.com.co
      </text>
      
      <!-- Accento esquina -->
      <circle cx="${width - 50}" cy="50" r="40" fill="#4f46e5" opacity="0.2"/>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/og-image.png');
    console.log('✅ OG Image created: public/og-image.png');
  } catch (error) {
    console.error('❌ Error creating OG image:', error);
  }
}

// Crear imagen Twitter (1200x675)
async function createTwitterImage() {
  const width = 1200;
  const height = 675;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Fondo gradient -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#09090b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#18181b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Fondo -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Decorativo: círculos con blur -->
      <circle cx="100" cy="100" r="150" fill="#4f46e5" opacity="0.1" filter="blur(40px)"/>
      <circle cx="${width - 100}" cy="${height - 100}" r="150" fill="#6366f1" opacity="0.1" filter="blur(40px)"/>
      
      <!-- Logo cuadrado (simulado) -->
      <rect x="120" y="100" width="80" height="80" rx="12" fill="url(#accentGradient)" opacity="0.9"/>
      <text x="160" y="155" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">AD</text>
      
      <!-- Título principal -->
      <text x="${width / 2}" y="250" font-family="Arial, sans-serif" font-size="68" font-weight="bold" fill="white" text-anchor="middle">
        Artag Dev
      </text>
      
      <!-- Subtítulo -->
      <text x="${width / 2}" y="330" font-family="Arial, sans-serif" font-size="32" fill="#d4d4d8" text-anchor="middle">
        Full Stack Developer
      </text>
      
      <!-- Línea decorativa -->
      <line x1="300" y1="370" x2="${width - 300}" y2="370" stroke="url(#accentGradient)" stroke-width="3" opacity="0.5"/>
      
      <!-- Descripción -->
      <text x="${width / 2}" y="440" font-family="Arial, sans-serif" font-size="26" fill="#a1a1aa" text-anchor="middle">
        Web • Mobile • Modern Tech
      </text>
      
      <!-- Website -->
      <text x="${width / 2}" y="530" font-family="Arial, sans-serif" font-size="22" fill="#818cf8" text-anchor="middle">
        www.artagdev.com.co
      </text>
      
      <!-- Accento esquina -->
      <circle cx="${width - 50}" cy="50" r="40" fill="#4f46e5" opacity="0.2"/>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/twitter-image.png');
    console.log('✅ Twitter Image created: public/twitter-image.png');
  } catch (error) {
    console.error('❌ Error creating Twitter image:', error);
  }
}

// Ejecutar
async function main() {
  console.log('🎨 Generating OG images...');
  await createOGImage();
  await createTwitterImage();
  console.log('✅ All images created successfully!');
}

main();
