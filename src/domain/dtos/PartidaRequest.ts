import type { Esporte } from '../enums/Esporte.ts';
import type { TipoPartida } from '../enums/TipoPartida.ts';

export interface PartidaRequest {
  nome: string;
  esporte: Esporte;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
}
