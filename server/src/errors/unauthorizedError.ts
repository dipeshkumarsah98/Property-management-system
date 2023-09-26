/* eslint-disable import/extensions */
import CustomError from 'errors/customError';

export default class UnauthorizedError extends CustomError {
  statusCode = 401;

  errorCode = 'UNAUTHORIZED';

  details: string;

  constructor(message: string, details: string) {
    super(message);

    this.details = details;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
