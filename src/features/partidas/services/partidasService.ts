import { CriarPartidaDTO } from "../../../@types";
import { HttpClient } from "../../../infrastructure/api/HttpClient";

interface ApiResponse<T> {
  data: T;
}

export interface Partida {
  id: string;
  titulo: string;
  local: string;
  dataHora: string;
  maxJogadores: number;
  nivelHabilidade: string;
  jogadoresConfirmados: Array<{
    id: string;
    nome: string;
    posicao?: string;
    avatar?: string;
  }>;
  jogadoresEspera: Array<{
    id: string;
    nome: string;
    posicao?: string;
    avatar?: string;
  }>;
}

export interface FiltroPartidaDTO {
  nivelHabilidade?: string;
  busca?: string;
}

export const listarPartidas = async (
  filtros?: FiltroPartidaDTO
): Promise<Partida[]> => {
  const response = await HttpClient.get<ApiResponse<Partida[]>>("/partidas", {
    params: filtros,
  });
  return response.data;
};

export const getPartidaById = async (id: string): Promise<Partida> => {
  const response = await HttpClient.get<ApiResponse<Partida>>(
    `/partidas/${id}`
  );
  return response.data;
};

export const criarPartida = async (
  partida: CriarPartidaDTO
): Promise<Partida> => {
  const response = await HttpClient.post<ApiResponse<Partida>>(
    "/partidas",
    partida
  );
  return response.data;
};

export const atualizarPartida = async (
  id: string,
  partida: Partial<Partida>
): Promise<Partida> => {
  const response = await HttpClient.put<ApiResponse<Partida>>(
    `/partidas/${id}`,
    partida
  );
  return response.data;
};

export const deletarPartida = async (id: string): Promise<void> => {
  await HttpClient.delete(`/partidas/${id}`);
};
