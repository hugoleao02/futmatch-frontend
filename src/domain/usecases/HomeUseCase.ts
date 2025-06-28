import { toast, type ToastOptions } from 'react-toastify';
import type { IPartidaRepository } from '../repositories/IPartidaRepository';
import type { PartidaResponse } from '../types';
import type { IHomeUseCase, SearchFilters } from './interfaces/IHomeUseCase';

export class HomeUseCase implements IHomeUseCase {
  constructor(private readonly partidaRepository: IPartidaRepository) {}

  async getMatches(filters?: SearchFilters): Promise<PartidaResponse[]> {
    try {
      const partidas = await this.partidaRepository.listarPartidas();

      if (!filters) return partidas;

      return partidas.filter(match => {
        if (filters.sport && filters.sport !== 'Todos' && match.esporte !== filters.sport)
          return false;
        if (
          filters.matchType &&
          filters.matchType !== 'Todos' &&
          match.tipoPartida !== filters.matchType
        )
          return false;

        if (filters.date && match.dataHora !== filters.date) return false;
        return true;
      });
    } catch (error) {
      toast.error('Erro ao buscar partidas:', error as ToastOptions);
      return [];
    }
  }

  async getPartidas(filters?: SearchFilters): Promise<PartidaResponse[]> {
    return this.getMatches(filters);
  }

  async generateMatchRecap(matchName: string, details: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return `🎯 Resumo da ${matchName}:\n\nPartida emocionante com ${details}! Os jogadores deram o melhor de si em campo, proporcionando momentos de muita diversão e competição saudável. Foi uma excelente oportunidade de confraternização e prática esportiva.\n\n⚽ Destaque: Todos os participantes demonstraram fair play e espírito esportivo!`;
  }
}
