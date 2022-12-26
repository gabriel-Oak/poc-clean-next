import createApiService from '../../../../utils/services/api-service';
import EpisodeExternalDatasource from './external-datasource';
import { IEpisodeExternalDatasource } from './types';

let instance: IEpisodeExternalDatasource;

const createEpisodeExternalDatasource = (): IEpisodeExternalDatasource => {
  if (!instance) instance = new EpisodeExternalDatasource(createApiService());
  return instance;
}

export default createEpisodeExternalDatasource;
