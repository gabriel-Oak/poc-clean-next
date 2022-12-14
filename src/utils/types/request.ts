export interface PaginatedInfo {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

export class PaginatedResult<T> {
  public info!: PaginatedInfo;

  public results!: T[]; 

  constructor(props: PaginatedResult<T>) {
    Object.assign(this, props);
  }
}