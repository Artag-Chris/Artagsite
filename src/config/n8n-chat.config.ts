/**
 * N8n Chat Configuration
 * 
 * Replace YOUR_PRODUCTION_WEBHOOK_URL with your actual n8n webhook URL
 * Example: https://yourname.app.n8n.cloud/webhook/513107b3-6f3a-4a1e-af21-659f0ed14183
 */

export const N8N_CHAT_CONFIG = {
  // Required: Your n8n webhook URL
  webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "",

  // Optional: Chat display mode
  mode: "window" as const,

  // Optional: Show welcome screen on first load
  showWelcomeScreen: false,

  // Optional: Enable streaming responses (requires n8n workflow configuration)
  enableStreaming: false,

  // Optional: Initial messages displayed in the chat
  initialMessages: [
    "¡Hola! 👋",
    "Soy Nathan, tu asistente de IA. ¿Cómo puedo ayudarte hoy?",
  ],

  // Optional: Key for chat input in the workflow
  chatInputKey: "chatInput",

  // Optional: Key for session ID in the workflow
  chatSessionKey: "sessionId",

  // Optional: Load previous chat sessions
  loadPreviousSession: true,

  // Optional: Metadata to send with each request
  metadata: {},

  // Optional: Internationalization configuration
  i18nConfig: {
    title: "¡Hola! 👋",
    subtitle: "Estamos aquí para ayudarte 24/7",
    footer: "",
    getStarted: "Nueva Conversación",
    inputPlaceholder: "Escribe tu pregunta...",
  },

  // Optional: Custom CSS variables for styling
  customCSSVariables: {
    primaryColor: "#6366f1", // Indigo
    primaryDark: "#4f46e5", // Indigo oscuro
    primaryLight: "#818cf8", // Indigo claro
    secondaryColor: "#a855f7", // Morado
    secondaryDark: "#9333ea", // Morado oscuro
    bgColor: "#18181b", // Zinc-900
    bgLight: "#27272a", // Zinc-800
    bgLighter: "#3f3f46", // Zinc-700
    textColor: "#fafafa", // Zinc-50
    textSecondary: "#d4d4d8", // Zinc-300
    borderColor: "#3f3f46", // Zinc-700
  },
}


