import { PosicaoType } from "../enums";

export interface RegisterDTO {
  nome: string;
  email: string;
  senha: string;
  posicao: PosicaoType;
}
