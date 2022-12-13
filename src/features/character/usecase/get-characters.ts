import { PaginatedResult } from '../../../utils/contracts/request';
import { CustomError } from '../../../utils/custom-error';
import { ICharacterExternalDatasource } from '../datasources/external-datasource';
import Character from '../models/character';
import { CharacterFilters } from '../models/character-filter';

export interface IGetCharactersUsecase {
  execute: (page: number, filters?: CharacterFilters) => Promise<PaginatedResult<Character> | CustomError>;
}

export class GetCharatersUsecase implements IGetCharactersUsecase {
  constructor(private datasource: ICharacterExternalDatasource) {}

  async execute(): Promise<PaginatedResult<Character> | CustomError> { 
    return this.datasource.getAll();
  };
}