import { HttpClient, IApiError, isApiError } from "../api/HttpClient";
import { FiltroPartidaDTO } from "../../features/partidas/services/partidasService";
import { Partida } from "../../@types/partida/Partida";
import { AtualizarPlacarDTO, CriarPartidaDTO } from "../../@types";

export const listarPartidas = async (
  filtros?: FiltroPartidaDTO
): Promise<Partida[]> => {
  try {
    const endpoint = filtros ? "/partidas/filtrar" : "/partidas";
    const config = filtros ? { params: filtros } : undefined;

    return await HttpClient.get<Partida[]>(endpoint, config);
  } catch (error: unknown) {
    if (isApiError(error)) {
      if (error.isNetworkError) {
        throw new Error("Não foi possível conectar ao servidor");
      }
    }
    throw error;
  }
};

export const listarMinhasPartidas = async (): Promise<Partida[]> => {
  try {
    return await HttpClient.get<Partida[]>("/partidas/minhas");
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    return await HttpClient.get<Partida[]>("/partidas/em-andamento");
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    return await HttpClient.get<Partida>(`/partidas/${id}`);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    return await HttpClient.post<Partida>("/partidas", partidaData);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    return await HttpClient.put<Partida>(`/partidas/${id}/placar`, placarData);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    await HttpClient.post<void>(`/partidas/${id}/participar`);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    await HttpClient.post<void>(`/partidas/${id}/sair`);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
    await HttpClient.delete<void>(`/partidas/${id}`);
  } catch (error: unknown) {
    if (isApiError(error)) {
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
