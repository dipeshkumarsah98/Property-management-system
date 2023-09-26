/* eslint-disable import/extensions */
import CustomError from 'errors/customError';

export default class ValidationError extends CustomError {
  statusCode = 400;

  errorCode = 'BAD_REQUEST';

  details: string;

  constructor(message: string, details: string) {
    super(message);

    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
