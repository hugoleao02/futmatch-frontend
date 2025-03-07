import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { getToken } from "../services/TokenService";
import { API_CONFIG } from "../../config/api";

// Classe para representar erros da API de forma consistente
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
      // A requisição foi feita e o servidor respondeu com um status fora do intervalo 2xx
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

export class HttpClient {
  private api: AxiosInstance;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: API_CONFIG.WITH_CREDENTIALS,
      timeout: API_CONFIG.TIMEOUT,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
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

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(ApiError.fromAxiosError(error));
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, config);
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
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data, config);
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
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data, config);
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
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url, config);
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
  }
}
