import axios from "axios";
import { getToken } from "./tokenService";
import {
  CriarSalaDTO,
  CriarPartidaDTO,
  AtualizarPlacarDTO,
  CriarJogadorDTO,
  LoginDTO,
} from "../types/api";

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
  // Autenticação
  auth: {
    login: async (credentials: LoginDTO) => {
      try {
        const response = await api.post("/auth/login", credentials);
        return response.data;
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },

    register: async (userData: CriarJogadorDTO) => {
      try {
        const response = await api.post("/auth/register", userData);
        return response.data;
      } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        throw error;
      }
    },
  },

  // Jogadores
  jogadores: {
    getProfile: async () => {
      try {
        const response = await api.get("/api/jogadores/perfil");
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar perfil do jogador:", error);
        throw error;
      }
    },

    getJogadorById: async (id: number) => {
      try {
        const response = await api.get(`/api/jogadores/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao buscar jogador com ID ${id}:`, error);
        throw error;
      }
    },
  },

  // Salas
  salas: {
    listarSalasAtivas: async () => {
      try {
        const response = await api.get("/salas");
        return response.data;
      } catch (error) {
        console.error("Erro ao listar salas ativas:", error);
        throw error;
      }
    },

    buscarPorId: async (id: number) => {
      try {
        const response = await api.get(`/salas/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao buscar sala com ID ${id}:`, error);
        throw error;
      }
    },

    buscarPorLocalizacao: async (localizacao: string) => {
      try {
        const response = await api.get(
          `/salas/buscar?localizacao=${encodeURIComponent(localizacao)}`
        );
        return response.data;
      } catch (error) {
        console.error(
          `Erro ao buscar salas por localização ${localizacao}:`,
          error
        );
        throw error;
      }
    },

    criarSala: async (salaData: CriarSalaDTO) => {
      try {
        const response = await api.post("/salas", salaData);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar sala:", error);
        throw error;
      }
    },

    deletarSala: async (id: number) => {
      try {
        const response = await api.delete(`/salas/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao deletar sala ${id}:`, error);
        throw error;
      }
    },

    entrarNaSala: async (id: number) => {
      try {
        const response = await api.post(`/salas/${id}/entrar`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao entrar na sala ${id}:`, error);
        throw error;
      }
    },

    sairDaSala: async (id: number) => {
      try {
        const response = await api.post(`/salas/${id}/sair`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao sair da sala ${id}:`, error);
        throw error;
      }
    },
  },

  // Partidas
  partidas: {
    criarPartida: async (partidaData: CriarPartidaDTO) => {
      try {
        const response = await api.post("/api/partidas", partidaData);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar partida:", error);
        throw error;
      }
    },

    buscarPorId: async (id: number) => {
      try {
        const response = await api.get(`/api/partidas/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao buscar partida com ID ${id}:`, error);
        throw error;
      }
    },

    listarPartidasDaSala: async (salaId: number) => {
      try {
        const response = await api.get(`/api/partidas/sala/${salaId}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao listar partidas da sala ${salaId}:`, error);
        throw error;
      }
    },

    listarMinhasPartidas: async () => {
      try {
        const response = await api.get("/api/partidas/minhas");
        return response.data;
      } catch (error) {
        console.error("Erro ao listar minhas partidas:", error);
        throw error;
      }
    },

    listarPartidasEmAndamento: async () => {
      try {
        const response = await api.get("/api/partidas/em-andamento");
        return response.data;
      } catch (error) {
        console.error("Erro ao listar partidas em andamento:", error);
        throw error;
      }
    },

    iniciarPartida: async (partidaId: number) => {
      try {
        const response = await api.post(`/api/partidas/${partidaId}/iniciar`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao iniciar partida ${partidaId}:`, error);
        throw error;
      }
    },

    finalizarPartida: async (partidaId: number) => {
      try {
        const response = await api.post(`/api/partidas/${partidaId}/finalizar`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao finalizar partida ${partidaId}:`, error);
        throw error;
      }
    },

    atualizarPlacar: async (
      partidaId: number,
      placarData: AtualizarPlacarDTO
    ) => {
      try {
        const response = await api.put(
          `/api/partidas/${partidaId}/placar`,
          placarData
        );
        return response.data;
      } catch (error) {
        console.error(
          `Erro ao atualizar placar da partida ${partidaId}:`,
          error
        );
        throw error;
      }
    },
  },

  // Assinaturas
  assinaturas: {
    criarAssinatura: async (assinaturaData: any) => {
      try {
        const response = await api.post("/api/assinaturas", assinaturaData);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar assinatura:", error);
        throw error;
      }
    },

    buscarAssinatura: async (id: number) => {
      try {
        const response = await api.get(`/api/assinaturas/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao buscar assinatura com ID ${id}:`, error);
        throw error;
      }
    },

    listarAssinaturasJogador: async (jogadorId: number) => {
      try {
        const response = await api.get(`/api/assinaturas/jogador/${jogadorId}`);
        return response.data;
      } catch (error) {
        console.error(
          `Erro ao listar assinaturas do jogador ${jogadorId}:`,
          error
        );
        throw error;
      }
    },

    buscarAssinaturaAtiva: async (jogadorId: number) => {
      try {
        const response = await api.get(
          `/api/assinaturas/jogador/${jogadorId}/ativa`
        );
        return response.data;
      } catch (error) {
        console.error(
          `Erro ao buscar assinatura ativa do jogador ${jogadorId}:`,
          error
        );
        throw error;
      }
    },

    ativarAssinatura: async (id: number, ativacaoData: any) => {
      try {
        const response = await api.put(
          `/api/assinaturas/${id}/ativar`,
          ativacaoData
        );
        return response.data;
      } catch (error) {
        console.error(`Erro ao ativar assinatura ${id}:`, error);
        throw error;
      }
    },

    renovarAssinatura: async (id: number, renovacaoData: any) => {
      try {
        const response = await api.put(
          `/api/assinaturas/${id}/renovar`,
          renovacaoData
        );
        return response.data;
      } catch (error) {
        console.error(`Erro ao renovar assinatura ${id}:`, error);
        throw error;
      }
    },

    cancelarAssinatura: async (id: number) => {
      try {
        const response = await api.put(`/api/assinaturas/${id}/cancelar`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao cancelar assinatura ${id}:`, error);
        throw error;
      }
    },
  },
};

export default apiService;
