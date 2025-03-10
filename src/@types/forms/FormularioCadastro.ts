import { PosicaoType } from "../enums";

export interface FormularioCadastro {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
  posicao?: PosicaoType;
  nivelHabilidade: number;
}
