import { NivelCompetitividade } from "../enums/NivelCompetitividade";
import { TipoInscricao } from "../enums/TipoInscricao";
import { TipoJogador } from "../enums/TipoJogador";
import { TipoJogo } from "../enums/TipoJogo";

export interface CriarSalaCommand {
  nome: string;
  descricao: string;
  dataHoraPartida: string;
  local: string;
  endereco: string;
  duracao: number;
  numeroMinimoJogadores: number;
  maxJogadores: number;
  valorPorJogador?: number;
  tipoInscricao: TipoInscricao;
  tipoJogadorPermitido: TipoJogador;
  pontuacaoMinimaFairPlay?: number;
  permitirSubstituicoesAutomaticas: boolean;
  criadorId: number;
  tipoJogo: TipoJogo;
  nivelCompetitividade: NivelCompetitividade;
}
