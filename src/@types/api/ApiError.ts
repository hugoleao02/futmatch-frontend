export interface IApiError {
  message: string;
  status: number;
  data: any;
  isNetworkError: boolean;
}
