import type { Esporte } from '../enums/Esporte.ts';
import type { TipoPartida } from '../enums/TipoPartida.ts';

export interface PartidaResponse {
  id: number;
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criadorId: number;
  criadorNome: string;
  participantesConfirmados: number;
}
