export interface LoginFormValues {
  email: string;
  senha: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegisterFormValues {
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
  posicao: string;
}
