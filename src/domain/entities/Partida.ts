import type { BaseEntity } from '../../shared/types';

import type { Participacao } from '../types/Participacao';
import type { TipoPartida, Esporte } from '../types';

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
