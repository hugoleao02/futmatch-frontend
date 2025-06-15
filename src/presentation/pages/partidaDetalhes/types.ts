import { TipoPartida, Esporte } from '../../../domain/enums';

export interface Participante {
  id: string;
  nome: string;
  avatar: string;
}

export interface Solicitacao {
  id: string;
  userId: string;
  nome: string;
  avatar: string;
}

export interface Time {
  nome: string;
  jogadores: Participante[];
}

export interface PartidaDetalhes {
  id: string;
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  participantesConfirmados: number;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criadorId: number;
  criadorNome: string;
  participantes?: Participante[];
  solicitacoes?: Solicitacao[];
  times?: Time[] | null;
  isCriador?: boolean;
  isParticipando?: boolean;
  hasSolicitado?: boolean;
}
