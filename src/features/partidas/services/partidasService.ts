import { api } from "../../../infrastructure/api";

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
  const response = await api.get("/partidas", { params: filtros });
  return response.data;
};

export const getPartidaById = async (id: string): Promise<Partida> => {
  const response = await api.get(`/partidas/${id}`);
  return response.data;
};

export const criarPartida = async (
  partida: Omit<Partida, "id">
): Promise<Partida> => {
  const response = await api.post("/partidas", partida);
  return response.data;
};

export const atualizarPartida = async (
  id: string,
  partida: Partial<Partida>
): Promise<Partida> => {
  const response = await api.put(`/partidas/${id}`, partida);
  return response.data;
};

export const deletarPartida = async (id: string): Promise<void> => {
  await api.delete(`/partidas/${id}`);
};
