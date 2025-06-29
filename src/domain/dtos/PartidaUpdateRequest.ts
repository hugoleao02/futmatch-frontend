import type { TipoPartida,Esporte } from '../enums';

export interface PartidaUpdateRequest {
  nome?: string;
  esporte?: Esporte;
  latitude?: number;
  longitude?: number;
  dataHora?: string;
  totalJogadores?: number;
  tipoPartida?: TipoPartida;
}
