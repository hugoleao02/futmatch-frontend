/**
 * Tipos de posição de jogador disponíveis
 */
export type PosicaoType =
  | "GOLEIRO"
  | "ZAGUEIRO"
  | "LATERAL"
  | "VOLANTE"
  | "MEIA"
  | "ATACANTE"
  | undefined;

/**
 * Interface para o formulário de login
 */
export interface LoginFormValues {
  email: string;
  senha: string;
}

/**
 * Interface para o formulário de registro
 */
export interface RegisterFormValues {
  apelido: string;
  email: string;
  senha: string;
  confirmSenha: string;
  posicao: PosicaoType;
}
