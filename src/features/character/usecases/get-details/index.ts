import createCharacterExternalDatasource from '../../datasources/external-datasource';
import GetDetailsUsecase from './get-details';
import { IGetDetailsUsecase } from './types';

let instance: IGetDetailsUsecase;

const createGetDetailsUsecase = () => {
  if (!instance) 
  instance = new GetDetailsUsecase(createCharacterExternalDatasource())
  return instance;
}

export default createGetDetailsUsecase;
