import { PaginatedResult } from "../../../utils/contracts/request";
import Character from "../models/character";
import { CharacterFilters } from "../models/character-filter";

export interface ICharacterExternalDatasource {
  getAll: (filters?: CharacterFilters) => Promise<PaginatedResult<Character>>;
} 

export class CharacterExternalDatasource implements ICharacterExternalDatasource {
  async getAll(filters?: CharacterFilters): Promise<PaginatedResult<Character>> {
    throw Error('not implemented');
  }
}

