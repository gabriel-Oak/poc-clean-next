import Character from '../../../features/character/models/character';
import { CustomError } from '../../../utils/custom-error';

export interface CharacterState {
  isLoading: boolean;
  character?: Character;
  errorState?: CustomError | null;
  characterId: string;
}

export interface CharacterContextProps {
  state: CharacterState;
  search: (characterId: string) => void;
}