import { Esporte, TipoPartida } from '../enums';
import type { Solicitacao } from './Solicitacao.ts';
import type { User } from './User.ts';
import type { Time } from './Time.ts';

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
  participantes?: User[];
  solicitacoes?: Solicitacao[];
  times?: Time[] | null;
  isCriador?: boolean;
  isParticipando?: boolean;
  hasSolicitado?: boolean;
}
