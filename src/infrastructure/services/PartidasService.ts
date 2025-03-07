import { HttpClient, ApiError } from "../api/HttpClient";
import { API_CONFIG } from "../../config/api";

export interface Jogador {
  id: number;
  nome: string;
  posicao?: string;
  avatar?: string;
}

export interface Partida {
  id: number;
  titulo?: string;
  data: string;
  dataHora?: string;
  local: string;
  status: string;
  placarTimeA: number;
  placarTimeB: number;
  timeA: string;
  timeB: string;
  salaId: number;
  nivelHabilidade?: string;
  maxJogadores?: number;
  jogadoresConfirmados?: Jogador[];
  jogadoresEspera?: Jogador[];
}

export interface CriarPartidaDTO {
  data: string;
  local: string;
  timeA: string;
  timeB: string;
  salaId: number;
}

export interface AtualizarPlacarDTO {
  placarTimeA: number;
  placarTimeB: number;
}

export interface FiltroPartidaDTO {
  nivelHabilidade?: string;
  busca?: string;
}

// Criar uma instância do HttpClient
const httpClient = new HttpClient(API_CONFIG.BASE_URL);

// Funções do serviço
export const listarPartidas = async (
  filtros?: FiltroPartidaDTO
): Promise<Partida[]> => {
  try {
    const endpoint = filtros ? "/partidas/filtrar" : "/partidas";
    const config = filtros ? { params: filtros } : undefined;

    return await httpClient.get<Partida[]>(endpoint, config);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const listarMinhasPartidas = async (): Promise<Partida[]> => {
  try {
    return await httpClient.get<Partida[]>("/partidas/minhas");
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

export const listarPartidasEmAndamento = async (): Promise<Partida[]> => {
  try {
    return await httpClient.get<Partida[]>("/partidas/em-andamento");
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

export const obterPartida = async (id: number): Promise<Partida> => {
  try {
    return await httpClient.get<Partida>(`/partidas/${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Partida não encontrada");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const criarPartida = async (
  partidaData: CriarPartidaDTO
): Promise<Partida> => {
  try {
    return await httpClient.post<Partida>("/partidas", partidaData);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        throw new Error("Dados da partida inválidos");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const atualizarPlacar = async (
  id: number,
  placarData: AtualizarPlacarDTO
): Promise<Partida> => {
  try {
    return await httpClient.put<Partida>(`/partidas/${id}/placar`, placarData);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Partida não encontrada");
      } else if (error.status === 400) {
        throw new Error("Dados do placar inválidos");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const participarPartida = async (id: number): Promise<void> => {
  try {
    await httpClient.post<void>(`/partidas/${id}/participar`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Partida não encontrada");
      } else if (error.status === 400) {
        throw new Error("Não é possível participar desta partida");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const sairPartida = async (id: number): Promise<void> => {
  try {
    await httpClient.post<void>(`/partidas/${id}/sair`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Partida não encontrada");
      } else if (error.status === 400) {
        throw new Error("Não é possível sair desta partida");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const excluirPartida = async (id: number): Promise<void> => {
  try {
    await httpClient.delete<void>(`/partidas/${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error("Partida não encontrada");
      } else if (error.status === 403) {
        throw new Error("Você não tem permissão para excluir esta partida");
      } else if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const PartidasService = {
  listarPartidas,
  listarMinhasPartidas,
  listarPartidasEmAndamento,
  obterPartida,
  criarPartida,
  atualizarPlacar,
  participarPartida,
  sairPartida,
  excluirPartida,
};
