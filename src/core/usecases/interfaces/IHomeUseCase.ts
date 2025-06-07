export interface Match {
  id: string;
  name: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  currentPlayers: number;
  totalPlayers: number;
  type: 'Pública' | 'Privada';
  distance: string;
  status: 'Próxima' | 'Finalizada';
  isRoomMatch: boolean;
  roomId?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  type: 'Pública' | 'Privada';
  avatar: string;
  recentMatch: string;
}

export interface SearchFilters {
  location?: string;
  sport?: string;
  date?: string;
  time?: string;
  matchType?: string;
}

export interface IHomeUseCase {
  getMatches(filters?: SearchFilters): Promise<Match[]>;
  getUserRooms(): Promise<Room[]>;
  generateMatchRecap(matchName: string, details: string): Promise<string>;
}
