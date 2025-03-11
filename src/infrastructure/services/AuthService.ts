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

export const fetchUserProfile = async (): Promise<Jogador | null> => {
  try {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.AUTH.PROFILE_ENDPOINT
      );
      const formattedUser = formatUserResponse(response);
      if (!formattedUser) return null;
      return formattedUser;
    } catch (error) {
      const response = await HttpClient.get<any>(
        API_CONFIG.AUTH.PROFILE_FALLBACK_ENDPOINT
      );
      const formattedUser = formatUserResponse(response);
      if (!formattedUser) return null;
      return formattedUser;
    }
  } catch (error) {
    return null;
  }
};

export const login = async (loginDTO: LoginDTO): Promise<Jogador | null> => {
  try {
    const response = await HttpClient.post<{ token: string }>(
      API_CONFIG.AUTH.LOGIN_ENDPOINT,
      loginDTO
    );

    if (!response || !response.token) {
      throw new Error("Token não recebido do servidor");
    }

    saveToken(response.token);

    try {
      const userProfile = await fetchUserProfile();
      if (!userProfile) {
        throw new Error("Não foi possível carregar o perfil do usuário");
      }
      return userProfile;
    } catch (profileError) {
      return {} as Jogador;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Credenciais inválidas");
  }
};

interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: Jogador;
}

export const register = async (
  registerDTO: RegisterDTO
): Promise<RegisterResponse> => {
  try {
    console.log(
      "AuthService: Iniciando chamada de registro com payload:",
      JSON.stringify(registerDTO, null, 2)
    );
    const response = await HttpClient.post<any>(
      API_CONFIG.AUTH.REGISTER_ENDPOINT,
      registerDTO
    );
    console.log(
      "AuthService: Resposta da API:",
      JSON.stringify(response, null, 2)
    );

    if (response) {
      console.log("AuthService: Registro concluído com sucesso");
      return {
        success: true,
        data: response.jogador || response,
        message: response.message || "Registro realizado com sucesso",
      };
    }

    console.log("AuthService: Dados do jogador não encontrados na resposta");
    return {
      success: false,
      message: "Erro ao processar o registro",
    };
  } catch (error: any) {
    console.error("AuthService: Erro detalhado no registro:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao realizar o registro",
    };
  }
};

export const logout = (): void => {
  removeToken();
};

export const getCurrentUser = (): Jogador | null => {
  return getUserFromToken();
};

export const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  fetchUserProfile,
};
