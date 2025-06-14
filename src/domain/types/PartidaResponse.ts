import type { Participacao } from './Participacao.ts';
import type { TipoPartida } from './TipoPartida.ts';
import type { Esporte } from './Esporte.ts';


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
}
