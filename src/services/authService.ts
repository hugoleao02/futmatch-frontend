import axios from "axios";
import { CriarJogadorDTO, LoginDTO, Jogador } from "../types/api";
import { getToken, getTokenPayload } from "../services/tokenService";

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
        const tokenString = response.data as string;
        token = tokenString;
      } else {
        throw new Error("Token não encontrado na resposta");
      }

      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

      return response.data.jogador || (response.data as unknown as Jogador);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      }
      throw error;
    }
  },

  async getProfile(): Promise<Jogador> {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token não encontrado");
      }

      // Não precisamos definir headers manualmente, pois o interceptor já faz isso
      // Vamos garantir que o token esteja sendo enviado corretamente
      try {
        const response = await api.get<Jogador>("/auth/me");
        return response.data;
      } catch (authError) {
        // Tenta rota alternativa
        try {
          const response = await api.get<Jogador>("/jogadores/me");
          return response.data;
        } catch (jogadoresError) {
          // Se ambas as rotas falharem, tenta extrair dados do token
          const userData = this.getUserFromToken();
          if (userData) {
            return userData;
          }

          throw jogadoresError;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao obter perfil:",
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  logout(): void {},

  getUserFromToken(): Jogador | null {
    try {
      const payload = getTokenPayload();
      if (!payload) return null;

      const jogador: Jogador = {
        id: payload.id || 0,
        apelido: payload.sub || "Usuário",
        email: payload.sub || "",
        posicao: payload.posicao || "ATACANTE",
        nivelHabilidade: payload.nivelHabilidade || 1,
        pontuacaoFairPlay: payload.pontuacaoFairPlay || 0,
        isPremium: payload.isPremium || false,
      };

      return jogador;
    } catch (error) {
      return null;
    }
  },
};
