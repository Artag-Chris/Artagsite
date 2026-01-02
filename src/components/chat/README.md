# N8n Chat Component

Un componente reutilizable para integrar el chat de n8n en tu aplicación Next.js con soporte completo para personalización de colores y mensajes.

## Instalación

La dependencia `@n8n/chat` ya está instalada. Solo necesitas configurar tu webhook URL.

## Configuración

### 1. Obtén tu Webhook URL de n8n

1. Abre tu workflow en n8n
2. Agrega un nodo **Chat Trigger**
3. Copia la URL del webhook (ejemplo: `https://yourname.app.n8n.cloud/webhook/513107b3-6f3a-4a1e-af21-659f0ed14183`)
4. Asegúrate de agregar tu dominio en **Allowed Origins (CORS)**

### 2. Configura la variable de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://yourname.app.n8n.cloud/webhook/513107b3-6f3a-4a1e-af21-659f0ed14183
```

### 3. Usa el componente

#### Opción A: Configuración por defecto

```tsx
import N8nChat from '@/components/chat/N8nChat'
import { N8N_CHAT_CONFIG } from '@/config/n8n-chat.config'

export default function Page() {
  return <N8nChat {...N8N_CHAT_CONFIG} />
}
```

#### Opción B: Personalización de colores y mensajes

```tsx
import N8nChat from '@/components/chat/N8nChat'

export default function Page() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      initialMessages={[
        "¡Hola! 👋",
        "Soy tu asistente de IA. ¿Cómo puedo ayudarte?",
      ]}
      i18nConfig={{
        title: "¡Hola! 👋",
        subtitle: "Estamos aquí para ayudarte",
        inputPlaceholder: "Escribe tu pregunta...",
      }}
      customCSSVariables={{
        primaryColor: "#a855f7", // Morado
        primaryDark: "#9333ea",
        secondaryColor: "#7c3aed",
        secondaryDark: "#6d28d9",
      }}
    />
  )
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `webhookUrl` | `string` | - | **Requerido**. URL del webhook de n8n |
| `mode` | `"window" \| "fullscreen"` | `"window"` | Modo de visualización del chat |
| `showWelcomeScreen` | `boolean` | `false` | Mostrar pantalla de bienvenida |
| `enableStreaming` | `boolean` | `false` | Habilitar respuestas en streaming |
| `initialMessages` | `string[]` | `["Hi there! 👋", "My name is Nathan..."]` | Mensajes iniciales |
| `chatInputKey` | `string` | `"chatInput"` | Clave para el input en el workflow |
| `chatSessionKey` | `string` | `"sessionId"` | Clave para la sesión en el workflow |
| `loadPreviousSession` | `boolean` | `true` | Cargar sesiones anteriores |
| `metadata` | `Record<string, any>` | `{}` | Metadata adicional a enviar |
| `i18nConfig` | `object` | - | Configuración de idioma y textos |
| `customCSSVariables` | `object` | - | Variables CSS para personalizar colores |

## Personalización de Colores

### Variables CSS disponibles

```tsx
customCSSVariables={{
  // Colores principales
  primaryColor: "#6366f1",      // Color principal
  primaryDark: "#4f46e5",       // Color principal oscuro
  primaryLight: "#818cf8",      // Color principal claro
  
  // Colores secundarios
  secondaryColor: "#a855f7",    // Color secundario (botón flotante)
  secondaryDark: "#9333ea",     // Color secundario oscuro
  
  // Colores de fondo
  bgColor: "#18181b",           // Fondo principal
  bgLight: "#27272a",           // Fondo claro
  bgLighter: "#3f3f46",         // Fondo más claro
  
  // Colores de texto
  textColor: "#fafafa",         // Texto principal
  textSecondary: "#d4d4d8",     // Texto secundario
  
  // Bordes
  borderColor: "#3f3f46",       // Color de bordes
}}
```

### Ejemplos de paletas de colores

#### Morado (Recomendado)
```tsx
customCSSVariables={{
  primaryColor: "#a855f7",
  primaryDark: "#9333ea",
  primaryLight: "#d8b4fe",
  secondaryColor: "#7c3aed",
  secondaryDark: "#6d28d9",
}}
```

#### Azul
```tsx
customCSSVariables={{
  primaryColor: "#3b82f6",
  primaryDark: "#1d4ed8",
  primaryLight: "#60a5fa",
  secondaryColor: "#0ea5e9",
  secondaryDark: "#0284c7",
}}
```

#### Verde
```tsx
customCSSVariables={{
  primaryColor: "#10b981",
  primaryDark: "#059669",
  primaryLight: "#6ee7b7",
  secondaryColor: "#14b8a6",
  secondaryDark: "#0d9488",
}}
```

## Personalización de Mensajes

### Mensajes iniciales

```tsx
initialMessages={[
  "¡Hola! 👋",
  "Soy tu asistente de IA. ¿Cómo puedo ayudarte?",
]}
```

### Textos de la interfaz

```tsx
i18nConfig={{
  title: "¡Hola! 👋",
  subtitle: "Estamos aquí para ayudarte 24/7",
  footer: "Powered by Artag",
  getStarted: "Nueva Conversación",
  inputPlaceholder: "Escribe tu pregunta...",
}}
```

## Ejemplos

Ver `N8nChatCustomization.tsx` para más ejemplos de uso con diferentes paletas de colores.

## Estilos CSS

Los estilos personalizados se encuentran en `src/styles/n8n-chat-custom.css`. Puedes modificar este archivo para cambiar:

- Bordes redondeados
- Sombras
- Animaciones
- Tamaños de fuente
- Espaciado
- Y más...

## Troubleshooting

### El chat no aparece

1. Verifica que `NEXT_PUBLIC_N8N_WEBHOOK_URL` esté configurado correctamente
2. Asegúrate de que el workflow en n8n esté **Active**
3. Verifica que tu dominio esté en **Allowed Origins (CORS)** en el Chat Trigger

### CORS Error

1. Abre el Chat Trigger en n8n
2. Ve a **Allowed Origins (CORS)**
3. Agrega tu dominio (ejemplo: `https://tudominio.com`)

### El chat no responde

1. Verifica que el workflow tenga un nodo **Chat Trigger**
2. Asegúrate de que el workflow esté conectado correctamente
3. Revisa los logs de n8n para errores

### Los colores no cambian

1. Verifica que `customCSSVariables` esté correctamente configurado
2. Asegúrate de que los valores de color sean válidos (hex, rgb, etc.)
3. Revisa la consola del navegador para errores

## Recursos

- [Documentación oficial de n8n Chat](https://docs.n8n.io/integrations/chat/)
- [Ejemplo de workflow](https://docs.n8n.io/integrations/chat/#example-workflow)
- [Streaming responses](https://docs.n8n.io/integrations/chat/#streaming-responses)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Para encontrar códigos de color
