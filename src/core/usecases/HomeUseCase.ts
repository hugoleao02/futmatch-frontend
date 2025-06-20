import { toast, type ToastOptions } from 'react-toastify';
import type { IPartidaRepository } from '../repositories/IPartidaRepository';
import type { IHomeUseCase, Match, Room, SearchFilters } from './interfaces/IHomeUseCase';

export class HomeUseCase implements IHomeUseCase {
  constructor(private readonly partidaRepository: IPartidaRepository) {}

  async getMatches(filters?: SearchFilters): Promise<Match[]> {
    try {
      const partidas = await this.partidaRepository.listarPartidas();

      // Converter PartidaResponse para Match
      const matches: Match[] = partidas.map(partida => ({
        id: partida.id,
        name: partida.nome,
        sport: partida.esporte,
        location: `${partida.latitude}, ${partida.longitude}`,
        date: new Date(partida.dataHora).toLocaleDateString('pt-BR'),
        time: new Date(partida.dataHora).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        currentPlayers: partida.participantes?.length || 0,
        totalPlayers: partida.totalJogadores,
        type: partida.tipoPartida === 'PUBLICA' ? 'Pública' : 'Privada',
        distance: '0 km', // TODO: Implementar cálculo de distância
        status: new Date(partida.dataHora) > new Date() ? 'Próxima' : 'Finalizada',
        isRoomMatch: false,
      }));

      // Aplicar filtros se fornecidos
      if (!filters) return matches;

      return matches.filter(match => {
        if (filters.sport && filters.sport !== 'Todos' && match.sport !== filters.sport)
          return false;
        if (filters.matchType && filters.matchType !== 'Todos' && match.type !== filters.matchType)
          return false;
        if (
          filters.location &&
          !match.location.toLowerCase().includes(filters.location.toLowerCase())
        )
          return false;
        if (filters.date && match.date !== filters.date) return false;
        if (filters.time && match.time !== filters.time) return false;
        return true;
      });
    } catch (error) {
      toast.error('Erro ao buscar partidas:', error as ToastOptions);
      return [];
    }
  }

  async getUserRooms(): Promise<Room[]> {
    // Dados mock - aqui você integraria com repositório real
    return [
      {
        id: 'room1',
        name: 'Amigos da Pelada',
        description: 'Nosso grupo para peladas de fim de semana!',
        membersCount: 15,
        type: 'Privada',
        avatar: 'https://placehold.co/60x60/1B5E20/FFFFFF?text=A',
        recentMatch: 'Jogo Secreto - Campo Y',
      },
      {
        id: 'room2',
        name: 'Futsal da Empresa',
        description: 'Peladas semanais com a galera do trabalho.',
        membersCount: 22,
        type: 'Pública',
        avatar: 'https://placehold.co/60x60/0D47A1/FFFFFF?text=E',
        recentMatch: 'Última partida: 01/06',
      },
    ];
  }

  async generateMatchRecap(matchName: string, details: string): Promise<string> {
    // Simulação de geração de resumo
    await new Promise(resolve => setTimeout(resolve, 2000));

    return `🎯 Resumo da ${matchName}:\n\nPartida emocionante com ${details}! Os jogadores deram o melhor de si em campo, proporcionando momentos de muita diversão e competição saudável. Foi uma excelente oportunidade de confraternização e prática esportiva.\n\n⚽ Destaque: Todos os participantes demonstraram fair play e espírito esportivo!`;
  }
}
