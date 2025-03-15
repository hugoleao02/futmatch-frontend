import { PosicaoType } from "../enums";

export interface ConfiguracoesForm {
  receberNotificacoes: boolean;
  notificacoesEmail: boolean;
  notificacoesPush: boolean;
  perfilPublico: boolean;
  mostrarEstatisticas: boolean;
  mostrarHistoricoPartidas: boolean;
  posicao: PosicaoType;
}
