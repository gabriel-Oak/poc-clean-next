import axios from 'axios';
import ApiService from './api-service';
import { IApiService } from './types';

let instance: IApiService;

const createApiService = (): IApiService => {
  const client = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
  });
  if (!instance) instance = new ApiService(client);
  return instance;
}

export default createApiService;
