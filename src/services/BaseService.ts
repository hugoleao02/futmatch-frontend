import type { IClienteApi } from '../types';

export abstract class ServicoBase {
  protected clienteHttp: IClienteApi;

  constructor(clienteHttp: IClienteApi) {
    this.clienteHttp = clienteHttp;
  }

  protected async lidarComRequisicao<T>(
    requisicao: () => Promise<T>,
    contextoErro: string = 'Operação',
  ): Promise<T> {
    try {
      return await requisicao();
    } catch (error) {
      console.error(`Erro em ${contextoErro}:`, error);
      throw error;
    }
  }

  protected criarUrl(caminho: string, parametros?: Record<string, string | number>): string {
    if (!parametros) return caminho;

    const parametrosQuery = new URLSearchParams();
    Object.entries(parametros).forEach(([chave, valor]) => {
      if (valor !== undefined && valor !== null) {
        parametrosQuery.append(chave, String(valor));
      }
    });

    const stringQuery = parametrosQuery.toString();
    return stringQuery ? `${caminho}?${stringQuery}` : caminho;
  }
}
