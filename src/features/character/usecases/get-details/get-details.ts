import { singleton, autoInjectable } from 'tsyringe';
import { CustomError } from '../../../../utils/custom-error';
import { ICharacterExternalDatasource } from '../../datasources/external-datasource/types';
import { ICharacterLocalDatasource } from '../../datasources/local-datasource/type';
import Character from '../../models/character';
import { IGetDetailsUsecase } from './types';

export default class GetDetailsUsecase implements IGetDetailsUsecase {
  constructor(
    private externalDatasource: ICharacterExternalDatasource,
    private localDatasource: ICharacterLocalDatasource,
  ) { }

  async execute(id: string): Promise<Character | CustomError> {
    if (!id) return new CustomError({
      message: 'Sorry, the character id specified is empty, need an id to search character',
    })

    const local = this.localDatasource.getCharacter(id);
    if (local) return local;

    const result = await this.externalDatasource.getCharacter(id);
    if (result instanceof Character) this.localDatasource.saveCharacter(result);

    return result;
  }
}