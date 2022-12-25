import Character from '../../models/character';
import { ICharacterLocalDatasource } from './type';

const prefix = 'character';

export default class CharacterLocalDatasource implements ICharacterLocalDatasource {
  constructor(private storage: Storage) { }

  getCharacter(characterId: string) {
    const result = this.storage.getItem(`${prefix}/${characterId}`);
    if (result) return new Character(JSON.parse(result));
    return null;
  }

  saveCharacter(character: Character) {
    this.storage.setItem(`${prefix}/${character.id}`, JSON.stringify(character));
  }
}