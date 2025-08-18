export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
  LOGIN_REDIRECT: '/login',
} as const;
