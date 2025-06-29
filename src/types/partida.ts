import type { Participante, Solicitacao, Time } from './participacao';

export interface Partida {
  id: number;
  nome: string;
  esporte: string;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: 'PUBLICA' | 'PRIVADA';
  criadorId: number;
  criadorNome: string;
  participantesConfirmados: number;
  participantes?: Participante[];
  solicitacoes?: Solicitacao[];
  times?: Time[];
  isCriador?: boolean;
  isParticipando?: boolean;
  hasSolicitado?: boolean;
}

export interface PartidaRequest {
  nome: string;
  esporte: string;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: 'PUBLICA' | 'PRIVADA';
}

export interface PartidaUpdateRequest {
  nome?: string;
  esporte?: string;
  latitude?: number;
  longitude?: number;
  dataHora?: string;
  totalJogadores?: number;
  tipoPartida?: 'PUBLICA' | 'PRIVADA';
}

export interface PagePartidaResponse {
  content: Partida[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
