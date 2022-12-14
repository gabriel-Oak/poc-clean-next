export class CustomError extends Error {
  public message!: string;

  public error?: Error;

  constructor(props: {
    message: string;
    error?: unknown;
  }) {
    super();
    Object.assign(this, props);
  }

  toString = () => `${this.message}${this.error
    ? ` | \n${this.error}`
    : ''}`;
}
