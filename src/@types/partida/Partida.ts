import { Jogador } from "../jogador/Jogador";

export interface Partida {
  id: number;
  titulo: string;
  local: string;
  data: string;
  dataHora: string;
  nivelHabilidade: string;
  maxJogadores: number;
  status: string;
  placarTimeA: number;
  placarTimeB: number;
  timeA: Jogador[];
  timeB: Jogador[];
  salaId: number;
  jogadoresConfirmados: Jogador[];
}
