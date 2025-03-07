import { HttpClient, ApiError } from "../api/HttpClient";
import { API_CONFIG } from "../../config/api";
import { User } from "../../core/domain/entities/User";
import { UserAdapter } from "../adapters/UserAdapter";

export interface AtualizarPerfilDTO {
  apelido?: string;
  nome?: string;
  posicao?: string;
  avatar?: string;
}

export interface PartidaResumo {
  id: number;
  data: string;
  local: string;
  resultado: string;
  avaliacao: number;
}

export interface Estatisticas {
  totalPartidas: number;
  vitorias: number;
  derrotas: number;
  empates: number;
  golsMarcados: number;
  golsSofridos: number;
  saldoGols: number;
  aproveitamento: number;
  gols: number;
  assistencias: number;
  fairPlayScore: number;
  mediaAvaliacao: number;
  partidasOrganizadas: number;
  cidade: string;
  ultimasPartidas: PartidaResumo[];
}

// Funções do serviço
export const obterPerfil = async (): Promise<User> => {
  try {
    const response = await HttpClient.get<any>("/jogadores/me");
    return UserAdapter.fromApiResponse(response);
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

export const obterJogadorPorId = async (id: number): Promise<User> => {
  try {
    const response = await HttpClient.get<any>(`/jogadores/${id}`);
    return UserAdapter.fromApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Jogador não encontrado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const atualizarPerfil = async (
  perfilData: AtualizarPerfilDTO
): Promise<User> => {
  try {
    const response = await HttpClient.put<any>("/jogadores/me", perfilData);
    return UserAdapter.fromApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        throw new Error("Dados do perfil inválidos");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const obterEstatisticas = async (
  jogadorId?: number
): Promise<Estatisticas> => {
  try {
    const endpoint = jogadorId
      ? `/jogadores/${jogadorId}/estatisticas`
      : "/jogadores/me/estatisticas";

    return await HttpClient.get<Estatisticas>(endpoint);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Jogador não encontrado");
      } else if (error.status === 401) {
        throw new Error("Não autorizado");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const PerfilService = {
  obterPerfil,
  obterJogadorPorId,
  atualizarPerfil,
  obterEstatisticas,
};
