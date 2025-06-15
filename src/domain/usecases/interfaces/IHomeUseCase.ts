import type { PartidaResponse } from '../../types';
import type { Sala } from '../../entities/Sala.ts';

export interface SearchFilters {
  location?: string;
  sport?: string;
  date?: string;
  time?: string;
  matchType?: string;
}

export interface IHomeUseCase {
  getPartidas(filters?: SearchFilters): Promise<PartidaResponse[]>;
  getUserRooms(): Promise<Sala[]>;
  generateMatchRecap(matchName: string, details: string): Promise<string>;
}
