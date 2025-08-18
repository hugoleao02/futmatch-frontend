// Utilitário genérico para transformação de dados
export class DataTransformers {
  /**
   * Transforma dados de resposta de API em entidade de domínio
   */
  static transformApiResponse<T, R>(response: T, transformer: (data: T) => R): R {
    return transformer(response);
  }

  /**
   * Transforma array de respostas de API em array de entidades
   */
  static transformApiResponseArray<T, R>(responses: T[], transformer: (data: T) => R): R[] {
    return responses.map(transformer);
  }

  /**
   * Transforma dados de página (paginação) mantendo metadados
   */
  static transformPageResponse<T, R>(
    pageResponse: { content: T[]; [key: string]: unknown },
    transformer: (data: T) => R,
  ): { content: R[]; [key: string]: unknown } {
    return {
      ...pageResponse,
      content: pageResponse.content.map(transformer),
    };
  }

  /**
   * Cria um transformador que aplica múltiplas transformações
   */
  static composeTransformers<T, U, V>(
    first: (data: T) => U,
    second: (data: U) => V,
  ): (data: T) => V {
    return (data: T) => second(first(data));
  }
}
