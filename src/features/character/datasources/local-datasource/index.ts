import CharacterLocalDatasource from './local-datasource';
import { ICharacterLocalDatasource } from './type';

let instance: ICharacterLocalDatasource;

const createCharacterLocalDatasource = (): ICharacterLocalDatasource => {
  if (!instance) instance = new CharacterLocalDatasource(global.localStorage);
  return instance;
}

export default createCharacterLocalDatasource;
