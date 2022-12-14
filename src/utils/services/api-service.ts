import axios, { Axios, AxiosRequestConfig } from 'axios';
import { inject, registry, singleton } from 'tsyringe';

@registry([{
  token: 'RickMortyAxios',
  useValue: axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
  }),
}])
@singleton()
export default class ApiService {
  constructor(@inject('RickMortyAxios') private client: Axios) { }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  async post<T>(url: string, payload: unknown, config?: AxiosRequestConfig) {
    const { data } = await this.client.post<T>(url, payload, config);
    return data;
  }
}
