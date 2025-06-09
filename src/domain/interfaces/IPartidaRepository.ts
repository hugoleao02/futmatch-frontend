import type { Partida } from '../entities/Partida';

export interface IPartidaRepository {
  listarPartidas(): Promise<Partida[]>;
  buscarPartidaPorId(id: string): Promise<Partida | null>;
  criarPartida(partida: Omit<Partida, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partida>;
  atualizarPartida(id: string, partida: Partial<Partida>): Promise<Partida>;
  deletarPartida(id: string): Promise<void>;
  participarPartida(id: string, userId: string): Promise<Partida>;
  sairPartida(id: string, userId: string): Promise<Partida>;
}
