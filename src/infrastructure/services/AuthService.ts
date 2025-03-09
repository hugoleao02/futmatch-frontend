import { Jogador, LoginDTO, RegisterDTO } from "../../@types";
import { API_CONFIG } from "../../config/api";
import { HttpClient, isApiError } from "../api/HttpClient";
import { getUserFromToken, removeToken, saveToken } from "./TokenService";

const formatUserResponse = (user: any): Jogador => {
  const userId = typeof user.id === "number" ? user.id : parseInt(user.id);

  if (isNaN(userId)) {
    throw new Error("ID do usuário inválido");
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

export const fetchUserProfile = async (): Promise<Jogador> => {
  try {
    // Tenta primeiro o endpoint principal
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.AUTH.PROFILE_ENDPOINT
      );
      return formatUserResponse(response);
    } catch (error) {
      console.log("Tentando endpoint alternativo...");
      const response = await HttpClient.get<any>(
        API_CONFIG.AUTH.PROFILE_FALLBACK_ENDPOINT
      );
      return formatUserResponse(response);
    }
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw new Error("Não foi possível obter os dados do usuário");
  }
};

export const login = async (loginDTO: LoginDTO): Promise<Jogador> => {
  try {
    const response = await HttpClient.post<{ token: string }>(
      API_CONFIG.AUTH.LOGIN_ENDPOINT,
      loginDTO
    );

    if (!response || !response.token) {
      throw new Error("Token não recebido do servidor");
    }

    saveToken(response.token);

    return await fetchUserProfile();
  } catch (error) {
    if (isApiError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao realizar login");
  }
};

export const register = async (registerDTO: RegisterDTO): Promise<Jogador> => {
  try {
    const response = await HttpClient.post<{ token: string }>(
      API_CONFIG.AUTH.REGISTER_ENDPOINT,
      registerDTO
    );

    if (!response || !response.token) {
      throw new Error("Token não recebido do servidor");
    }

    saveToken(response.token);

    // Busca o perfil real do usuário após o registro
    return await fetchUserProfile();
  } catch (error) {
    console.error("Erro no registro:", error);
    if (isApiError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao realizar cadastro");
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
