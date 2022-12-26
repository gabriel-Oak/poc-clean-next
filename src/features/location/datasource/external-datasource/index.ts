import createApiService from '../../../../utils/services/api-service';
import LocationExternalDatasource from './external-datasource';
import { ILocationExternalDatasource } from './types';

let instance: ILocationExternalDatasource;

const createLocationExternalDatasource = (): ILocationExternalDatasource => {
  if (!instance) instance = new LocationExternalDatasource(createApiService());
  return instance;
}

export default createLocationExternalDatasource;
