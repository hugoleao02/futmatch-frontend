import { Jogador } from "../jogador/Jogador";

export interface Sala {
  id: number;
  nome: string;
  descricao?: string;
  maxJogadores: number;
  jogadoresConfirmados: Jogador[];
  jogadoresEspera: Jogador[];
  status: string;
  nivelHabilidade?: string;
  criadoPor: Jogador;
  dataHora: string;
}
