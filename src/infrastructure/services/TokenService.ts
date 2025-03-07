import { User } from "../../core/domain/entities/User";
import { API_CONFIG } from "../../config/api";

const TOKEN_KEY = API_CONFIG.TOKEN.STORAGE_KEY;

export const saveToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getTokenPayload = (): any | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const getUserFromToken = (): User | null => {
  try {
    const payload = getTokenPayload();
    if (!payload) return null;

    const user: User = {
      id: payload.id || 0,
      apelido: payload.sub || "Usuário",
      email: payload.sub || "",
      posicao: payload.posicao || "ATACANTE",
      nivelHabilidade: payload.nivelHabilidade || 1,
      pontuacaoFairPlay: payload.pontuacaoFairPlay || 0,
      isPremium: payload.isPremium || false,
      nome: payload.nome || payload.sub || "Usuário",
      avatar: payload.avatar || "",
    };

    return user;
  } catch (error) {
    return null;
  }
};
