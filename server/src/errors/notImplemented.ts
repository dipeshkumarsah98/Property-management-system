/* eslint-disable import/extensions */
import CustomError from 'errors/customError';

export default class NotImplementedError extends CustomError {
  statusCode = 501;

  errorCode = 'NOT_IMPLEMENTED';

  details: string;

  constructor(message: string, details: string) {
    super(message);

    this.details = details;
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}
