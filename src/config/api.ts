export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  WITH_CREDENTIALS: true,
  AUTH: {
    LOGIN_ENDPOINT: "/auth/login",
    REGISTER_ENDPOINT: "/auth/registrar",
    PROFILE_ENDPOINT: "/auth/me",
    PROFILE_FALLBACK_ENDPOINT: "/jogadores/me",
  },
  TOKEN: {
    STORAGE_KEY: import.meta.env.VITE_TOKEN_KEY || "auth_token",
  },
};
