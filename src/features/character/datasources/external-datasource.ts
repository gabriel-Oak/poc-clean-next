import { PaginatedResult } from "../../../utils/contracts/request";
import Character from "../models/character";

export interface IExternalCharacterDatasource {
  getAll: () => Promise<PaginatedResult<Character>>;
} 

export class ExternalCharacterDatasource implements IExternalCharacterDatasource {
  async getAll(): Promise<PaginatedResult<Character>> {
    throw Error('not implemented');
  }
}

