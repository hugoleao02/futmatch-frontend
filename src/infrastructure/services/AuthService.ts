import { Jogador, LoginDTO, RegisterDTO } from "../../@types";
import { API_CONFIG } from "../../config/api";
import { HttpClient } from "../api/HttpClient";
import { getUserFromToken, removeToken, saveToken } from "./TokenService";

const formatUserResponse = (user: any): Jogador | null => {
  const userId = typeof user.id === "number" ? user.id : parseInt(user.id);

  if (isNaN(userId)) {
    return null;
  }

  return {
    id: userId,
    nome: user.nome || "Usuário",
    email: user.email,
    posicao: user.posicao || "ATACANTE",
    estatisticas: {
      totalPartidas: user.estatisticas?.totalPartidas || 0,
      vitorias: user.estatisticas?.vitorias || 0,
      derrotas: user.estatisticas?.derrotas || 0,
      empates: user.estatisticas?.empates || 0,
      golsMarcados: user.estatisticas?.golsMarcados || 0,
      golsSofridos: user.estatisticas?.golsSofridos || 0,
      fairPlayScore: user.estatisticas?.fairPlayScore || 0,
    },
  };
};

const fetchUserProfile = async (): Promise<Jogador | null> => {
  try {
    const tokenData = getUserFromToken();
    if (!tokenData) {
      return null;
    }

    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.AUTH.PROFILE_ENDPOINT
      );
      const formattedUser = formatUserResponse(response);
      if (!formattedUser) return tokenData;
      return formattedUser;
    } catch (error) {
      try {
        const response = await HttpClient.get<any>(
          API_CONFIG.AUTH.PROFILE_FALLBACK_ENDPOINT
        );
        const formattedUser = formatUserResponse(response);
        if (!formattedUser) return tokenData;
        return formattedUser;
      } catch (fallbackError) {
        return tokenData;
      }
    }
  } catch (error) {
    return getUserFromToken();
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
