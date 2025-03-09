import { PosicaoType } from "../enums";
import { Estatisticas } from "./Estatisticas";

export interface Jogador {
  id: number;
  nome: string;
  email: string;
  posicao: PosicaoType;
  estatisticas: Estatisticas;
  avatar?: string;
}
