import { Jogador } from "../jogador/Jogador";

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: Jogador;
}
