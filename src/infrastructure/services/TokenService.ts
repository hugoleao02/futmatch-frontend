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

    const user: Jogador = {
      id: payload.id,
      uuid: userId,
      nome: payload.nome || payload.name || "Usuário",
      email: payload.email || payload.sub || "",
      posicao: payload.posicao || "ATACANTE",
      fotoPerfilUrl: payload.fotoPerfilUrl || "",
      citacao: payload.citacao || "",
      estiloJogo: payload.estiloJogo || "",
      ranking: payload.ranking || 0,
      rankingLocal: payload.rankingLocal || 0,
      melhorNota: payload.melhorNota || 0,
      sequenciaVitorias: payload.sequenciaVitorias || 0,
      maiorSequenciaVitorias: payload.maiorSequenciaVitorias || 0,
      avatarPersonalizadoUrl: payload.avatarPersonalizadoUrl,
      temaPerfilUrl: payload.temaPerfilUrl,
      badgePersonalizado: payload.badgePersonalizado,
      tituloDestaque: payload.tituloDestaque,
      rankingAmigos: payload.rankingAmigos || 0,
      identificador: payload.identificador,
      nomeCompleto: payload.nomeCompleto,
      telefone: payload.telefone,
      nivelCompetitividade: payload.nivelCompetitividade,
      tipoJogador: payload.tipoJogador,
      notaMedia: payload.notaMedia,
      totalPartidas: payload.totalPartidas || 0,
      partidasGanhas: payload.partidasGanhas,
      partidasPerdidas: payload.partidasPerdidas,
      partidasEmpatadas: payload.partidasEmpatadas,
      estatisticas: {
        totalPartidas: payload.estatisticas?.totalPartidas || 0,
        totalVitorias: payload.estatisticas?.totalVitorias || 0,
        totalDerrotas: payload.estatisticas?.totalDerrotas || 0,
        totalEmpates: payload.estatisticas?.totalEmpates || 0,
        totalGols: payload.estatisticas?.totalGols || 0,
        totalAssistencias: payload.estatisticas?.totalAssistencias || 0,
        tempoTotalJogo: payload.estatisticas?.tempoTotalJogo || 0,
        mediaNotas: payload.estatisticas?.mediaNotas || 0,
        taxaConversaoChutes: payload.estatisticas?.taxaConversaoChutes || 0,
        precisaoPasses: payload.estatisticas?.precisaoPasses || 0,
        totalDesarmes: payload.estatisticas?.totalDesarmes || 0,
        totalInterceptacoes: payload.estatisticas?.totalInterceptacoes || 0,
      },
    };

    return user;
  } catch (error) {
    return null;
  }
};
