export class Left<T> {
  readonly isLeft = true;
  readonly isRight = false;
  error: T;
  
  constructor(error: T) {
    this.error = error;
  }
}

export class Right<T> {
  readonly isLeft = false;
  readonly isRight = true;
  success: T;
  
  constructor(success: T) {
    this.success = success;
  }
}

export type Either<E, S> = Left<E> | Right<S>; 