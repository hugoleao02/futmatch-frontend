import { ConfiguracoesForm } from "../../@types";
import { API_CONFIG } from "../../config/api";
import { api } from "../api";

export const atualizarConfiguracoes = async (
  configuracoes: ConfiguracoesForm
): Promise<void> => {
  const response = await api.put(
    `${API_CONFIG.ENDPOINTS.CONFIGURACOES}/jogador`,
    configuracoes
  );
  return response.data;
};
