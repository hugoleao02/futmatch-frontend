import type { IHttpClient } from '../../../domain/repositories/IHttpClient';
import { createAxiosInstance } from '../config/axios.config';

export class AxiosHttpClient implements IHttpClient {
  private readonly client;

  constructor() {
    this.client = createAxiosInstance();
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}
