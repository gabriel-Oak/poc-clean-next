export default class CharacterLocation {
  public name!: string;

  public url!: string;

  constructor(props: CharacterLocation) {
    Object.assign(this, props);
  }
}