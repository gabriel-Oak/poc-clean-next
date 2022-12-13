export class PaginatedInfo {
  public count!: number;

  public pages!: number;

  public next?: string;

  public prev?: string;
}

export class PaginatedResult<T> {
  public info!: PaginatedInfo;

  public results!: T[]; 

  constructor(props: PaginatedResult<T>) {
    Object.assign(this, props);
  }
}