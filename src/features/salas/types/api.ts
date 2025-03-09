export interface Jogador {
  id: string;
  nome: string;
  apelido: string;
  email: string;
  posicao?: string;
  nivelHabilidade?: number;
  pontuacaoFairPlay?: number;
}

export interface Sala {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
  capacidade: number;
  dataHora?: string;
  criadoPor: string;
  dataCriacao: string;
  dataUltimaAtividade?: string;
  isPublica: boolean;
  aceitaAutomatico: boolean;
  nivelMinimo?: number;
  nivelMaximo?: number;
  minimoFairPlay?: number;
  regrasPersonalizadas?: string;
  restricoesPosicao?: Record<string, number>;
  jogadores: Jogador[];
  moderadores?: Jogador[];
  numeroJogadores: number;
}

export interface Mensagem {
  id: number;
  conteudo: string;
  jogadorId: string;
  jogadorNome: string;
  dataHora: string;
  isAnuncio?: boolean;
}

export interface EnviarMensagemDTO {
  conteudo: string;
  salaId: number;
}

export interface CriarSalaDTO {
  nome: string;
  descricao: string;
  localizacao: string;
  capacidade: number;
}
