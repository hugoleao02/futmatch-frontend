import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { getToken } from "../services/TokenService";
import { API_CONFIG } from "../../config/api";

export class ApiError extends Error {
  public status: number;
  public data: any;
  public isNetworkError: boolean;

  constructor(
    message: string,
    status: number = 0,
    data: any = null,
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.isNetworkError = isNetworkError;
  }

  static fromAxiosError(error: AxiosError): ApiError {
    if (error.response) {
      return new ApiError(
        error.message,
        error.response.status,
        error.response.data,
        false
      );
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      return new ApiError(
        "Não foi possível conectar ao servidor",
        0,
        null,
        true
      );
    } else {
      // Algo aconteceu na configuração da requisição que causou o erro
      return new ApiError(error.message, 0, null, false);
    }
  }
}

// Criar uma instância do Axios com configurações padrão
const createAxiosInstance = (
  baseURL: string = API_CONFIG.BASE_URL
): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: API_CONFIG.WITH_CREDENTIALS,
    timeout: API_CONFIG.TIMEOUT,
  });

  // Configurar interceptors
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  return api;
};

// Instância global do Axios
const api = createAxiosInstance();

// Funções HTTP
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }
    throw new ApiError((error as Error).message);
  }
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }
    throw new ApiError((error as Error).message);
  }
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }
    throw new ApiError((error as Error).message);
  }
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url, config);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }
    throw new ApiError((error as Error).message);
  }
};

// Exportar como objeto para compatibilidade
export const HttpClient = {
  get,
  post,
  put,
  delete: del,
};
