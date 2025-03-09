import { HttpClient, IApiError, isApiError } from "../api/HttpClient";
import { toJogador } from "../adapters/UserAdapter";
import { API_CONFIG } from "../../config/api";
import { saveToken, removeToken, getUserFromToken } from "./TokenService";
import { LoginDTO, RegisterDTO, Jogador } from "../../@types";

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
    const user = getUserFromToken();

    if (!user) {
      throw new Error("Erro ao decodificar token do usuário");
    }

    return user;
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
    const user = getUserFromToken();

    if (!user) {
      throw new Error("Erro ao decodificar token do usuário");
    }

    return user;
  } catch (error) {
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
};
