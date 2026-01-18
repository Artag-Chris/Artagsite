"use client"

import { useEffect, useRef } from "react"
import { useChatSuggestions } from "@/hooks/useChatSuggestions"

interface N8nChatProps {
  webhookUrl: string
  mode?: "window" | "fullscreen"
  showWelcomeScreen?: boolean
  enableStreaming?: boolean
  initialMessages?: string[]
  clickableSuggestions?: string[] // New: clickable suggestion buttons
  chatInputKey?: string
  chatSessionKey?: string
  loadPreviousSession?: boolean
  metadata?: Record<string, any>
  i18nConfig?: {
    title?: string
    subtitle?: string
    footer?: string
    getStarted?: string
    inputPlaceholder?: string
  }
  customCSSVariables?: {
    primaryColor?: string
    primaryDark?: string
    primaryLight?: string
    secondaryColor?: string
    secondaryDark?: string
    bgColor?: string
    bgLight?: string
    bgLighter?: string
    textColor?: string
    textSecondary?: string
    borderColor?: string
  }
}

export default function N8nChat({
  webhookUrl,
  mode = "window",
  showWelcomeScreen = false,
  enableStreaming = false,
  initialMessages = ["Hi there! 👋", "My name is Nathan. How can I assist you today?"],
  clickableSuggestions = [],
  chatInputKey = "chatInput",
  chatSessionKey = "sessionId",
  loadPreviousSession = true,
  metadata = {},
  i18nConfig = {},
  customCSSVariables = {},
}: N8nChatProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const chatInitializedRef = useRef(false)

  // Add clickable suggestion buttons
  useChatSuggestions({
    suggestions: clickableSuggestions,
    containerSelector: "#n8n-chat-container",
    enabled: clickableSuggestions.length > 0,
  })

  useEffect(() => {
    // Apply custom CSS variables if provided
    if (Object.keys(customCSSVariables).length > 0) {
      const root = document.documentElement
      if (customCSSVariables.primaryColor) root.style.setProperty('--n8n-chat-primary', customCSSVariables.primaryColor)
      if (customCSSVariables.primaryDark) root.style.setProperty('--n8n-chat-primary-dark', customCSSVariables.primaryDark)
      if (customCSSVariables.primaryLight) root.style.setProperty('--n8n-chat-primary-light', customCSSVariables.primaryLight)
      if (customCSSVariables.secondaryColor) root.style.setProperty('--n8n-chat-secondary', customCSSVariables.secondaryColor)
      if (customCSSVariables.secondaryDark) root.style.setProperty('--n8n-chat-secondary-dark', customCSSVariables.secondaryDark)
      if (customCSSVariables.bgColor) root.style.setProperty('--n8n-chat-bg', customCSSVariables.bgColor)
      if (customCSSVariables.bgLight) root.style.setProperty('--n8n-chat-bg-light', customCSSVariables.bgLight)
      if (customCSSVariables.bgLighter) root.style.setProperty('--n8n-chat-bg-lighter', customCSSVariables.bgLighter)
      if (customCSSVariables.textColor) root.style.setProperty('--n8n-chat-text', customCSSVariables.textColor)
      if (customCSSVariables.textSecondary) root.style.setProperty('--n8n-chat-text-secondary', customCSSVariables.textSecondary)
      if (customCSSVariables.borderColor) root.style.setProperty('--n8n-chat-border', customCSSVariables.borderColor)
    }
  }, [customCSSVariables])

  useEffect(() => {
    // Prevent multiple initializations
    if (chatInitializedRef.current) return

    const initializeChat = async () => {
      try {
        // Dynamically import the n8n chat library
        const { createChat } = await import("@n8n/chat")

        // Initialize chat with provided configuration
        createChat({
          webhookUrl,
          mode,
          target: "#n8n-chat-container",
          showWelcomeScreen,
          enableStreaming,
          initialMessages,
          chatInputKey,
          chatSessionKey,
          loadPreviousSession,
          metadata,
          theme: {
            primaryColor: customCSSVariables.primaryColor || "#6366f1",
            secondaryColor: customCSSVariables.secondaryColor || "#a855f7",
          },
          i18n: {
            en: {
              title: i18nConfig.title || "Hi there! 👋",
              subtitle: i18nConfig.subtitle || "Start a chat. We're here to help you 24/7.",
              footer: i18nConfig.footer || "",
              getStarted: i18nConfig.getStarted || "New Conversation",
              inputPlaceholder: i18nConfig.inputPlaceholder || "Type your question..",
              closeButtonTooltip: "Close",
            },
          },
        })

        chatInitializedRef.current = true
      } catch (error) {
        console.error("Failed to initialize n8n chat:", error)
      }
    }

    initializeChat()
  }, [
    webhookUrl,
    mode,
    showWelcomeScreen,
    enableStreaming,
    initialMessages,
    chatInputKey,
    chatSessionKey,
    loadPreviousSession,
    metadata,
    i18nConfig,
  ])

  return (
    <div
      ref={chatContainerRef}
      id="n8n-chat-container"
      className={`${mode === "fullscreen" ? "w-full h-full" : ""}`}
    />
  )
}
