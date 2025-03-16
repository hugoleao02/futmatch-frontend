export interface ConfiguracoesForm {
  privacidade: {
    perfilPublico: boolean;
    mostrarEstatisticas: boolean;
    mostrarHistoricoPartidas: boolean;
  };
  notificacoes: {
    receberNotificacoes: boolean;
    notificacoesEmail: boolean;
    notificacoesPush: boolean;
  };
  preferencias: {
    posicao: string;
  };
  contato: {
    telefone: string;
    whatsapp: boolean;
    telegram: boolean;
    mostrarTelefone: boolean;
  };
  aparencia: {
    tema: "light" | "dark" | "system";
  };
}
