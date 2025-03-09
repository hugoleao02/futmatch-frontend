import { Jogador } from "../jogador/Jogador";

export interface PartidaDestaque {
  id: number;
  titulo: string;
  data: string;
  local: string;
  timeA: Jogador[];
  timeB: Jogador[];
  placarTimeA: number;
  placarTimeB: number;
}
