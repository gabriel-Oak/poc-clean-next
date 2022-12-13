import { PaginatedResult } from '../../../utils/contracts/request';
import Character from '../models/character';

export interface IGetCharactersUsecase {
  execute: () => Promise<PaginatedResult<Character>>;
}

export class GetCharatersUsecase implements IGetCharactersUsecase {
  async execute(): Promise<PaginatedResult<Character>> {
    throw Error('Not Implemented');
  };
}