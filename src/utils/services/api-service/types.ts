import { AxiosRequestConfig } from 'axios';

export interface IApiService {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, payload: unknown, config?: AxiosRequestConfig): Promise<T>;
}