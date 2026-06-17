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
    'viagra', 'casino', 'lottery', 'bitcoin', 'crypto', 'forex',
    'weight loss', 'click here', 'buy now', 'limited offer',
    'act now', 'free money', 'congratulations', 'you won',
    'seo services', 'backlinks', 'guest post', 'write for us',
    'digital marketing', 'bulk email', 'mailing list',
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
  return urls.length > 2
}

/**
 * Check for repeated gibberish (e.g. "asdfghjk", repeated characters)
 */
export function isSpamByGibberish(message: string): boolean {
  const repeatedChar = /(.)\1{8,}/ // 9+ same chars in a row
  const keyboardSmash = /^[asdfghjkl;'qwertyuiopzxcvbnm,.\/]{20,}$/i
  return repeatedChar.test(message) || keyboardSmash.test(message)
}

/**
 * Check for base64-encoded or obfuscated content (common in bot spam)
 */
export function isSpamByEncoding(message: string): boolean {
  // Detect high ratio of non-alphanumeric characters
  const nonAlphaRatio = (message.match(/[^a-zA-Z0-9\s]/g) || []).length / message.length
  return nonAlphaRatio > 0.4
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
