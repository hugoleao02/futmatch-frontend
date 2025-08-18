import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_CONFIG } from '../config/api';
import type { IApiClient } from '../types';

export class HttpClient implements IApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Interceptor para adicionar token de autenticação
    this.client.interceptors.request.use(
      config => {
        const token = this.getStoredToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    // Interceptor para tratar erros
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      error => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      },
    );
  }

  private getStoredToken(): string | null {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.token || null;
      }
    } catch (error) {
      console.error('Erro ao obter token:', error);
    }
    return null;
  }

  private handleUnauthorized(): void {
    localStorage.removeItem('auth-storage');
    window.location.href = API_CONFIG.LOGIN_REDIRECT;
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete(url: string): Promise<void> {
    await this.client.delete(url);
  }
}
