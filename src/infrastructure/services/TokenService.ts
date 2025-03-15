import { Jogador } from "../../@types";
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
    if (!token) {
      return null;
    }

    const base64Url = token.split(".")[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    const userId = payload.uuid;
    if (!userId) {
      return null;
    }

    return {
      uuid: userId,
      nome: payload.nome || payload.name || "Usuário",
      email: payload.email || payload.sub || "",
      posicao: payload.posicao || "ATACANTE",
      fotoPerfilUrl: "",
      citacao: "",
      estiloJogo: "",
      ranking: 0,
      rankingLocal: 0,
      melhorNota: 0,
      sequenciaVitorias: 0,
      maiorSequenciaVitorias: 0,
      avatarPersonalizadoUrl: null,
      temaPerfilUrl: null,
      badgePersonalizado: null,
      tituloDestaque: null,
      rankingAmigos: 0,
      identificador: null,
      nomeCompleto: null,
      telefone: null,
      nivelCompetitividade: null,
      tipoJogador: null,
      notaMedia: null,
      totalPartidas: 0,
      partidasGanhas: null,
      partidasPerdidas: null,
      partidasEmpatadas: null,
      estatisticas: {
        totalPartidas: 0,
        totalVitorias: 0,
        totalDerrotas: 0,
        totalEmpates: 0,
        totalGols: 0,
        totalAssistencias: 0,
        tempoTotalJogo: 0,
        mediaNotas: 0,
        taxaConversaoChutes: 0,
        precisaoPasses: 0,
        totalDesarmes: 0,
        totalInterceptacoes: 0,
      },
    };
  } catch (error) {
    return null;
  }
};
