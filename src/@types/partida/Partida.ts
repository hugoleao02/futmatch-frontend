import { Jogador } from "../jogador/Jogador";

export interface Partida {
  id: number;
  titulo?: string;
  data: string;
  dataHora?: string;
  dataHoraInicio?: string;
  dataHoraFim?: string;
  local: string;
  status: string;
  placarTimeA: number;
  placarTimeB: number;
  timeA: string | Jogador[];
  timeB: string | Jogador[];
  salaId: number;
  nivelHabilidade?: string;
  maxJogadores?: number;
  jogadoresConfirmados?: Jogador[];
  jogadoresEspera?: Jogador[];
  observacoes?: string;
}
