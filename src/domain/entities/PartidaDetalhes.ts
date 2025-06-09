import { TipoPartida } from '../enums/TipoPartida';
import type { Team } from './Team';
import type { User } from './User';

export interface PartidaDetalhes {
  id: string;
  nome: string;
  tipoPartida: TipoPartida;
  esporte: string;
  dataHora: string;
  latitude: number;
  longitude: number;
  totalJogadores: number;
  participantesConfirmados: number;
  participantes?: User[];
  solicitacoes: User[];
  times?: Team[];
  isCriador?: boolean;
  isParticipando?: boolean;
  hasSolicitado?: boolean;
}
