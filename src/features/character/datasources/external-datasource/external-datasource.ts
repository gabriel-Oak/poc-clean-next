import { CustomError } from '../../../../utils/custom-error';
import { IApiService } from '../../../../utils/services/api-service/types';
import { Left, Right } from '../../../../utils/types/either';
import { PaginatedResult } from '../../../../utils/types/request';
import Character from '../../models/character';
import { CharacterFilters } from '../../types/character-filter';
import { ICharacterExternalDatasource } from './types';

export default class CharacterExternalDatasource implements ICharacterExternalDatasource {
  constructor(private client: IApiService) { }

  async getAll(params?: {
    filters?: CharacterFilters;
    page?: number;
  }) {
    try {
      const { page, filters } = params ?? {};
      const data = await this.client.get<PaginatedResult<Character>>('/character', {
        params: {
          page, ...filters
        }
      });
      return new Right(new PaginatedResult<Character>({
        ...data,
        results: data.results.map((c) => new Character(c)),
      }));
    } catch (error) {
      return new Left(new CustomError({
        error,
        message: 'Oops, coundn\'t get the characters',
      }));
    }
  }

  async getCharacter(id: string) {
    try {
      const data = await this.client.get<Character>(`/character/${id}`);
      return new Right(new Character(data));
    } catch (error) {
      return new Left(new CustomError({
        error,
        message: 'Oops, something went wrong consulting character data',
      }));
    }
  }
}

