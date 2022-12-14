import { PaginatedResult } from '../../../utils/types/request';
import { CustomError } from '../../../utils/custom-error';
import Character from '../models/character';
import { CharacterFilters } from '../types/character-filter';
import { singleton } from 'tsyringe';
import ApiService from '../../../utils/services/api-service';

@singleton()
export default class CharacterExternalDatasource {
  constructor(private client: ApiService) { }

  async getAll(filters?: CharacterFilters): Promise<PaginatedResult<Character> | CustomError> {
    try {
      const data = await this.client.get<PaginatedResult<Character>>('/character', { params: filters });
      return new PaginatedResult<Character>({
        ...data,
        results: data.results.map((c) => new Character(c)),
      });
    } catch (error) {
      return new CustomError({
        error,
        message: 'Oops, coundn\'t get the characters',
      });
    }
  }

  async getCharacter(id: string): Promise<Character | CustomError> {
    try {
      const data = await this.client.get<Character>(`/character/${id}`);
      return data;
    } catch (error) {
      return new CustomError({
        error,
        message: 'Oops, something went wrong consulting character data',
      });
    }
  }
}

