import type { IApiClient } from '../types';

export abstract class BaseService {
  protected httpClient: IApiClient;

  constructor(httpClient: IApiClient) {
    this.httpClient = httpClient;
  }

  protected async handleRequest<T>(
    request: () => Promise<T>,
    errorContext: string = 'Operação'
  ): Promise<T> {
    try {
      return await request();
    } catch (error) {
      console.error(`Erro em ${errorContext}:`, error);
      throw error;
    }
  }

  protected createUrl(path: string, params?: Record<string, string | number>): string {
    if (!params) return path;
    
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    
    const queryString = queryParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  }
}
