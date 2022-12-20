import { singleton, autoInjectable } from 'tsyringe';
import { CustomError } from '../../../../utils/custom-error';
import { ICharacterExternalDatasource } from '../../datasources/external-datasource/types';
import Character from '../../models/character';
import { IGetDetailsUsecase } from './types';

export default class GetDetailsUsecase implements IGetDetailsUsecase{
  constructor(private datasource: ICharacterExternalDatasource) {}

  async execute(id: string): Promise<Character | CustomError> {
    if(!id) return new CustomError({
      message: 'Sorry, the character id specified is empty, need an id to search character',
    })

    return this.datasource.getCharacter(id);
  }
}