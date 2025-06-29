import type { BaseEntity } from '../../shared/types';
import { Esporte, TipoPartida } from '../enums';
import type { Participacao } from '../dtos';
import type { Localizacao } from './Localizacao.ts';
import type { User } from './User.ts';


export enum PartidaStatus {
  Agendada = 'agendada',
  EmAndamento = 'em_andamento',
  Concluida = 'concluida',
  Cancelada = 'cancelada',
}


export interface Partida extends BaseEntity {
  nome: string;
  esporte: Esporte;
  localizacao: Localizacao;
  dataHora: Date;
  duracao: number; // em minutos
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criador: User;
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
