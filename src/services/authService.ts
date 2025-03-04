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
  console.log("Interceptor - Token do localStorage:", token);
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
      console.log(
        "Enviando requisição de login para:",
        `${API_URL}/auth/login`
      );
      console.log("Credenciais:", credentials);

      const response = await api.post<AuthResponse>("/auth/login", credentials);
      console.log("Login response status:", response.status);
      console.log("Login response headers:", response.headers);
      console.log("Login response data:", response.data);
      console.log("Tipo da resposta:", typeof response.data);

      let token = "";

      if (response.data && response.data.token) {
        console.log("Token encontrado no objeto:", response.data.token);
        token = response.data.token;
      } else if (typeof response.data === "string") {
        // Se a resposta for uma string, assume que é o token
        console.log("Token é uma string:", response.data);
        token = response.data;
      } else {
        console.error("Formato de resposta inesperado:", response.data);
        throw new Error("Token não encontrado na resposta");
      }

      // Garantir que o token seja salvo no localStorage
      if (token) {
        try {
          localStorage.setItem("token", token);
          console.log(
            "Token salvo no localStorage:",
            localStorage.getItem("token")
          );

          // Verificar se o token foi realmente salvo
          const savedToken = localStorage.getItem("token");
          if (!savedToken) {
            console.error("Falha ao salvar token no localStorage!");
            // Tentar novamente
            localStorage.setItem("token", token);
            console.log(
              "Segunda tentativa de salvar token:",
              localStorage.getItem("token")
            );
          }
        } catch (storageError) {
          console.error("Erro ao salvar token no localStorage:", storageError);
        }
      }

      return token;
    } catch (error) {
      console.error("Erro no login:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalhes do erro Axios:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  async register(userData: CriarJogadorDTO): Promise<Jogador> {
    try {
      console.log(
        "Enviando requisição de registro para:",
        `${API_URL}/auth/register`
      );
      console.log("Dados do usuário:", userData);

      const response = await api.post<{ token?: string; jogador?: Jogador }>(
        "/auth/register",
        userData
      );
      console.log("Register response status:", response.status);
      console.log("Register response data:", response.data);

      // Verifica se a resposta contém um token
      if (response.data && response.data.token) {
        console.log("Token encontrado no registro:", response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log(
          "Token de registro salvo no localStorage:",
          localStorage.getItem("token")
        );
      }

      return response.data.jogador || (response.data as unknown as Jogador);
    } catch (error) {
      console.error("Erro no registro:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalhes do erro Axios:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  async getProfile(): Promise<Jogador> {
    try {
      console.log("Obtendo perfil do usuário...");
      const token = localStorage.getItem("token");
      console.log("Token usado para obter perfil:", token);

      const response = await api.get<Jogador>("/api/jogadores/me");
      console.log("Perfil obtido:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter perfil:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalhes do erro Axios:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  logout(): void {
    console.log("Realizando logout...");
    localStorage.removeItem("token");
    console.log("Token removido do localStorage");
  },
};
