import type { Esporte } from './Esporte.ts';
import type { TipoPartida } from './TipoPartida.ts';

export interface PartidaRequest {
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
}
