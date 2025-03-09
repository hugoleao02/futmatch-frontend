import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_CONFIG } from "../../config/api";
import { getToken, removeToken } from "../services/TokenService";

export interface IApiError {
  message: string;
  status: number;
  data: any;
  isNetworkError: boolean;
}

const createApiError = (
  message: string,
  status: number = 0,
  data: any = null,
  isNetworkError: boolean = false
): IApiError => ({
  message,
  status,
  data,
  isNetworkError,
});

const createApiErrorFromAxiosError = (error: AxiosError): IApiError => {
  if (error.response) {
    if (error.response.status === 401) {
      removeToken();
      window.location.href = "/login?expired=true";
      return createApiError(
        "Sua sessão expirou. Por favor, faça login novamente.",
        401,
        error.response.data,
        false
      );
    }
    return createApiError(
      error.message,
      error.response.status,
      error.response.data,
      false
    );
  } else if (error.request) {
    return createApiError(
      "Não foi possível conectar ao servidor",
      0,
      null,
      true
    );
  } else {
    return createApiError(error.message, 0, null, false);
  }
};

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
      return Promise.reject(createApiErrorFromAxiosError(error));
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(createApiErrorFromAxiosError(error));
    }
  );

  return api;
};

// Instância global do Axios
const api = createAxiosInstance();

export const isApiError = (error: any): error is IApiError => {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.status === "number" &&
    typeof error.isNetworkError === "boolean"
  );
};

// Funções HTTP
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw createApiErrorFromAxiosError(error);
    }
    throw createApiError((error as Error).message);
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
    if (isApiError(error)) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw createApiErrorFromAxiosError(error);
    }
    throw createApiError((error as Error).message);
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
    if (isApiError(error)) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw createApiErrorFromAxiosError(error);
    }
    throw createApiError((error as Error).message);
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
    if (isApiError(error)) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw createApiErrorFromAxiosError(error);
    }
    throw createApiError((error as Error).message);
  }
};

// Exportar como objeto para compatibilidade
export const HttpClient = {
  get,
  post,
  put,
  delete: del,
};
