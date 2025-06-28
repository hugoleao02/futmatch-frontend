import type { BaseEntity } from '../../shared/types';
import { Esporte, TipoPartida } from '../enums';
import type { Participacao } from '../types';
import type { Criador, Localizacao } from './types';

/**
 * Status possíveis para uma partida.
 */
export enum PartidaStatus {
  Agendada = 'agendada',
  EmAndamento = 'em_andamento',
  Concluida = 'concluida',
  Cancelada = 'cancelada',
}

/**
 * Entidade principal de partida.
 */
export interface Partida extends BaseEntity {
  nome: string;
  esporte: Esporte;
  localizacao: Localizacao;
  dataHora: Date;
  duracao: number; // em minutos
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criador: Criador;
  participantes: Participacao[];
  status: PartidaStatus;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  regras?: string[];
  observacoes?: string;
  tags?: string[];
  custo?: number;
  equipamentos?: string[];
  requisitos?: string[];
  deletedAt?: Date | null;
}

/**
 * Partida com informações detalhadas.
 */
export interface PartidaDetalhada extends Partida {
  participantesConfirmados: number;
  vagasDisponiveis: number;
  isCriador: boolean;
  isParticipando: boolean;
  hasSolicitado: boolean;
  times?: Time[];
  estatisticas: {
    mediaParticipantes: number;
    taxaConfirmacao: number;
    avaliacaoMedia: number;
  };
  historico: {
    dataCriacao: Date;
    ultimaAtualizacao: Date;
    alteracoes: {
      data: Date;
      tipo: 'criacao' | 'atualizacao' | 'cancelamento';
      descricao: string;
    }[];
  };
}

/**
 * Time da partida.
 */
export interface Time {
  id: string;
  nome: string;
  cor: string;
  jogadores: Participacao[];
  capitao?: Criador;
  estatisticas?: {
    vitorias: number;
    derrotas: number;
    empates: number;
  };
}

/**
 * Response para listagem de partidas.
 */
export interface PartidaResponse {
  id: string;
  nome: string;
  esporte: Esporte;
  localizacao: Localizacao;
  data: string;
  hora: string;
  jogadoresAtuais: number;
  totalJogadores: number;
  tipo: TipoPartida;
  distancia: string;
  status: PartidaStatus;
  criador?: Criador;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  tags?: string[];
}
