// Tipos de usuário
export interface User {
  id: number;
  nome: string;
  email: string;
  avatar?: string;
}

// Tipos de partida
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

// Tipos de participação
export interface Participacao {
  id: number;
  usuarioId: number;
  usuarioNome: string;
  partidaId: number;
  partidaNome: string;
  status: string;
  dataParticipacao: string;
}

export interface Participante {
  id: number;
  nome: string;
  avatar?: string;
}

// Tipos de solicitação
export interface Solicitacao {
  id: number;
  nome: string;
  avatar?: string;
}

// Tipos de time
export interface Time {
  id: number;
  nome: string;
  jogadores: Participante[];
}

// Tipos de autenticação
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

// Tipos de requisição de partida
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

// Tipos de paginação
export interface PagePartidaResponse {
  content: Partida[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Tipos de erro
export interface ApiError {
  message: string;
  status: number;
}

// Re-exportar todos os tipos
export type * from './api';
export type * from './auth';
export type * from './participacao';
export type * from './partida';
export type * from './user';
