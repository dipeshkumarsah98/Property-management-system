import CustomError from 'errors/customError';

export default class ServerError extends CustomError {
  statusCode = 500;

  errorCode = 'INTERNAL_SERVER_ERROR';

  details: string;

  constructor(message: string, details: string) {
    super(message);

    this.details = details;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
