/**
 * N8n Chat Customization Examples
 * 
 * Ejemplos de cómo personalizar los colores y mensajes del chat
 */

import N8nChat from "./N8nChat"

/**
 * Ejemplo 1: Chat con colores morados (como solicitaste)
 */
export function N8nChatPurple() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      initialMessages={[
        "¡Hola! 👋",
        "Soy tu asistente de IA. ¿En qué puedo ayudarte?",
      ]}
      i18nConfig={{
        title: "¡Hola! 👋",
        subtitle: "Estamos aquí para ayudarte",
        inputPlaceholder: "Escribe tu pregunta...",
      }}
      customCSSVariables={{
        primaryColor: "#a855f7", // Morado
        primaryDark: "#9333ea", // Morado oscuro
        primaryLight: "#d8b4fe", // Morado claro
        secondaryColor: "#7c3aed", // Morado más oscuro
        secondaryDark: "#6d28d9", // Morado muy oscuro
      }}
    />
  )
}

/**
 * Ejemplo 2: Chat con colores azules
 */
export function N8nChatBlue() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      initialMessages={[
        "Welcome! 👋",
        "How can I assist you today?",
      ]}
      i18nConfig={{
        title: "Welcome! 👋",
        subtitle: "Chat with our AI assistant",
        inputPlaceholder: "Ask me anything...",
      }}
      customCSSVariables={{
        primaryColor: "#3b82f6", // Azul
        primaryDark: "#1d4ed8", // Azul oscuro
        primaryLight: "#60a5fa", // Azul claro
        secondaryColor: "#0ea5e9", // Cyan
        secondaryDark: "#0284c7", // Cyan oscuro
      }}
    />
  )
}

/**
 * Ejemplo 3: Chat con colores verdes
 */
export function N8nChatGreen() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      initialMessages={[
        "¡Bienvenido! 🌿",
        "¿Cómo podemos ayudarte hoy?",
      ]}
      i18nConfig={{
        title: "¡Bienvenido! 🌿",
        subtitle: "Soporte disponible 24/7",
        inputPlaceholder: "Cuéntanos qué necesitas...",
      }}
      customCSSVariables={{
        primaryColor: "#10b981", // Verde
        primaryDark: "#059669", // Verde oscuro
        primaryLight: "#6ee7b7", // Verde claro
        secondaryColor: "#14b8a6", // Teal
        secondaryDark: "#0d9488", // Teal oscuro
      }}
    />
  )
}

/**
 * Ejemplo 4: Chat con colores personalizados (Indigo + Morado)
 */
export function N8nChatCustom() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      showWelcomeScreen={true}
      enableStreaming={true}
      initialMessages={[
        "¡Hola! Soy tu asistente de IA 🤖",
        "Estoy aquí para responder tus preguntas y ayudarte con lo que necesites.",
      ]}
      i18nConfig={{
        title: "Asistente de IA",
        subtitle: "Disponible 24/7 para ayudarte",
        footer: "Powered by Artag",
        getStarted: "Iniciar Chat",
        inputPlaceholder: "Escribe tu pregunta aquí...",
      }}
      customCSSVariables={{
        // Colores principales (Indigo)
        primaryColor: "#6366f1",
        primaryDark: "#4f46e5",
        primaryLight: "#818cf8",
        // Colores secundarios (Morado)
        secondaryColor: "#a855f7",
        secondaryDark: "#9333ea",
        // Colores de fondo (Zinc)
        bgColor: "#18181b",
        bgLight: "#27272a",
        bgLighter: "#3f3f46",
        // Colores de texto
        textColor: "#fafafa",
        textSecondary: "#d4d4d8",
        // Bordes
        borderColor: "#3f3f46",
      }}
    />
  )
}

/**
 * Ejemplo 5: Chat minimalista con colores claros
 */
export function N8nChatLight() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      initialMessages={[
        "Hi there! 👋",
        "How can I help you?",
      ]}
      i18nConfig={{
        title: "Support Chat",
        subtitle: "We're here to help",
        inputPlaceholder: "Type your message...",
      }}
      customCSSVariables={{
        primaryColor: "#f59e0b", // Amber
        primaryDark: "#d97706", // Amber oscuro
        primaryLight: "#fbbf24", // Amber claro
        secondaryColor: "#ec4899", // Pink
        secondaryDark: "#db2777", // Pink oscuro
        bgColor: "#f9fafb", // Gray-50
        bgLight: "#f3f4f6", // Gray-100
        bgLighter: "#e5e7eb", // Gray-200
        textColor: "#111827", // Gray-900
        textSecondary: "#6b7280", // Gray-500
        borderColor: "#d1d5db", // Gray-300
      }}
    />
  )
}
