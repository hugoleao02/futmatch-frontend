import axios from "axios";
import { getToken } from "./tokenService";

const API_URL = "http://localhost:8080";

// Criação da instância do axios com configurações base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviço para consumir a API
const apiService = {
  // Jogadores
  getJogadores: async () => {
    try {
      const response = await api.get("/jogadores");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      throw error;
    }
  },

  getJogadorById: async (id: number) => {
    try {
      const response = await api.get(`/jogadores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar jogador com ID ${id}:`, error);
      throw error;
    }
  },

  getJogadorMe: async () => {
    try {
      const response = await api.get("/jogadores/me");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar perfil do jogador:", error);
      throw error;
    }
  },

  // Salas
  getSalas: async () => {
    try {
      const response = await api.get("/salas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
      throw error;
    }
  },

  getSalaById: async (id: number) => {
    try {
      const response = await api.get(`/salas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar sala com ID ${id}:`, error);
      throw error;
    }
  },

  criarSala: async (salaData: any) => {
    try {
      const response = await api.post("/salas", salaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      throw error;
    }
  },

  entrarSala: async (salaId: number) => {
    try {
      const response = await api.post(`/salas/${salaId}/jogadores`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao entrar na sala ${salaId}:`, error);
      throw error;
    }
  },

  sairSala: async (salaId: number) => {
    try {
      const response = await api.delete(`/salas/${salaId}/jogadores`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao sair da sala ${salaId}:`, error);
      throw error;
    }
  },

  // Partidas
  getPartidas: async () => {
    try {
      const response = await api.get("/partidas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
      throw error;
    }
  },

  getPartidaById: async (id: number) => {
    try {
      const response = await api.get(`/partidas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar partida com ID ${id}:`, error);
      throw error;
    }
  },

  criarPartida: async (partidaData: any) => {
    try {
      const response = await api.post("/partidas", partidaData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar partida:", error);
      throw error;
    }
  },

  atualizarPlacar: async (partidaId: number, placarData: any) => {
    try {
      const response = await api.patch(
        `/partidas/${partidaId}/placar`,
        placarData
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar placar da partida ${partidaId}:`, error);
      throw error;
    }
  },

  finalizarPartida: async (partidaId: number) => {
    try {
      const response = await api.patch(`/partidas/${partidaId}/finalizar`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao finalizar partida ${partidaId}:`, error);
      throw error;
    }
  },
};

export default apiService;
