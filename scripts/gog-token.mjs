#!/usr/bin/env node
/**
 * One-time helper to obtain a GOG refresh token for the live library integration.
 *
 * Usage: npm run gog:token
 *
 * GOG only accepts its *registered* redirect URI (embed.gog.com), so we can't
 * capture the code on a localhost server. Instead we print the login URL, then
 * read the redirect URL you paste back and pull the `code` out of it — the same
 * manual flow Heroic / gog-cli use.
 *
 * The script exchanges the code for tokens and prints GOG_REFRESH_TOKEN to paste
 * into .env.local. See docs/gog-integration.md.
 *
 * Uses the public GOG Galaxy OAuth client — the same one GOG Galaxy, Heroic,
 * Minigalaxy and lgogdownloader use. Unofficial but stable for ~10 years.
 */

import readline from "node:readline"
import { execFile } from "node:child_process"

const CLIENT_ID = process.env.GOG_CLIENT_ID || "46899977096215655"
const CLIENT_SECRET =
  process.env.GOG_CLIENT_SECRET ||
  "9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9"

// Must match GOG's registered URI exactly, or login rejects with redirect_uri_mismatch.
const REDIRECT_URI = "https://embed.gog.com/on_login_success?origin=client"

const authUrl =
  "https://auth.gog.com/auth" +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  "&response_type=code" +
  "&layout=client2"

function openBrowser(url) {
  try {
    if (process.platform === "win32") {
      execFile("cmd", ["/c", "start", "", url])
    } else if (process.platform === "darwin") {
      execFile("open", [url])
    } else {
      execFile("xdg-open", [url])
    }
  } catch {
    // Best effort only — the URL is printed below as a fallback.
  }
}

/** Accepts a full redirect URL (`...&code=XXX`) or a bare code. */
function extractCode(input) {
  const value = input.trim().replace(/^["']|["']$/g, "")
  if (!value) return null
  const match = value.match(/[?&]code=([^&\s]+)/)
  if (match) return decodeURIComponent(match[1])
  return value
}

async function exchangeCode(code) {
  const tokenUrl =
    "https://auth.gog.com/token" +
    `?client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}` +
    "&grant_type=authorization_code" +
    `&code=${encodeURIComponent(code)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`

  const response = await fetch(tokenUrl)
  const data = await response.json()
  if (!data.refresh_token) throw new Error(JSON.stringify(data))
  return data
}

console.log("\n🔑 GOG — obtención del refresh token\n")
console.log("1) Abre esta URL en tu navegador (intentando abrirla automáticamente):\n")
console.log(`   ${authUrl}\n`)
console.log("2) Inicia sesión con tu cuenta de GOG.")
console.log("3) Al terminar, GOG te llevará a una página de embed.gog.com — puede verse")
console.log("   en blanco o con un error, es normal. Lo importante es la URL de la barra")
console.log("   de direcciones: contiene 'code=...'.")
console.log("4) Copia esa URL COMPLETA y pégala aquí abajo (o pega solo el código).\n")

openBrowser(authUrl)

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question("Pega la URL o el code: ", async (answer) => {
  rl.close()
  const code = extractCode(answer)
  if (!code) {
    console.error("\n❌ No se recibió ningún código. Vuelve a ejecutar `npm run gog:token`.\n")
    process.exit(1)
  }

  try {
    const data = await exchangeCode(code)
    console.log("\n✅ Token generado. Añade esta línea a tu .env.local:\n")
    console.log(`GOG_REFRESH_TOKEN=${data.refresh_token}\n`)
    if (data.user_id) console.log(`(cuenta GOG: ${data.user_id})\n`)
    process.exit(0)
  } catch (error) {
    console.error("\n❌ No se pudo canjear el código:", error.message, "\n")
    console.error("Suele pasar si el código ya se usó o si tardaste demasiado (caduca rápido).")
    console.error("Vuelve a ejecutar `npm run gog:token` y repite el proceso.\n")
    process.exit(1)
  }
})
