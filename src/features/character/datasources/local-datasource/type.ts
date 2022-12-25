import Character from '../../models/character';

export interface ICharacterLocalDatasource {
  getCharacter: (characterId: string) => Character | null;
  saveCharacter: (character: Character) => void;
}