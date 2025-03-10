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
      return null;
    }

    saveToken(response.token);

    return await fetchUserProfile();
  } catch (error) {
    return null;
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
    console.log("AuthService: Iniciando chamada de registro...");
    const response = await HttpClient.post<{ token: string }>(
      API_CONFIG.AUTH.REGISTER_ENDPOINT,
      registerDTO
    );
    console.log("AuthService: Resposta da API:", response);

    if (!response || !response.token) {
      console.log("AuthService: Token não encontrado na resposta");
      return {
        success: false,
        message: "Erro ao processar o registro",
      };
    }

    saveToken(response.token);
    console.log("AuthService: Token salvo, buscando perfil do usuário...");
    const userProfile = await fetchUserProfile();

    if (!userProfile) {
      console.log("AuthService: Perfil do usuário não encontrado");
      return {
        success: false,
        message: "Erro ao obter perfil do usuário",
      };
    }

    console.log("AuthService: Registro concluído com sucesso");
    return {
      success: true,
      data: userProfile,
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
