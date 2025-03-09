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
    nome: "Usuário",
    email: payload.sub,
    apelido: "Usuário",
    posicao: "ATACANTE" as PosicaoType,
  };
};

export const UserAdapter = {
  toJogador,
};
