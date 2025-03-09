import { Jogador, PosicaoType } from "../../@types";

export const toJogador = (response: any): Jogador => {
  const token = response.token;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  const payload = JSON.parse(jsonPayload);
  return {
    id: payload.sub,
    nome: payload.nome,
    email: payload.sub,
    posicao: payload.posicao as PosicaoType,
    estatisticas: {
      totalPartidas: 0,
      vitorias: 0,
      derrotas: 0,
      empates: 0,
      golsMarcados: 0,
      golsSofridos: 0,
      fairPlayScore: 0,
    },
  };
};

export const UserAdapter = {
  toJogador,
};
