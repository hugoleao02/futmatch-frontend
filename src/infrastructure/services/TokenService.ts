import { Jogador, PosicaoType } from "../../@types";
import { API_CONFIG } from "../../config/api";

const TOKEN_KEY = API_CONFIG.TOKEN.STORAGE_KEY;

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
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

export const getUserFromToken = (): Jogador | null => {
  try {
    const token = getToken();
    if (!token) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    const userId =
      Number(payload.id) || Number(payload.userId) || Number(payload.sub);
    if (isNaN(userId)) {
      return null;
    }

    return {
      id: userId,
      nome: payload.nome || payload.name || "Usuário",
      email: payload.email || payload.sub,
      posicao: payload.posicao || ("ATACANTE" as PosicaoType),
      estatisticas: {
        totalPartidas: payload.estatisticas?.totalPartidas || 0,
        vitorias: payload.estatisticas?.vitorias || 0,
        derrotas: payload.estatisticas?.derrotas || 0,
        empates: payload.estatisticas?.empates || 0,
        golsMarcados: payload.estatisticas?.golsMarcados || 0,
        golsSofridos: payload.estatisticas?.golsSofridos || 0,
        fairPlayScore: payload.estatisticas?.fairPlayScore || 0,
      },
    };
  } catch (error) {
    return null;
  }
};
