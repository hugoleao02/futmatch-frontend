import { User } from "../../core/domain/entities/User";

// Interface que representa o tipo Jogador da API
export interface JogadorDTO {
  id: number;
  apelido: string;
  email: string;
  posicao: string;
  nivelHabilidade: number;
  pontuacaoFairPlay: number;
  isPremium: boolean;
  nome?: string;
  avatar?: string;
}

/**
 * Converte um JogadorDTO para uma entidade User do domínio
 */
export const toUser = (jogador: JogadorDTO): User => {
  return {
    id: jogador.id,
    apelido: jogador.apelido,
    email: jogador.email,
    posicao: jogador.posicao,
    nivelHabilidade: jogador.nivelHabilidade,
    pontuacaoFairPlay: jogador.pontuacaoFairPlay,
    isPremium: jogador.isPremium,
    nome: jogador.nome || jogador.apelido,
    avatar: jogador.avatar || "",
  };
};

/**
 * Converte uma entidade User do domínio para um JogadorDTO
 */
export const toJogadorDTO = (user: User): JogadorDTO => {
  return {
    id: user.id,
    apelido: user.apelido,
    email: user.email,
    posicao: user.posicao,
    nivelHabilidade: user.nivelHabilidade,
    pontuacaoFairPlay: user.pontuacaoFairPlay,
    isPremium: user.isPremium,
    nome: user.nome,
    avatar: user.avatar,
  };
};

/**
 * Converte um objeto de resposta da API para uma entidade User
 */
export const fromApiResponse = (response: any): User => {
  // Se a resposta já tiver a estrutura de um jogador
  if (response && response.id !== undefined) {
    return toUser(response as JogadorDTO);
  }

  // Se a resposta tiver um campo jogador
  if (response && response.jogador) {
    return toUser(response.jogador as JogadorDTO);
  }

  throw new Error("Formato de resposta inválido para conversão para User");
};

// Exportar como objeto para compatibilidade
export const UserAdapter = {
  toUser,
  toJogadorDTO,
  fromApiResponse,
};
