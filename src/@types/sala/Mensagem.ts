import { Jogador } from "../jogador/Jogador";

export interface Mensagem {
  id: number;
  conteudo: string;
  dataEnvio: string;
  jogadorId: number;
  jogadorNome: string;
  salaId: number;
  isAnuncio?: boolean;
  dataHora?: string;
}

export interface EnviarMensagemDTO {
  conteudo: string;
  salaId: number;
}
