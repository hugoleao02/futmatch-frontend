import type { IHttpClient } from '../../domain/repositories/IHttpClient';
import { api } from './api';

export class AxiosHttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await api.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await api.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await api.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await api.delete<T>(url);
    return response.data;
  }
}
