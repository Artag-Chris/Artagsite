/**
 * N8n Chat Configuration
 * 
 * Replace YOUR_PRODUCTION_WEBHOOK_URL with your actual n8n webhook URL
 * Example: https://yourname.app.n8n.cloud/webhook/513107b3-6f3a-4a1e-af21-659f0ed14183
 */

export const N8N_CHAT_CONFIG = {
  // Required: Your n8n webhook URL
  webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://n8n.artagdev.com.co/webhook/48210b65-68d1-4619-9d20-2a093348c133/chat",

  // Optional: Chat display mode
  mode: "window" as const,

  // Optional: Show welcome screen on first load
  showWelcomeScreen: false,

  // Optional: Enable streaming responses (requires n8n workflow configuration)
  enableStreaming: false,

  // Optional: Initial messages displayed in the chat
initialMessages: [
  "Hello! I'm Braska, your AI agent. 👋",
  "I can answer questions about ArtagDev and Christian. What would you like to know? 🤔",
],

  // Optional: Clickable suggestion buttons (auto-send message on click)
  clickableSuggestions: [
    "Tell me about Christian's background",
    "What services does ArtagDev offer?",
    "How can I contact Christian?",
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
  title: "Hi there! 👋",
  subtitle: "I'm Braska, available to help you anytime",
  footer: "",
  getStarted: "New Chat",
  inputPlaceholder: "Ask me about Christian...",
},

  // Optional: Custom CSS variables for styling
  customCSSVariables: {
    primaryColor: "#4f46e5", // Indigo oscuro - para el botón flotante
    primaryDark: "#4338ca",
    primaryLight: "#818cf8",
    secondaryColor: "#6366f1", // Indigo
    secondaryDark: "#4f46e5",
    bgColor: "#18181b", // Zinc-900
    bgLight: "#27272a", // Zinc-800
    bgLighter: "#3f3f46", // Zinc-700
    textColor: "#fafafa", // Zinc-50
    textSecondary: "#d4d4d8", // Zinc-300
    borderColor: "#3f3f46", // Zinc-700
  },
}


