import { api } from '@/config/api';
import type { IPartidaRepository } from '@/domain/interfaces/IPartidaRepository';
import { Partida } from '@domain/entities/Partida';
import type { AxiosError } from 'axios';

export class PartidaRepository implements IPartidaRepository {
  async listarPartidas(): Promise<Partida[]> {
    const response = await api.get<Partida[]>('/partidas');
    return response.data.map(
      partida =>
        new Partida(
          partida.id,
          partida.nome,
          partida.esporte,
          new Date(partida.dataHora),
          partida.latitude,
          partida.longitude,
          partida.totalJogadores,
          partida.tipoPartida,
          partida.status,
          partida.participantes,
          new Date(partida.createdAt),
          new Date(partida.updatedAt),
        ),
    );
  }

  async buscarPartidaPorId(id: string): Promise<Partida | null> {
    try {
      const response = await api.get<Partida>(`/partidas/${id}`);
      const partida = response.data;
      return new Partida(
        partida.id,
        partida.nome,
        partida.esporte,
        new Date(partida.dataHora),
        partida.latitude,
        partida.longitude,
        partida.totalJogadores,
        partida.tipoPartida,
        partida.status,
        partida.participantes,
        new Date(partida.createdAt),
        new Date(partida.updatedAt),
      );
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) return null;
      throw error;
    }
  }

  async criarPartida(partida: Omit<Partida, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partida> {
    const response = await api.post<Partida>('/partidas', partida);
    const data = response.data;
    return new Partida(
      data.id,
      data.nome,
      data.esporte,
      new Date(data.dataHora),
      data.latitude,
      data.longitude,
      data.totalJogadores,
      data.tipoPartida,
      data.status,
      data.participantes,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }

  async atualizarPartida(id: string, partida: Partial<Partida>): Promise<Partida> {
    const response = await api.patch<Partida>(`/partidas/${id}`, partida);
    const data = response.data;
    return new Partida(
      data.id,
      data.nome,
      data.esporte,
      new Date(data.dataHora),
      data.latitude,
      data.longitude,
      data.totalJogadores,
      data.tipoPartida,
      data.status,
      data.participantes,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }

  async deletarPartida(id: string): Promise<void> {
    await api.delete(`/partidas/${id}`);
  }

  async participarPartida(id: string, userId: string): Promise<Partida> {
    const response = await api.post<Partida>(`/partidas/${id}/participar`, { userId });
    const data = response.data;
    return new Partida(
      data.id,
      data.nome,
      data.esporte,
      new Date(data.dataHora),
      data.latitude,
      data.longitude,
      data.totalJogadores,
      data.tipoPartida,
      data.status,
      data.participantes,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }

  async sairPartida(id: string, userId: string): Promise<Partida> {
    const response = await api.post<Partida>(`/partidas/${id}/sair`, { userId });
    const data = response.data;
    return new Partida(
      data.id,
      data.nome,
      data.esporte,
      new Date(data.dataHora),
      data.latitude,
      data.longitude,
      data.totalJogadores,
      data.tipoPartida,
      data.status,
      data.participantes,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
