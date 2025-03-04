import axios from "axios";
import { CriarJogadorDTO, LoginDTO, Jogador } from "../types/api";

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
  const token = localStorage.getItem("token");
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
      console.log("Login response:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        return response.data.token;
      } else if (typeof response.data === "string") {
        // Se a resposta for uma string, assume que é o token
        localStorage.setItem("token", response.data);
        return response.data;
      } else {
        throw new Error("Token não encontrado na resposta");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  async register(userData: CriarJogadorDTO): Promise<Jogador> {
    try {
      const response = await api.post<{ token?: string; jogador?: Jogador }>(
        "/auth/register",
        userData
      );
      console.log("Register response:", response.data);

      // Verifica se a resposta contém um token
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data.jogador || (response.data as unknown as Jogador);
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  },

  async getProfile(): Promise<Jogador> {
    try {
      const response = await api.get<Jogador>("/api/jogadores/me");
      return response.data;
    } catch (error) {
      console.error("Erro ao obter perfil:", error);
      throw error;
    }
  },
};
