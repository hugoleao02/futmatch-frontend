import type { Esporte } from '../enums/Esporte.ts';
import type { TipoPartida } from '../enums/TipoPartida.ts';

export interface PartidaRequest {
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  /** Endereço ou nome do local (ex.: autocomplete). */
  nomeLocal?: string | null;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
}
