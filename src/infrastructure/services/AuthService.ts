import { Jogador, LoginDTO, RegisterDTO } from "../../@types";
import { API_CONFIG } from "../../config/api";
import { HttpClient } from "../api/HttpClient";
import { getUserFromToken, removeToken, saveToken } from "./TokenService";

const formatUserResponse = (user: any): Jogador | null => {
  if (!user || !user.email) {
    return null;
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    posicao: user.posicao,
    fotoPerfilUrl: user.fotoPerfilUrl,
    citacao: user.citacao,
    estiloJogo: user.estiloJogo,
    ranking: user.ranking || 0,
    rankingLocal: user.rankingLocal || 0,
    melhorNota: user.melhorNota || 0,
    sequenciaVitorias: user.sequenciaVitorias || 0,
    maiorSequenciaVitorias: user.maiorSequenciaVitorias || 0,
    avatarPersonalizadoUrl: user.avatarPersonalizadoUrl,
    temaPerfilUrl: user.temaPerfilUrl,
    badgePersonalizado: user.badgePersonalizado,
    tituloDestaque: user.tituloDestaque,
    rankingAmigos: user.rankingAmigos || 0,
    identificador: user.identificador,
    nomeCompleto: user.nomeCompleto,
    telefone: user.telefone,
    nivelCompetitividade: user.nivelCompetitividade,
    tipoJogador: user.tipoJogador,
    notaMedia: user.notaMedia,
    totalPartidas: user.totalPartidas || 0,
    partidasGanhas: user.partidasGanhas,
    partidasPerdidas: user.partidasPerdidas,
    partidasEmpatadas: user.partidasEmpatadas,
    estatisticas: {
      totalPartidas: user.estatisticas?.totalPartidas || 0,
      totalVitorias: user.estatisticas?.totalVitorias || 0,
      totalDerrotas: user.estatisticas?.totalDerrotas || 0,
      totalEmpates: user.estatisticas?.totalEmpates || 0,
      totalGols: user.estatisticas?.totalGols || 0,
      totalAssistencias: user.estatisticas?.totalAssistencias || 0,
      tempoTotalJogo: user.estatisticas?.tempoTotalJogo || 0,
      mediaNotas: user.estatisticas?.mediaNotas || 0,
      taxaConversaoChutes: user.estatisticas?.taxaConversaoChutes || 0,
      precisaoPasses: user.estatisticas?.precisaoPasses || 0,
      totalDesarmes: user.estatisticas?.totalDesarmes || 0,
      totalInterceptacoes: user.estatisticas?.totalInterceptacoes || 0,
    },
  };
};

const fetchUserProfile = async (): Promise<Jogador | null> => {
  try {
    const response = await HttpClient.get<any>(
      API_CONFIG.AUTH.PROFILE_ENDPOINT
    );
    return formatUserResponse(response);
  } catch (error) {
    return null;
  }
};

const login = async (loginDTO: LoginDTO): Promise<Jogador | null> => {
  try {
    const response = await HttpClient.post<any>(
      API_CONFIG.AUTH.LOGIN_ENDPOINT,
      loginDTO
    );

    if (!response || (!response.token && !response.access_token)) {
      throw new Error("Token não recebido do servidor");
    }

    const token = response.token || response.access_token;
    saveToken(token);

    const tokenData = getUserFromToken();
    if (!tokenData) {
      throw new Error("Token inválido recebido do servidor");
    }

    try {
      const userProfile = await fetchUserProfile();
      if (userProfile) {
        return userProfile;
      }
    } catch (profileError) {}

    return tokenData;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("token")
    ) {
      removeToken();
    }
    throw error;
  }
};

interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: Jogador;
}

const register = async (
  registerDTO: RegisterDTO
): Promise<RegisterResponse> => {
  try {
    const response = await HttpClient.post<any>(
      API_CONFIG.AUTH.REGISTER_ENDPOINT,
      registerDTO
    );

    if (response) {
      return {
        success: true,
        data: response.jogador || response,
        message: response.message || "Registro realizado com sucesso",
      };
    }

    return {
      success: false,
      message: "Erro ao processar o registro",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao realizar o registro",
    };
  }
};

const logout = (): void => {
  removeToken();
};

const getCurrentUser = (): Jogador | null => {
  return getUserFromToken();
};

export const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  fetchUserProfile,
} as const;
