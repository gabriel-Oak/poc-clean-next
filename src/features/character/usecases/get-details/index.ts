import createCharacterExternalDatasource from '../../datasources/external-datasource';
import createCharacterLocalDatasource from '../../datasources/local-datasource';
import GetDetailsUsecase from './get-details';
import { IGetDetailsUsecase } from './types';

let instance: IGetDetailsUsecase;

const createGetDetailsUsecase = () => {
  if (!instance)
    instance = new GetDetailsUsecase(
      createCharacterExternalDatasource(),
      createCharacterLocalDatasource(),
    );
  return instance;
}

export default createGetDetailsUsecase;
