import createApiService from '../../../../utils/services/api-service';
import CharacterExternalDatasource from './external-datasource';
import { ICharacterExternalDatasource } from './types';

let instance: ICharacterExternalDatasource;

const createCharacterExternalDatasource = (): ICharacterExternalDatasource => {
  if (!instance) instance = new CharacterExternalDatasource(createApiService());
  return instance;
}

export default createCharacterExternalDatasource;
