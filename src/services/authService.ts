import axios from "axios";
import { CriarJogadorDTO, LoginDTO, Jogador } from "../types/api";
import { getToken } from "../services/tokenService";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AuthResponse {
  token: string;
  jogador?: Jogador;
}

export const authService = {
  async login(credentials: LoginDTO): Promise<string> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);

      let token = "";

      if (response.data && response.data.token) {
        token = response.data.token;
      } else if (typeof response.data === "string") {
        // Se a resposta for uma string, assume que é o token
        const tokenString = response.data as string;
        token = tokenString;
      } else {
        throw new Error("Token não encontrado na resposta");
      }

      // Não salvamos o token aqui, deixamos essa responsabilidade para o contexto de autenticação
      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Repassar o erro para ser tratado pelo chamador
      }
      throw error;
    }
  },

  async register(userData: CriarJogadorDTO): Promise<Jogador> {
    try {
      const response = await api.post<{ token?: string; jogador?: Jogador }>(
        "/auth/register",
        userData
      );

      // Não salvamos o token aqui, deixamos essa responsabilidade para o contexto de autenticação
      return response.data.jogador || (response.data as unknown as Jogador);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Repassar o erro para ser tratado pelo chamador
      }
      throw error;
    }
  },

  async getProfile(): Promise<Jogador> {
    try {
      const response = await api.get<Jogador>("/api/jogadores/me");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Repassar o erro para ser tratado pelo chamador
      }
      throw error;
    }
  },

  logout(): void {
    // Não removemos o token aqui, deixamos essa responsabilidade para o contexto de autenticação
  },
};
