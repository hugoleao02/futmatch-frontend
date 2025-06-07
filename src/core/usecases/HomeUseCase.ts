import type { IHomeUseCase, Match, Room, SearchFilters } from './interfaces/IHomeUseCase';

export class HomeUseCase implements IHomeUseCase {
  async getMatches(filters?: SearchFilters): Promise<Match[]> {
    // Dados mock - aqui você integraria com repositório real
    const mockMatches: Match[] = [
      {
        id: '1',
        name: 'Pelada da Vila',
        sport: 'Futebol',
        location: 'Rua das Flores, 123 - Centro',
        date: '10/06/2025',
        time: '20:00',
        currentPlayers: 8,
        totalPlayers: 12,
        type: 'Pública',
        distance: '2.5 km',
        status: 'Próxima',
        isRoomMatch: false,
      },
      {
        id: '2',
        name: 'Futsal Noturno - Ginásio X',
        sport: 'Futsal',
        location: 'Av. Principal, 456 - Bairro Novo',
        date: '11/06/2025',
        time: '19:30',
        currentPlayers: 6,
        totalPlayers: 10,
        type: 'Pública',
        distance: '5.1 km',
        status: 'Próxima',
        isRoomMatch: false,
      },
      {
        id: '3',
        name: 'Jogo Secreto - Campo Y',
        sport: 'Futebol',
        location: 'Rua Escondida, 789 - Zona Sul',
        date: '03/06/2025',
        time: '21:00',
        currentPlayers: 10,
        totalPlayers: 10,
        type: 'Privada',
        distance: '1.8 km',
        status: 'Finalizada',
        isRoomMatch: true,
        roomId: 'room1',
      },
      {
        id: '4',
        name: 'Rachão Amigos do Bola',
        sport: 'Futebol',
        location: 'Praça da Bandeira, S/N',
        date: '10/06/2025',
        time: '18:30',
        currentPlayers: 11,
        totalPlayers: 12,
        type: 'Pública',
        distance: '0.9 km',
        status: 'Próxima',
        isRoomMatch: false,
      },
    ];

    // Aplicar filtros se fornecidos
    if (!filters) return mockMatches;

    return mockMatches.filter(match => {
      if (filters.sport && filters.sport !== 'Todos' && match.sport !== filters.sport) return false;
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
