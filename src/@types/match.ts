import { Jogador } from "./player";
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

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface PartidaDestaque {
  id: string;
  title: string;
  location: string;
  time: string;
  players: string;
  level: string;
}
