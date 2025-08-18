import type { Participacao } from '../participacao';
import type {
  PagePartidaResponse,
  Partida,
  PartidaRequest,
  PartidaUpdateRequest,
} from '../partida';

// Interfaces para serviços de API
export interface IClienteApi {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, dados?: unknown): Promise<T>;
  put<T>(url: string, dados?: unknown): Promise<T>;
  delete(url: string): Promise<void>;
}

// IServicoAutenticacao está definida em ./auth.ts

export interface IServicoPartida {
  listarPartidas(): Promise<Partida[]>;
  listarPartidasFuturas(pagina?: number, tamanho?: number): Promise<PagePartidaResponse>;
  buscarPartidaPorId(id: number): Promise<Partida>;
  criarPartida(dados: PartidaRequest): Promise<Partida>;
  atualizarPartida(id: number, dados: PartidaUpdateRequest): Promise<Partida>;
  deletarPartida(id: number): Promise<void>;
}

export interface IServicoParticipacao {
  participarPartida(partidaId: number): Promise<Participacao>;
  cancelarParticipacao(partidaId: number): Promise<void>;
  aprovarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
  rejeitarParticipacao(partidaId: number, participanteId: number): Promise<Participacao>;
}
