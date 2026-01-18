import { useEffect } from "react"

interface UseChatSuggestionsOptions {
  suggestions: string[]
  containerSelector?: string
  enabled?: boolean
}

/**
 * Custom hook to add clickable suggestion buttons to N8n chat
 * Monitors the chat for initial messages and injects interactive buttons
 */
export function useChatSuggestions({
  suggestions,
  containerSelector = "#n8n-chat-container",
  enabled = true,
}: UseChatSuggestionsOptions) {
  useEffect(() => {
    if (!enabled || suggestions.length === 0) return

    let timeoutId: NodeJS.Timeout
    let observer: MutationObserver | null = null

    const addSuggestionButtons = () => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      // Find the messages container
      const messagesContainer = container.querySelector('[class*="messages"]')
      if (!messagesContainer) return

      // Check if buttons already exist
      if (container.querySelector('.chat-suggestion-buttons')) return

      // Create suggestion buttons container
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'chat-suggestion-buttons'
      buttonContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        margin-top: 0.5rem;
      `

      // Create individual suggestion buttons
      suggestions.forEach((suggestion) => {
        const button = document.createElement('button')
        button.textContent = suggestion
        button.className = 'chat-suggestion-btn'
        button.style.cssText = `
          background: rgba(79, 70, 229, 0.1);
          border: 1px solid rgba(79, 70, 229, 0.3);
          color: #e0e7ff;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          text-align: left;
          width: 100%;
        `

        // Add hover effect
        button.onmouseenter = () => {
          button.style.background = 'rgba(79, 70, 229, 0.2)'
          button.style.borderColor = 'rgba(79, 70, 229, 0.5)'
          button.style.color = '#c7d2fe'
        }
        button.onmouseleave = () => {
          button.style.background = 'rgba(79, 70, 229, 0.1)'
          button.style.borderColor = 'rgba(79, 70, 229, 0.3)'
          button.style.color = '#e0e7ff'
        }

        // Handle click - send message to chat
        button.onclick = () => {
          const chatInput = container.querySelector('textarea[class*="textarea"]') as HTMLTextAreaElement
          const sendButton = container.querySelector('button[class*="send"]') as HTMLButtonElement

          if (chatInput && sendButton) {
            // Set the input value
            chatInput.value = suggestion
            
            // Trigger input event so the chat widget knows the value changed
            const inputEvent = new Event('input', { bubbles: true })
            chatInput.dispatchEvent(inputEvent)

            // Small delay to ensure the input is processed
            setTimeout(() => {
              sendButton.click()
              // Hide suggestions after clicking
              buttonContainer.style.display = 'none'
            }, 100)
          }
        }

        buttonContainer.appendChild(button)
      })

      // Insert buttons after the last message
      const lastMessage = messagesContainer.querySelector('[class*="message"]:last-child')
      if (lastMessage) {
        lastMessage.after(buttonContainer)
      } else {
        messagesContainer.appendChild(buttonContainer)
      }
    }

    // Wait for chat to initialize, then add buttons
    timeoutId = setTimeout(() => {
      addSuggestionButtons()

      // Also observe for DOM changes in case chat loads slowly
      observer = new MutationObserver(() => {
        addSuggestionButtons()
      })

      const container = document.querySelector(containerSelector)
      if (container) {
        observer.observe(container, {
          childList: true,
          subtree: true,
        })
      }
    }, 2000) // Wait 2 seconds for chat to initialize

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [suggestions, containerSelector, enabled])
}
