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
    if (!enabled || suggestions.length === 0) {      
      return
    }

    let timeoutId: NodeJS.Timeout
    let observer: MutationObserver | null = null

    const addSuggestionButtons = () => {
      const container = document.querySelector(containerSelector)
      if (!container) {
        console.log('❌ Chat container not found:', containerSelector)
        return
      }

      // Find the messages container - try multiple selectors
      const messagesSelectors = [
        '[class*="messages"]',
        '[class*="Messages"]',
        '[class*="message-list"]',
        '[class*="chat-messages"]',
        '.n8n-chat-messages',
      ]
      
      let messagesContainer: Element | null = null
      for (const selector of messagesSelectors) {
        messagesContainer = container.querySelector(selector)
        if (messagesContainer) {
          console.log('✅ Found messages container with selector:', selector)
          break
        }
      }

      if (!messagesContainer) {
        messagesContainer = container
      }

      // Check if buttons already exist
      if (container.querySelector('.chat-suggestion-buttons')) {
        return
      }

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
          
          // Try multiple selector strategies to find the input
          const inputSelectors = [
            'textarea[class*="textarea"]',
            'textarea[class*="input"]',
            'textarea',
            'input[type="text"]',
            '.n8n-chat-input textarea',
            '.n8n-chat-input input',
            '[class*="ChatInput"] textarea',
            '[class*="ChatInput"] input',
          ]
          
          const sendButtonSelectors = [
            'button[class*="send"]',
            'button[class*="Send"]',
            'button[aria-label*="Send"]',
            'button[aria-label*="send"]',
            '.n8n-chat-send-button',
            '[class*="SendButton"]',
            'button[type="submit"]',
            'form button:last-child',
          ]

          let chatInput: HTMLTextAreaElement | HTMLInputElement | null = null
          let sendButton: HTMLButtonElement | null = null

          // Find the input element
          for (const selector of inputSelectors) {
            chatInput = container.querySelector(selector)
            if (chatInput) {
              console.log('✅ Found input with selector:', selector)
              break
            }
          }

          // Find the send button
          for (const selector of sendButtonSelectors) {
            sendButton = container.querySelector(selector)
            if (sendButton) {
              console.log('✅ Found send button with selector:', selector)
              break
            }
          }

          if (!chatInput) {
            console.error('❌ Could not find chat input element')
            return
          }

          if (!sendButton) {
            console.error('❌ Could not find send button')
          }

          chatInput.value = suggestion
          
          // Trigger multiple events to ensure the chat widget detects the change
          const events = ['input', 'change', 'keyup']
          events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true })
            chatInput.dispatchEvent(event)
          })

          // Also try native setter
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
          )?.set || Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set
          
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(chatInput, suggestion)
            chatInput.dispatchEvent(new Event('input', { bubbles: true }))
          }

          // Try to click send button
          if (sendButton) {
            setTimeout(() => {
              console.log('🚀 Clicking send button')
              sendButton.click()
              // Hide suggestions after clicking
              buttonContainer.style.display = 'none'
              console.log('✅ Message sent, buttons hidden')
            }, 150)
          } else {
            // Try to submit the form directly
            const form = chatInput.closest('form')
            if (form) {
              console.log('📤 Submitting form directly')
              setTimeout(() => {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
                buttonContainer.style.display = 'none'
              }, 150)
            }
          }
        }

        buttonContainer.appendChild(button)
      })

      // Insert buttons after the last message or at the end of messages container
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
    return () => {
      clearTimeout(timeoutId)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [suggestions, containerSelector, enabled])
}
