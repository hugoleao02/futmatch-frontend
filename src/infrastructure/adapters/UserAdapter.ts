import { Jogador } from "../../@types";

export const toJogador = (data: any): Jogador => {
  const jogador: Jogador = {
    id: data.id,
    nome: data.nome,
    email: data.email,
    posicao: data.posicao,
    fotoPerfilUrl: data.fotoPerfilUrl,
    citacao: data.citacao,
    estiloJogo: data.estiloJogo,
    ranking: data.ranking || 0,
    rankingLocal: data.rankingLocal || 0,
    melhorNota: data.melhorNota || 0,
    sequenciaVitorias: data.sequenciaVitorias || 0,
    maiorSequenciaVitorias: data.maiorSequenciaVitorias || 0,
    avatarPersonalizadoUrl: data.avatarPersonalizadoUrl,
    temaPerfilUrl: data.temaPerfilUrl,
    badgePersonalizado: data.badgePersonalizado,
    tituloDestaque: data.tituloDestaque,
    rankingAmigos: data.rankingAmigos || 0,
    identificador: data.identificador,
    nomeCompleto: data.nomeCompleto,
    telefone: data.telefone,
    nivelCompetitividade: data.nivelCompetitividade,
    tipoJogador: data.tipoJogador,
    notaMedia: data.notaMedia,
    totalPartidas: data.totalPartidas || 0,
    partidasGanhas: data.partidasGanhas,
    partidasPerdidas: data.partidasPerdidas,
    partidasEmpatadas: data.partidasEmpatadas,
    estatisticas: {
      totalPartidas: data.estatisticas?.totalPartidas || 0,
      totalVitorias: data.estatisticas?.totalVitorias || 0,
      totalDerrotas: data.estatisticas?.totalDerrotas || 0,
      totalEmpates: data.estatisticas?.totalEmpates || 0,
      totalGols: data.estatisticas?.totalGols || 0,
      totalAssistencias: data.estatisticas?.totalAssistencias || 0,
      tempoTotalJogo: data.estatisticas?.tempoTotalJogo || 0,
      mediaNotas: data.estatisticas?.mediaNotas || 0,
      taxaConversaoChutes: data.estatisticas?.taxaConversaoChutes || 0,
      precisaoPasses: data.estatisticas?.precisaoPasses || 0,
      totalDesarmes: data.estatisticas?.totalDesarmes || 0,
      totalInterceptacoes: data.estatisticas?.totalInterceptacoes || 0,
    },
  };
  return jogador;
};

export const UserAdapter = {
  toJogador,
};
