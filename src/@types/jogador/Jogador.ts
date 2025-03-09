import { PosicaoType } from "../enums";
import { Estatisticas } from "./Estatisticas";

export interface Jogador {
  id: string;
  nome: string;
  email: string;
  posicao: PosicaoType;
  estatisticas?: Estatisticas;
}
