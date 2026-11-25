/**
 * Honeypot field checker — detects bots that fill in hidden fields
 */
export function isSpamByHoneypot(websiteField: string | undefined): boolean {
  return !!websiteField && websiteField.trim().length > 0
}

/**
 * Check for common spam patterns in message text
 */
export function isSpamByContent(message: string): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'lottery',
    'weight loss', 'free money', 'you won',
    'buy backlinks', 'guest post service', 'bulk email list',
  ]

  const lowerMessage = message.toLowerCase()
  return spamKeywords.some((keyword) => lowerMessage.includes(keyword))
}

/**
 * Check for excessive URLs or links in message
 */
export function isSpamByLinks(message: string): boolean {
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const urls = message.match(urlPattern) || []
  return urls.length > 4
}

/**
 * Check for repeated gibberish (e.g. "aaaaaaaaaa", repeated characters)
 */
export function isSpamByGibberish(message: string): boolean {
  const repeatedChar = /(.)\1{9,}/ // 10+ same chars in a row
  return repeatedChar.test(message)
}

/**
 * Check for obfuscated symbol-heavy content while allowing Spanish/Unicode letters & normal punctuation
 */
export function isSpamByEncoding(message: string): boolean {
  if (message.length === 0) return false
  const nonTextRatio =
    (message.match(/[^\p{L}\p{N}\s.,;:!?¿¡'"()\-_@#/$%&+]/gu) || []).length /
    message.length
  return nonTextRatio > 0.5
}

/**
 * Comprehensive spam check
 */
export function isSpam(message: string, websiteField: string | undefined): boolean {
  return (
    isSpamByHoneypot(websiteField) ||
    isSpamByContent(message) ||
    isSpamByLinks(message) ||
    isSpamByGibberish(message) ||
    isSpamByEncoding(message)
  )
}
