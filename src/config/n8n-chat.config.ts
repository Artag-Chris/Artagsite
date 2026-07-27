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
  "Hey! I'm Braska, Christian's AI assistant 👋",
  "I can tell you about his projects, skills, or how to get in touch. What interests you?",
],

  // Optional: Clickable suggestion buttons (auto-send message on click)
  clickableSuggestions: [
    "What does Christian do?",
    "Show me some projects",
    "How can I contact him?",
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
  title: "Hey! 👋",
  subtitle: "Ask me anything about Christian's work",
  footer: "",
  getStarted: "New Chat",
  inputPlaceholder: "Ask me something...",
},

  // Optional: Custom CSS variables for styling
  customCSSVariables: {
    primaryColor: "#3b82f6", // Blue
    primaryDark: "#2563eb",
    primaryLight: "#60a5fa",
    secondaryColor: "#f59e0b", // Amber
    secondaryDark: "#d97706",
    bgColor: "#0c1222", // Dark navy
    bgLight: "#1e293b", // Slate-800
    bgLighter: "#334155", // Slate-700
    textColor: "#fafafa", // Zinc-50
    textSecondary: "#d4d4d8", // Zinc-300
    borderColor: "#334155", // Slate-700
  },
}


