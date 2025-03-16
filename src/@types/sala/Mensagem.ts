export interface Mensagem {
  id: number;
  conteudo: string;
  dataHora: string;
  jogadorId: number;
  jogadorNome: string;
  salaId: number;
  isAnuncio?: boolean;
}

export interface EnviarMensagemDTO {
  conteudo: string;
  salaId: number;
}
