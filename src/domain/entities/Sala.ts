import type { BaseEntity } from '../../shared/types';
import type { Criador, MembroSala } from './types';

/**
 * Tipos possíveis de sala.
 */
export enum TipoSala {
  Publica = 'Pública',
  Privada = 'Privada',
}

/**
 * Entidade principal de sala.
 */
export interface Sala extends BaseEntity {
  nome: string;
  descricao: string;
  totalParticipantes: number;
  tipo: TipoSala;
  avatar: string;
  partidaRecente?: string;
  criador: Criador;
  membros: MembroSala[];
  regras?: string[];
  tags?: string[];
  status: 'ativa' | 'arquivada' | 'excluida';
  dataCriacao: Date;
  ultimaAtividade: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Sala com informações detalhadas.
 */
export interface SalaDetalhada extends Sala {
  estatisticas: {
    totalPartidas: number;
    mediaParticipantes: number;
    membrosAtivos: number;
  };
  configuracoes: {
    permiteConvites: boolean;
    aprovaAutomatica: boolean;
    limiteMembros: number;
    visibilidadeHistorico: 'todos' | 'membros' | 'admin';
  };
}
