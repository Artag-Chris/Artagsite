/**
 * Honeypot field checker
 * Detects simple bots that fill in hidden fields
 */
export function isSpamByHoneypot(websiteField: string | undefined): boolean {
  // If the honeypot field (website) has any value, it's likely a bot
  return !!websiteField && websiteField.trim().length > 0
}

/**
 * Check for common spam patterns in message
 */
export function isSpamByContent(message: string): boolean {
  // List of common spam keywords
  const spamKeywords = [
    'viagra',
    'casino',
    'lottery',
    'bitcoin',
    'crypto',
    'forex',
    'weight loss',
    'click here',
    'buy now',
    'limited offer',
  ]

  const lowerMessage = message.toLowerCase()
  return spamKeywords.some((keyword) => lowerMessage.includes(keyword))
}

/**
 * Check for excessive URLs or links in message
 */
export function isSpamByLinks(message: string): boolean {
  // Count URLs in message
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const urls = message.match(urlPattern) || []
  
  // More than 2 URLs is suspicious
  return urls.length > 2
}

/**
 * Comprehensive spam check
 */
export function isSpam(message: string, websiteField: string | undefined): boolean {
  return (
    isSpamByHoneypot(websiteField) ||
    isSpamByContent(message) ||
    isSpamByLinks(message)
  )
}
