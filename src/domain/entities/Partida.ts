import type { BaseEntity } from '../../shared/types';

import type { Participacao } from '../types';
import { Esporte, TipoPartida } from '../enums';

// Entidade principal de partida
export interface Partida extends BaseEntity {
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: Date;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criador: {
    id: string;
    nome: string;
  };
  participantes: Participacao[];
  status: PartidaStatus;
  local?: string;
  observacoes?: string;
}

// Status da partida
export type PartidaStatus = 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';

// Partida com informações detalhadas
export interface PartidaDetalhada extends Partida {
  participantesConfirmados: number;
  vagasDisponiveis: number;
  isCriador: boolean;
  isParticipando: boolean;
  hasSolicitado: boolean;
  times?: Time[];
}

// Time da partida
export interface Time {
  id: string;
  nome: string;
  cor: string;
  jogadores: Participacao[];
}

// Response para listagem de partidas
export interface PartidaResponse {
  id: string;
  name: string;
  sport: Esporte;
  location: string;
  date: string;
  time: string;
  currentPlayers: number;
  totalPlayers: number;
  type: string;
  distance: string;
  status: string;
  isRoomMatch: boolean;
  creator?: {
    id: string;
    name: string;
  };
  local?: string;
  observacoes?: string;
}
