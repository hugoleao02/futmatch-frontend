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
      const token = getToken();

      if (!token) {
        throw new Error("Token não encontrado");
      }

      // Garantir que o token esteja no cabeçalho
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Tentar com a URL correta para o backend
        const response = await api.get<Jogador>("/jogadores/me", { headers });
        return response.data;
      } catch (apiError) {
        // Tentar com URL alternativa
        try {
          const response = await api.get<Jogador>("/auth/me", { headers });
          return response.data;
        } catch (altError) {
          // Se todas as tentativas falharem, extrair informações do token
          const userData = this.getUserFromToken();
          if (userData) {
            return userData;
          }

          throw altError;
        }
      }
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

  // Método para extrair informações do usuário a partir do token JWT
  getUserFromToken(): Jogador | null {
    try {
      const payload = getTokenPayload();
      if (!payload) return null;

      // Criar um objeto Jogador com as informações disponíveis no token
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
