export default class Episode {
  public id!: number;
  public name!: string;
  public air_date!: string;
  public episode!: string;
  public characters!: string[];
  public url!: string;
  public created!: string;

  constructor(props: Episode) {
    Object.assign(this, props);
  }
}