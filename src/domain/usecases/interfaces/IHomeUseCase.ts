import type { PartidaResponse } from '../../dtos';

export interface SearchFilters {
  location?: string;
  sport?: string;
  date?: string;
  time?: string;
  matchType?: string;
}

export interface IHomeUseCase {
  getPartidas(filters?: SearchFilters): Promise<PartidaResponse[]>;
  generateMatchRecap(matchName: string, details: string): Promise<string>;
}
