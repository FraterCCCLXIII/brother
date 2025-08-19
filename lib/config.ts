// API Configuration
export const API_URL = 'https://brother-api.<your-subdomain>.workers.dev' // Replace with your actual Workers URL

// Development vs Production
export const IS_DEV = __DEV__

// API Endpoints
export const API_ENDPOINTS = {
  health: `${API_URL}/health`,
  candidates: `${API_URL}/candidates`,
  like: `${API_URL}/like`,
  pass: `${API_URL}/pass`,
  matches: `${API_URL}/matches`,
  messages: `${API_URL}/messages`,
} as const

// Default user ID for development (replace with actual auth later)
export const DEFAULT_USER_ID = 'me'

