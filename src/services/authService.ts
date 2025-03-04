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
      console.log("authService - Obtendo perfil do usuário");
      const token = getToken();
      console.log(
        "authService - Token para obter perfil:",
        token ? "Presente" : "Ausente"
      );

      if (!token) {
        console.error("authService - Token não encontrado para obter perfil");
        throw new Error("Token não encontrado");
      }

      // Garantir que o token esteja no cabeçalho
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Tentar com a URL correta para o backend
        const response = await api.get<Jogador>("/jogadores/me", { headers });
        console.log("authService - Resposta do perfil:", response.data);
        return response.data;
      } catch (apiError) {
        console.error("authService - Erro na primeira tentativa:", apiError);

        // Tentar com URL alternativa
        try {
          console.log("authService - Tentando URL alternativa");
          const response = await api.get<Jogador>("/auth/me", { headers });
          console.log(
            "authService - Resposta da URL alternativa:",
            response.data
          );
          return response.data;
        } catch (altError) {
          console.error("authService - Erro na URL alternativa:", altError);

          // Se todas as tentativas falharem, extrair informações do token
          console.log("authService - Extraindo informações do token");
          const userData = this.getUserFromToken();
          if (userData) {
            console.log("authService - Dados extraídos do token:", userData);
            return userData;
          }

          throw altError;
        }
      }
    } catch (error) {
      console.error("authService - Erro ao obter perfil:", error);
      if (axios.isAxiosError(error)) {
        console.error("authService - Status:", error.response?.status);
        console.error("authService - Dados:", error.response?.data);
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

      console.log("authService - Payload do token:", payload);

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
      console.error("authService - Erro ao extrair dados do token:", error);
      return null;
    }
  },
};
