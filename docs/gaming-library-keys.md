## 🎮 Estado actual: solo Steam

La integración de **Steam está activa y funcionando** (librería real + horas + logros).
Epic y GOG están **deshabilitados temporalmente** (RAWG no tiene conexión con librerías
de Epic, y el acceso a la cuenta de GOG está pendiente). Los tabs de Epic/GOG aparecen
solos cuando haya juegos en su lista curada (`src/lib/games/config.ts`).

---

## 🔑 Configuración de claves — Librería de Juegos

Para activar la integración en vivo de `/favorites` necesitas **2 claves gratuitas**.
Sin ellas la página funciona igual (modo fallback con tus juegos favoritos estáticos).

---

## 1️⃣ RAWG API Key (enriquece Epic + GOG con covers, géneros, ratings)

**Link:** https://rawg.io/apidocs

### Pasos
1. Ve a **https://rawg.io** y crea una cuenta (gratis)
   - Puedes registrarte con email o con Google
2. Inicia sesión y entra en **https://rawg.io/apidocs**
3. Tu API key aparece visible en esa página (formato `alphanumeric`)
4. Alternativa más directa (si ya tienes cuenta): https://rawg.io/settings/api — el botón **"Generate API key"**

### Límites
- **160 peticiones por minuto** (free tier) — más que suficiente para esta página
- La página cachea las respuestas 60 min, así que el consumo real es mínimo

---

## 2️⃣ Steam Web API Key (librería real + horas + logros)

**Link:** https://steamcommunity.com/dev/apikey

### Pasos
1. Inicia sesión en Steam (necesitas cuenta + Steam Guard)
2. Entra en **https://steamcommunity.com/dev/apikey**
3. En el campo **"Domain Name"** escribe: `artagdev.com.co`
   - ⚠️ No importa cuál pongas — es solo un requisito del formulario
4. Acepta los términos y haz clic en **"Register"**
5. Aparecerá tu clave al instante (formato `XXXXXXXXXXXXXXXXXXXXXXXX` — 32 caracteres hex)

### Requisito: perfil público
Para que la API devuelva tu librería, tu perfil debe ser **público**:

- **Link:** https://steamcommunity.com/my/edit/settings
- En **"My Profile"** → **"Privacy Settings"**:
  - ✅ **"Public"** en `Game details` (imprescindible)
  - ✅ **"Public"** en `Profile` y `Inventory` (recomendado)
  - ✅ **"Public"** en `Achievements` (para ver logros)

⚠️ Si tu perfil está en privado, Steam devuelve vacío y la página cae al fallback elegante (no se rompe).

---

## 3️⃣ Tu Steam ID (opcional — pero recomendado)

**Link:** https://steamidfinder.com/

### Cómo
1. Pega tu URL de perfil (ej. `https://steamcommunity.com/id/Artag-chris/`)
2. Copia el **"SteamID64"** (número de 17 dígitos, ej. `76561198123456789`)

> **Opcional**: si no pones `STEAM_ID`, la página resuelve tu vanity URL (`Artag-chris`, configurada en `src/lib/games/config.ts`) automáticamente. Ponerlo evita una llamada extra y fallos si cambias el nombre de perfil.

---

## 4️⃣ Dónde colocarlas

Edita tu **`.env.local`** (raíz del proyecto, ya existe y está en `.gitignore`):

```env
# ── Gaming Library (/favorites) ──
RAWG_API_KEY=tu_clave_de_rawg_io
STEAM_WEB_API_KEY=tu_clave_de_steam_32_caracteres
STEAM_ID=7656119XXXXXXXXXXX
```

Luego reinicia el dev server:

```bash
npm run dev
```

---

## 5️⃣ (Opcional) Tu lista curada de Epic / GOG

Con la key de RAWG activa, EDITA los slugs en **`src/lib/games/config.ts`**
(sección `curated` — adentro hay instrucciones). Cómo encontrar un slug:

1. Busca el juego en **https://rawg.io**
2. El slug está en la URL: `rawg.io/games/**hades**` → `"hades"`

---

## ✅ Verificación rápida

- Carga **http://localhost:3000/favorites**
- El aviso debe decir: *"Live-synced from Steam · curated on Epic & GOG"* (verde/cyan)
- API directa: `http://localhost:3000/api/games?platform=steam&sort=playtime`
  → debe devolver **tu** librería real con `playtimeMinutes`
- Si sigue el aviso gris ("personal picks"), algo falta o Steam devuelve datos privados

---

## 🆘 Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Aviso gris / fallback | Falta `RAWG_API_KEY` o `STEAM_WEB_API_KEY` en `.env.local` | Agrega las claves y reinicia dev |
| Steam vacío (0 juegos) | Perfil en privado o `STEAM_ID` incorrecto | Publica `Game details` en privacidad; prueba con `STEAM_ID` explícito |
| Logros sin abrir modal | El juego no tiene `has_community_visible_stats` o perfil privado | Publica `Achievements` en privacidad |
| Webs denegadas en imágenes | Falta dominio en `next.config.ts` → `images.remotePatterns` | Consulta AGENTS.md (ya vienen Steam CDN + media.rawg.io) |