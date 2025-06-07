export const APP_CONFIG = {
  name: 'FutMATCH',
  version: '1.0.0',
  description: 'Sua pelada perfeita te espera!',
  author: 'FutMATCH Team',
} as const;

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  version: 'v1',
} as const;

export const STORAGE_KEYS = {
  token: 'futmatch_token',
  user: 'futmatch_user',
  theme: 'futmatch_theme',
  language: 'futmatch_language',
} as const;

export const APP_URLS = {
  github: 'https://github.com/futmatch/futmatch-frontend',
  documentation: 'https://docs.futmatch.com',
  support: 'mailto:support@futmatch.com',
} as const;
