import type { Esporte } from '../enums/Esporte.ts';
import type { TipoPartida } from '../enums/TipoPartida.ts';
import type { Participacao } from './Participacao.ts';

export interface PartidaResponse {
  id: string;
  nome: string;
  esporte: Esporte;
  latitude: number;
  longitude: number;
  dataHora: string;
  totalJogadores: number;
  tipoPartida: TipoPartida;
  criador: {
    id: string;
    nome: string;
  };
  participantes: Participacao[];
  isPartidaSala?: boolean;
}
