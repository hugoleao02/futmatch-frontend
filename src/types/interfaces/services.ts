import type { Participacao } from '../participacao';
import type {
  PagePartidaResponse,
  Partida,
  PartidaRequest,
  PartidaUpdateRequest,
} from '../partida';

// Interfaces para serviços de API
export interface IApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: unknown): Promise<T>;
  put<T>(url: string, data?: unknown): Promise<T>;
  delete(url: string): Promise<void>;
}

// IAuthService está definida em ./auth.ts

export interface IPartidaService {
  listarPartidas(): Promise<Partida[]>;
  listarPartidasFuturas(page?: number, size?: number): Promise<PagePartidaResponse>;
  buscarPartidaPorId(id: number): Promise<Partida>;
  criarPartida(data: PartidaRequest): Promise<Partida>;
  atualizarPartida(id: number, data: PartidaUpdateRequest): Promise<Partida>;
  deletarPartida(id: number): Promise<void>;
}

export interface IParticipacaoService {
  participarPartida(partidaId: number): Promise<Participacao>;
  cancelarParticipacao(partidaId: number): Promise<void>;
  aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
  rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
}
