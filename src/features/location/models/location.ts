export default class Location {
  public id!: number;
  public name!: string;
  public air_date!: string;
  public episode!: string;
  public characters!: string[];
  public url!: string;
  public created!: string;

  constructor(props: Location) {
    Object.assign(this, props);
  }
}