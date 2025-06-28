// Delay function for retries
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Retry logic
export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000,
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries) {
        await delay(delayMs * Math.pow(2, i)); // Exponential backoff
      }
    }
  }

  throw lastError!;
};

// Cancel request helper
export const createCancelToken = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};

// Query string builder
export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};

// URL builder
export const buildUrl = (
  baseUrl: string,
  path: string,
  params?: Record<string, unknown>,
): string => {
  const url = new URL(path, baseUrl);

  if (params) {
    const queryString = buildQueryString(params);
    if (queryString) {
      url.search = queryString;
    }
  }

  return url.toString();
};

// Error handling
export const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError && error.message.includes('fetch');
};

export const isTimeoutError = (error: unknown): boolean => {
  return error instanceof Error && error.name === 'AbortError';
};

// Response helpers
export const isSuccessResponse = (status: number): boolean => {
  return status >= 200 && status < 300;
};

export const isClientError = (status: number): boolean => {
  return status >= 400 && status < 500;
};

export const isServerError = (status: number): boolean => {
  return status >= 500;
};

/**
 * Verifica se existe um token de autenticação válido
 */
export const checkToken = (): void => {
  // Função vazia - logs removidos
};

/**
 * Testa a conexão com a API
 */
export const testApiConnection = async (): Promise<void> => {
  // Função vazia - logs removidos
};
