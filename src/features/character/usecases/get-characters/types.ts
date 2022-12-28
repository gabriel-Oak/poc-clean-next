import { CustomError } from '../../../../utils/custom-error';
import { Either } from '../../../../utils/types/either';
import { PaginatedResult } from '../../../../utils/types/request';
import Character from '../../models/character';
import { CharacterFilters } from '../../types/character-filter';

export interface IGetCharatersUsecase {
  execute: (args?: {
    filters?: CharacterFilters; 
    page?: number;
  }) => Promise<Either<CustomError, PaginatedResult<Character>>>
}