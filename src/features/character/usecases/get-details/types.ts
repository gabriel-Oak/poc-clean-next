import { CustomError } from '../../../../utils/custom-error';
import Character from '../../models/character';

export interface IGetDetailsUsecase {
  execute: (id: string) => Promise<Character | CustomError>;
}