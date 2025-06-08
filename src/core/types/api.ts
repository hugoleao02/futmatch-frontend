import type { User } from '../entities/User';

// Respostas de autenticação
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface RegisterResponse {
  user: User;
}

// Requests de autenticação
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export enum TipoPartida {
  PUBLICA = 'PUBLICA',
  PRIVADA = 'PRIVADA',
}

export enum Esporte {
  FUTEBOL = 'FUTEBOL',
  FUTSAL = 'FUTSAL',
}

export interface PartidaRequest {
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
}

export interface PartidaUpdateRequest extends PartidaRequest {
  id: string;
}

export interface Participacao {
  id: string;
  usuarioId: string;
  status: string;
  dataParticipacao: string;
}

export interface PartidaResponse {
  id: string;
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criador: {
    id: string;
    nome: string;
  };
  participantes: Participacao[];
}
