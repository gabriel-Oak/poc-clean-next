import { CustomError } from '../../../../utils/custom-error';
import { PaginatedResult } from '../../../../utils/types/request';
import Character from '../../models/character';
import { CharacterFilters } from '../../types/character-filter';

export interface ICharacterExternalDatasource {
  getAll: (params?: {
    filters?: CharacterFilters; 
    page?: number;
  }) => Promise<PaginatedResult<Character> | CustomError>;
  getCharacter: (id: string) => Promise<Character | CustomError>;
}