export interface IHttpGetClient {
  get<T>(url: string): Promise<T>;
}

export interface IHttpPostClient {
  post<T>(url: string, data: unknown): Promise<T>;
}

export interface IHttpPutClient {
  put<T>(url: string, data: unknown): Promise<T>;
}

export interface IHttpDeleteClient {
  delete<T>(url: string): Promise<T>;
}

export interface IHttpClient
  extends IHttpGetClient,
    IHttpPostClient,
    IHttpPutClient,
    IHttpDeleteClient {}
