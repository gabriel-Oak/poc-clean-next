import { CustomError } from '../../../utils/custom-error';
import CharacterExternalDatasource from '../datasources/external-datasource';
import Character from '../models/character';
import { singleton, autoInjectable } from 'tsyringe';

@singleton()
@autoInjectable()
export default class GetDetailsUsecase {
  constructor(private datasource: CharacterExternalDatasource) {}

  async execute(id: string): Promise<Character | CustomError> {
    if(!id) return new CustomError({
      message: 'Sorry, the character id specified is empty, need an id to search character',
    })

    return this.datasource.getCharacter(id);
  }
}