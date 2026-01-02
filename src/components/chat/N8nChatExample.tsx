/**
 * Example: How to use the N8nChat component
 * 
 * This file shows different ways to use the N8nChat component
 * You can delete this file after understanding how to use it
 */

import N8nChat from "./N8nChat"
import { N8N_CHAT_CONFIG } from "@/config/n8n-chat.config"

/**
 * Example 1: Using default configuration
 */
export function N8nChatBasic() {
  return <N8nChat {...N8N_CHAT_CONFIG} />
}

/**
 * Example 2: Custom configuration
 */
export function N8nChatCustom() {
  return (
    <N8nChat
      webhookUrl={process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ""}
      mode="window"
      showWelcomeScreen={true}
      enableStreaming={true}
      initialMessages={[
        "Welcome to our support chat! 🎉",
        "How can we help you today?",
      ]}
      i18nConfig={{
        title: "Welcome! 👋",
        subtitle: "Chat with our AI assistant",
        inputPlaceholder: "Ask me anything...",
      }}
    />
  )
}

/**
 * Example 3: Fullscreen mode
 */
export function N8nChatFullscreen() {
  return (
    <div className="w-full h-screen">
      <N8nChat
        {...N8N_CHAT_CONFIG}
        mode="fullscreen"
      />
    </div>
  )
}

/**
 * Example 4: With metadata
 */
export function N8nChatWithMetadata() {
  return (
    <N8nChat
      {...N8N_CHAT_CONFIG}
      metadata={{
        userId: "user-123",
        userEmail: "user@example.com",
        source: "website",
      }}
    />
  )
}
