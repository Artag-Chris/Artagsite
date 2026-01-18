# Configuración de Vercel - Artagsite

## Pasos para Desplegar en Vercel

### 1. Conectar el Repositorio
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en "Add New..." → "Project"
3. Selecciona tu repositorio de GitHub: `Artagsite`
4. Click en "Import"

### 2. Configurar Variables de Entorno
Antes de hacer click en "Deploy", necesitas configurar las variables:

#### En la pantalla de Vercel:
1. Scroll hasta la sección **"Environment Variables"**
2. Agrega cada variable del `.env.example`:

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Tu webhook de N8n | `https://n8n.example.com/webhook/abc123` |
| `GMAIL_USER` | Tu email Gmail | `artagdev@gmail.com` |
| `GMAIL_PASSWORD` | Tu App Password de Gmail | `xxxx xxxx xxxx xxxx` |
| `GMAIL_FROM` | Email de origen | `artagdev@gmail.com` |
| `CONTACT_ADMIN_EMAIL` | Email para recibir contactos | `artagdev@gmail.com` |
| `NEXT_PUBLIC_DOMAIN` | Tu dominio en producción | `https://www.artagdev.com.co` |
| `RATE_LIMIT_MINUTES` | Minutos entre solicitudes (opcional) | `5` |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de solicitudes (opcional) | `1` |

### 3. Obtener App Password de Gmail

⚠️ **Importante:** Necesitas un **App Password**, no tu contraseña normal.

**Pasos:**
1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Click en "App passwords" (si no ves esto, tienes 2FA deshabilitado - actívalo primero)
3. Selecciona "Mail" y "Windows Computer"
4. Google te genera una contraseña de 16 caracteres
5. **Copia esa contraseña en `GMAIL_PASSWORD`**

### 4. Hacer Deploy
1. Click en **"Deploy"**
2. Espera a que termine la compilación
3. ✅ ¡Listo! Tu sitio está en vivo

---

## Estructura de Variables de Entorno

### Variables Públicas (visibles en el cliente)
- `NEXT_PUBLIC_N8N_WEBHOOK_URL` - URL de N8n
- `NEXT_PUBLIC_DOMAIN` - Tu dominio

**⚠️ Nota:** Cualquier variable que empiece con `NEXT_PUBLIC_` será visible en el navegador. No agregues secretos aquí.

### Variables Privadas (solo en el servidor)
- `GMAIL_USER` - Usuario de Gmail
- `GMAIL_PASSWORD` - App Password de Gmail
- `GMAIL_FROM` - Email de origen
- `CONTACT_ADMIN_EMAIL` - Email admin para contactos
- `RATE_LIMIT_MINUTES` - Configuración de rate limiting
- `RATE_LIMIT_MAX_REQUESTS` - Configuración de rate limiting

Estas NO son visibles en el cliente.

---

## Testing del Formulario de Contacto

Después del deploy, prueba el formulario:

1. Ve a tu sitio en Vercel
2. Scroll hasta la sección "Contact"
3. Llena el formulario
4. Click "Send Message"
5. Verifica que recibas el email en `CONTACT_ADMIN_EMAIL`

### Si no funciona:
- Revisa los logs en Vercel: Dashboard → Tu proyecto → Deployments → Logs
- Verifica que `GMAIL_PASSWORD` sea un **App Password**, no tu contraseña
- Verifica que 2FA esté habilitado en tu Google Account
- Verifica que las variables de entorno estén correctas

---

## Rebuilds y Redeploys

Si necesitas hacer cambios:

1. Haz cambios en el código
2. Commit y push a GitHub
3. Vercel automáticamente redeploya

O manualmente en el Dashboard:
1. Dashboard → Tu proyecto
2. Click en "Deployments"
3. Click en los 3 puntos del deploy más reciente
4. Click "Redeploy"

---

## Dominios Personalizados

Para usar `www.artagdev.com.co`:

1. En Dashboard de Vercel → Tu proyecto → Settings → Domains
2. Agrega tu dominio
3. Vercel te mostrará records DNS para agregar
4. En tu proveedor de dominio, agrega los records DNS
5. Espera 24-48 horas para propagación

---

## Troubleshooting

### Error: "Cannot find module 'next/core-web-vitals'"
✅ **Solucionado** - ESLint está deshabilitado en builds

### Error: "Gmail SMTP connection failed"
- Verifica que `GMAIL_PASSWORD` sea un App Password
- Verifica que 2FA esté habilitado
- Genera una nueva App Password

### Error: "Contact form not sending emails"
- Revisa los logs en Vercel
- Verifica todas las variables de entorno
- Prueba localmente: `npm run dev`

### Cambios no reflejados después de push
- Espera a que Vercel termine de rebuildar
- Revisa el estado en Dashboard → Deployments
- Hard refresh: Ctrl+Shift+R

---

## Documentación Útil

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Google App Passwords](https://support.google.com/accounts/answer/185833)
- [Nodemailer Gmail Setup](https://nodemailer.com/smtp/gmail/)

---

**¿Preguntas?** Revisa los logs en Vercel Dashboard para más detalles.
