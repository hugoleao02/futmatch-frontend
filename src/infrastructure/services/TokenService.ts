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

    return {
      id: payload.sub,
      nome: "Admin",
      email: payload.sub,
      posicao: "ATACANTE" as PosicaoType,
      estatisticas: {
        totalPartidas: 0,
        vitorias: 0,
        derrotas: 0,
        empates: 0,
        golsMarcados: 0,
        golsSofridos: 0,
        fairPlayScore: 0,
      },
    };
  } catch (error) {
    return null;
  }
};
