import { CustomError } from '../../../../utils/custom-error';
import { IApiService } from '../../../../utils/services/api-service/types';
import { PaginatedResult } from '../../../../utils/types/request';
import Character from '../../models/character';
import { CharacterFilters } from '../../types/character-filter';
import { ICharacterExternalDatasource } from './types';

export default class CharacterExternalDatasource implements ICharacterExternalDatasource{
  constructor(private client: IApiService) { }

  async getAll(params?: {
    filters?: CharacterFilters; 
    page?: number;
  }) {
    try {
      const data = await this.client.get<PaginatedResult<Character>>('/character', { params });
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

