import { Jogador } from "../jogador/Jogador";

export interface Mensagem {
  id: number;
  conteudo: string;
  dataHora: string;
  autor: Jogador;
  salaId: number;
}

export interface EnviarMensagemDTO {
  conteudo: string;
  salaId: number;
}
