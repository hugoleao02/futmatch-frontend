import { User } from "../entities/User";

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegisterDTO {
  apelido: string;
  email: string;
  senha: string;
  posicao: string;
}

export interface AuthResponseDTO {
  token: string;
  user?: User;
}
