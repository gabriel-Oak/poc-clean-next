import { PaginatedResult } from '../../../utils/types/request';
import { CustomError } from '../../../utils/custom-error';
import CharacterExternalDatasource from '../datasources/external-datasource';
import Character from '../models/character';
import { singleton } from 'tsyringe';


@singleton()
export default class GetCharatersUsecase {
  constructor(private datasource: CharacterExternalDatasource) {}

  async execute(): Promise<PaginatedResult<Character> | CustomError> { 
    return this.datasource.getAll();
  };
}