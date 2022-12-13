import CharacterLocation from './character-location';

export default class Character {
  public id!: number;

  public name!: string;

  public status!: string;

  public species!: string;

  public type?: string;

  public gender!: string;

  public origin!: CharacterLocation;

  public location!: CharacterLocation;

  public image!: string;

  public episode!: string[];

  public url!: string;

  public created!: string;

  constructor(props: Character) {
    Object.assign(this, props);
  }
}
