import { ConfiguracoesForm } from "../../@types";
import { API_CONFIG } from "../../config/apiConfig";
import { HttpClient } from "../api/HttpClient";

interface ConfiguracaoResponse {
  perfilPublico: boolean;
  mostrarEstatisticas: boolean;
  mostrarHistoricoPartidas: boolean;
  receberNotificacoes: boolean;
  notificacoesEmail: boolean;
  notificacoesPush: boolean;
  posicao: string;
  telefone?: string;
  whatsapp?: boolean;
  telegram?: boolean;
  mostrarTelefone?: boolean;
}

export class ConfiguracaoService {
  static async buscarConfiguracao(): Promise<ConfiguracaoResponse> {
    return await HttpClient.get<ConfiguracaoResponse>(
      API_CONFIG.ENDPOINTS.CONFIGURACAO
    );
  }

  static async atualizarConfiguracao(
    configuracoes: Partial<ConfiguracoesForm>
  ) {
    const payload = {
      receberNotificacoes: configuracoes.notificacoes?.receberNotificacoes,
      notificacoesEmail: configuracoes.notificacoes?.notificacoesEmail,
      notificacoesPush: configuracoes.notificacoes?.notificacoesPush,
      perfilPublico: configuracoes.privacidade?.perfilPublico,
      mostrarEstatisticas: configuracoes.privacidade?.mostrarEstatisticas,
      mostrarHistoricoPartidas:
        configuracoes.privacidade?.mostrarHistoricoPartidas,
      posicao: configuracoes.preferencias?.posicao,
      telefone: configuracoes.contato?.telefone,
      whatsapp: configuracoes.contato?.whatsapp,
      telegram: configuracoes.contato?.telegram,
      mostrarTelefone: configuracoes.contato?.mostrarTelefone,
    };

    return await HttpClient.put<ConfiguracaoResponse>(
      API_CONFIG.ENDPOINTS.CONFIGURACAO,
      payload
    );
  }
}
