import { Axios, AxiosRequestConfig } from 'axios';
import { IApiService } from './types';

export default class ApiService implements IApiService {
  constructor(private client: Axios) { }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  async post<T>(url: string, payload: unknown, config?: AxiosRequestConfig) {
    const { data } = await this.client.post<T>(url, payload, config);
    return data;
  }
}
