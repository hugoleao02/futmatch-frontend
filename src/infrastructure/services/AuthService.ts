import { LoginDTO, RegisterDTO } from "../../core/domain/dto/AuthDTO";
import { User } from "../../core/domain/entities/User";
import { HttpClient, ApiError } from "../api/HttpClient";
import { UserAdapter } from "../adapters/UserAdapter";
import { API_CONFIG } from "../../config/api";
import { saveToken, removeToken, getUserFromToken } from "./TokenService";

// Criar uma instância do HttpClient
const httpClient = new HttpClient(API_CONFIG.BASE_URL);

// Funções do serviço
export const login = async (credentials: LoginDTO): Promise<string> => {
  try {
    const response = await httpClient.post<{ token: string } | string>(
      API_CONFIG.AUTH.LOGIN_ENDPOINT,
      credentials
    );

    let token = "";

    if (typeof response === "object" && response.token) {
      token = response.token;
    } else if (typeof response === "string") {
      token = response;
    } else {
      throw new Error("Token não encontrado na resposta");
    }

    saveToken(token);
    return token;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        throw new Error("Credenciais inválidas");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const register = async (userData: RegisterDTO): Promise<User> => {
  try {
    const response = await httpClient.post<any>(
      API_CONFIG.AUTH.REGISTER_ENDPOINT,
      userData
    );

    return UserAdapter.fromApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        throw new Error("Dados de registro inválidos");
      } else if (error.status === 409) {
        throw new Error("Email já cadastrado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const getProfile = async (): Promise<User> => {
  try {
    try {
      const response = await httpClient.get<any>(
        API_CONFIG.AUTH.PROFILE_ENDPOINT
      );
      return UserAdapter.fromApiResponse(response);
    } catch (authError) {
      try {
        const response = await httpClient.get<any>(
          API_CONFIG.AUTH.PROFILE_FALLBACK_ENDPOINT
        );
        return UserAdapter.fromApiResponse(response);
      } catch (jogadoresError) {
        const userData = getUserFromToken();
        if (userData) {
          return userData;
        }
        throw jogadoresError;
      }
    }
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const logout = (): void => {
  removeToken();
};

export const AuthService = {
  login,
  register,
  getProfile,
  logout,
};
