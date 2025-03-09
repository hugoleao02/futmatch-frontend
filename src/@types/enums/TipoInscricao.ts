export enum TipoInscricao {
  ABERTA = "ABERTA",
  FECHADA = "FECHADA",
  APENAS_CONVIDADOS = "APENAS_CONVIDADOS",
}

export const TipoInscricaoDescricao = {
  [TipoInscricao.ABERTA]: "Aberta (qualquer um pode participar)",
  [TipoInscricao.FECHADA]: "Fechada",
  [TipoInscricao.APENAS_CONVIDADOS]: "Apenas convidados",
};
