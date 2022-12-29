import { CustomError } from '../../../../utils/custom-error';
import { Either } from '../../../../utils/types/either';
import Character from '../../models/character';

export interface IGetDetailsUsecase {
  execute: (id: string) => Promise<Either<CustomError, Character>>;
}