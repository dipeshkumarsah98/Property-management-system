import CustomError from 'errors/customError';

export default class NotFoundError extends CustomError {
  statusCode = 404;

  errorCode = 'NOT_FOUND';

  details: string;

  constructor(message: string, details: string) {
    super(message);

    this.details = details;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
