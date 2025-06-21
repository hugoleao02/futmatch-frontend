import { toast, type ToastOptions } from 'react-toastify';
import { TipoSala } from '../entities/Sala';
import type { Sala } from '../entities/Sala.ts';
import type { IPartidaRepository } from '../repositories/IPartidaRepository';
import type { PartidaResponse } from '../types';
import type { IHomeUseCase, SearchFilters } from './interfaces/IHomeUseCase';

export class HomeUseCase implements IHomeUseCase {
  constructor(private readonly partidaRepository: IPartidaRepository) {}

  async getMatches(filters?: SearchFilters): Promise<PartidaResponse[]> {
    try {
      const partidas = await this.partidaRepository.listarPartidas();

      const partidaResponses: PartidaResponse[] = partidas.map(partida => ({
        id: partida.id,
        nome: partida.nome,
        esporte: partida.esporte,
        latitude: partida.latitude,
        longitude: partida.longitude,
        dataHora: partida.dataHora,
        totalJogadores: partida.totalJogadores,
        tipoPartida: partida.tipoPartida,
        criador: partida.criador,
        participantes: partida.participantes || [],
      }));

      // Aplicar filtros se fornecidos
      if (!filters) return partidaResponses;

      return partidaResponses.filter(match => {
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

  async getUserRooms(): Promise<Sala[]> {
    // Dados mock - aqui você integraria com repositório real
    const now = new Date();
    return [
      {
        id: 'room1',
        nome: 'Amigos da Pelada',
        descricao: 'Nosso grupo para peladas de fim de semana!',
        totalParticipantes: 15,
        tipo: TipoSala.Privada,
        avatar: 'https://placehold.co/60x60/1B5E20/FFFFFF?text=A',
        partidaRecente: 'Jogo Secreto - Campo Y',
        criador: {
          id: 'user1',
          nome: 'João Silva',
          avatar: 'https://placehold.co/40x40/1B5E20/FFFFFF?text=J',
        },
        membros: [
          {
            id: 'user1',
            nome: 'João Silva',
            avatar: 'https://placehold.co/40x40/1B5E20/FFFFFF?text=J',
            role: 'admin',
          },
        ],
        regras: ['Fair play', 'Respeito aos colegas'],
        tags: ['pelada', 'fim-de-semana'],
        status: 'ativa',
        dataCriacao: now,
        ultimaAtividade: now,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
      {
        id: 'room2',
        nome: 'Pelada do Bairro',
        descricao: 'Peladas semanais no campo do bairro!',
        totalParticipantes: 20,
        tipo: TipoSala.Publica,
        avatar: 'https://placehold.co/60x60/1976D2/FFFFFF?text=P',
        partidaRecente: 'Pelada do Sábado - Campo X',
        criador: {
          id: 'user2',
          nome: 'Maria Santos',
          avatar: 'https://placehold.co/40x40/1976D2/FFFFFF?text=M',
        },
        membros: [
          {
            id: 'user2',
            nome: 'Maria Santos',
            avatar: 'https://placehold.co/40x40/1976D2/FFFFFF?text=M',
            role: 'admin',
          },
        ],
        regras: ['Fair play', 'Respeito aos colegas'],
        tags: ['pelada', 'semanal'],
        status: 'ativa',
        dataCriacao: now,
        ultimaAtividade: now,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
    ];
  }

  async generateMatchRecap(matchName: string, details: string): Promise<string> {
    // Simulação de geração de resumo
    await new Promise(resolve => setTimeout(resolve, 2000));

    return `🎯 Resumo da ${matchName}:\n\nPartida emocionante com ${details}! Os jogadores deram o melhor de si em campo, proporcionando momentos de muita diversão e competição saudável. Foi uma excelente oportunidade de confraternização e prática esportiva.\n\n⚽ Destaque: Todos os participantes demonstraram fair play e espírito esportivo!`;
  }
}
