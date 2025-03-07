export const API_CONFIG = {
  BASE_URL: "http://localhost:8080/api",
  TIMEOUT: 30000,
  WITH_CREDENTIALS: true,
  AUTH: {
    LOGIN_ENDPOINT: "/auth/login",
    REGISTER_ENDPOINT: "/auth/register",
    PROFILE_ENDPOINT: "/auth/me",
    PROFILE_FALLBACK_ENDPOINT: "/jogadores/me",
  },
  TOKEN: {
    STORAGE_KEY: "auth_token",
  },
};
