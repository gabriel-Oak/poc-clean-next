import { PaginatedResult } from '../../../../utils/types/request';
import { CustomError } from '../../../../utils/custom-error';
import Character from '../../models/character';
import { CharacterFilters } from '../../types/character-filter';
import { IGetCharatersUsecase } from './types';
import { ICharacterExternalDatasource } from '../../datasources/external-datasource/types';

export default class GetCharactersUsecase implements IGetCharatersUsecase {
  constructor(private datasource: ICharacterExternalDatasource) { }

  async execute(args?: {
    filters?: CharacterFilters;
    page?: number;
  }): Promise<PaginatedResult<Character> | CustomError> {
    return this.datasource.getAll(args);
  };
}