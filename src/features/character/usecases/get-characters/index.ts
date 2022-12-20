import createCharacterExternalDatasource from '../../datasources/external-datasource';
import GetCharactersUsecase from './get-characters';
import { IGetCharatersUsecase } from './types';

let instance: IGetCharatersUsecase;

const createGetCharactersUsecase = (): IGetCharatersUsecase => {
  if(!instance) 
    instance = new GetCharactersUsecase(createCharacterExternalDatasource());
  return instance;
}

export default createGetCharactersUsecase;