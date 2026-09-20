## 🎮 Estado actual: Steam + Epic en vivo · GOG pendiente

- **Steam** → activa y funcionando (librería real + horas + logros, API oficial).
- **Epic** → activa en código (librería real vía API del launcher, **sin horas** de juego porque
  Epic no expone playtime). Falta solo poner tu `EPIC_REFRESH_TOKEN` (sección 3 abajo).
- **GOG** → pendiente: no hay API pública y el acceso a la cuenta no está resuelto. El tab de
  GOG aparece solo cuando haya juegos en su lista curada (`src/lib/games/config.ts`).

El tab de **Epic desaparece y reaparece solo**: con token → juegos en vivo; sin token → se oculta.

---

## 🔑 Configuración de claves — Librería de Juegos

Para la integración en vivo de `/favorites` necesitas claves **gratuitas**. Unas en `.env.local`
hacen la diferencia; sin ninguna la página funciona igual (modo fallback con tus favoritos estáticos).

---

## 1️⃣ Steam Web API Key (librería real + horas + logros)

**Link:** https://steamcommunity.com/dev/apikey

### Pasos
1. Inicia sesión en Steam (necesitas cuenta + Steam Guard)
2. Entra en **https://steamcommunity.com/dev/apikey**
3. En el campo **"Domain Name"** escribe: `artagdev.com.co`
   - ⚠️ No importa cuál pongas — es solo un requisito del formulario
4. Acepta los términos y haz clic en **"Register"**
5. Aparecerá tu clave al instante (32 caracteres hex)

### Requisito: perfil público
Para que la API devuelva tu librería, tu perfil debe ser **público**:

- **Link:** https://steamcommunity.com/my/edit/settings
- En **"My Profile"** → **"Privacy Settings"**:
  - ✅ **"Public"** en `Game details` (imprescindible)
  - ✅ **"Public"** en `Profile` y `Inventory` (recomendado)
  - ✅ **"Public"** en `Achievements` (para ver logros)

⚠️ Si tu perfil está en privado, Steam devuelve vacío y la página cae al fallback elegante (no se rompe).

---

## 2️⃣ Tu Steam ID (opcional — pero recomendado)

**Link:** https://steamidfinder.com/

### Cómo
1. Pega tu URL de perfil (ej. `https://steamcommunity.com/id/Artag-chris/`)
2. Copia el **"SteamID64"** (número de 17 dígitos, ej. `76561198123456789`)

> **Opcional**: si no pones `STEAM_ID`, la página resuelve tu vanity URL (`Artag-chris`, configurada en `src/lib/games/config.ts`) automáticamente. Ponerlo evita una llamada extra y fallos si cambias el nombre de perfil.

---

## 3️⃣ Epic Games — refresh token (librería real, sin horas)

Epic **no tiene API pública** de librería. El sitio usa los endpoints internos del launcher
(los mismos que Legendary/Heroic/Playnite). Para obtener el token necesitas Python + Legendary
una sola vez:

### Pasos (Windows)
1. **Instala Python** desde la Microsoft Store (búscalo como *"Python 3"* → *"Get"*).
   Reabre la terminal para que tome el PATH.
2. Instala Legendary:
   ```powershell
   pip install legendary
   ```
3. Inicia sesión (abre el navegador para loguear con tu cuenta de Epic):
   ```powershell
   legendary auth
   ```
4. Copia el token. En Windows está en:
   ```
   %USERPROFILE%\.config\legendary\user.json
   ```
   Abrí ese archivo y copiá el valor de **`refresh_token`** (entre comillas, no hagas caso a
   `access_token`).
5. Agrégalo a tu `.env.local`:
   ```env
   EPIC_REFRESH_TOKEN=pega_aqui_tu_refresh_token
   ```
6. Reinicia el dev server (`npm run dev`).

### Notas honestas
- ⚠️ **Trátalo como una contraseña**: ese token da acceso a tu cuenta de Epic.
  Si algún día lo compartes por error, revócalo en la cuenta de Epic (Session management →
  "Sign out of all sessions") y genera uno nuevo.
- **No hay horas de juego** en Epic (no existen ni pública ni privadamente) → las tarjetas de
  Epic no muestran el contador de horas. No es un bug.
- Los **logros** de Epic existen vía GraphQL y están documentados en `docs/epic-integration.md`
  como siguiente paso (todavía no implementado).
- Los endpoints son **no oficiales** y pueden cambiar sin aviso. Si el token deja de funcionar
  y la página se queda sin juegos de Epic, simplemente corre `legendary auth` de nuevo.

---

## 4️⃣ RAWG API Key (opcional — solo para la lista curada de GOG)

**Link:** https://rawg.io/apidocs

### Pasos
1. Ve a **https://rawg.io** y crea una cuenta (gratis) — email o Google
2. Inicia sesión y entra en **https://rawg.io/apidocs** (o **https://rawg.io/settings/api** → "Generate API key")
3. Tu API key queda visible en esa página (formato alphanumeric)

### Límites
- **160 peticiones por minuto** (free tier) — más que suficiente
- La página cachea las respuestas 60 min, así que el consumo real es mínimo

> Cuando recuperes el acceso a **GOG**, agrega los slugs de tus juegos en
> `src/lib/games/config.ts` (sección `curated`) para que el tab de GOG aparezca.

---

## 5️⃣ Dónde colocarlas

Edita tu **`.env.local`** (raíz del proyecto, ya existe y está en `.gitignore`):

```env
# ── Gaming Library (/favorites) ──
STEAM_WEB_API_KEY=tu_clave_de_steam_32_caracteres
STEAM_ID=7656119XXXXXXXXXXX
EPIC_REFRESH_TOKEN=tu_refresh_token_de_epic

# Opcional — solo para curar GOG
RAWG_API_KEY=tu_clave_de_rawg_io
```

Luego reinicia el dev server:

```bash
npm run dev
```

⚠️ El `.env.local` no viaja al deploy: para producción, replica estas variables en
**Vercel → Settings → Environment Variables** y redeploya.

---

## ✅ Verificación rápida

- Carga **http://localhost:3000/favorites**
- El aviso debe decir: *"Live-synced from Steam & Epic"* (verde/cyan)
- API directa: `http://localhost:3000/api/games?platform=steam&sort=playtime`
  → debe devolver tu librería real con `playtimeMinutes`
- Con token Epic: `http://localhost:3000/api/games?platform=epic&sort=title`
  → tus juegos de Epic con covers (sin horas)
- Si sigue el aviso gris ("personal picks"), algo falta o las cuentas devuelven datos privados

---

## 🆘 Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Aviso gris / fallback | Faltan `STEAM_WEB_API_KEY` o `EPIC_REFRESH_TOKEN` en `.env.local` | Agrega las claves y reinicia dev |
| Steam vacío (0 juegos) | Perfil en privado o `STEAM_ID` incorrecto | Publica `Game details`; prueba con `STEAM_ID` explícito |
| Logros de Steam sin abrir | El juego no tiene `has_community_visible_stats` o perfil privado | Publica `Achievements` en privacidad |
| Epic no aparece (0 juegos) | Token faltante, expirado o inválido | Confirma `EPIC_REFRESH_TOKEN` en `.env.local` y corre `legendary auth` de nuevo (ver sección 3) |
| Tarjetas Epic sin horas | Normal — Epic no expone playtime | No es un bug; se ocultan las horas por diseño |
| Webs denegadas en imágenes | Falta dominio en `next.config.ts` → `images.remotePatterns` | Consulta AGENTS.md (Steam CDN + media.rawg.io ya están; los covers de Epic usan CDN de Epic ya incluidos) |