import axios, { Axios, AxiosRequestConfig } from 'axios';
import { singleton } from 'tsyringe';

@singleton()
export default class ApiService {
  client: Axios

  constructor() {
    this.client = axios.create({
      baseURL: 'https://rickandmortyapi.com/api',
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  async post<T>(url: string, payload: unknown, config?: AxiosRequestConfig) {
    const { data } = await this.client.post<T>(url, payload, config);
    return data;
  }
}
