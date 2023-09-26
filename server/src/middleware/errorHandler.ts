/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import CustomError from 'errors/customError';
import { errorResponse } from 'utils/errorResponse.utils';
import logger from 'utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json(
        errorResponse(
          error.errorCode,
          error.message,
          error.details,
          error.statusCode
        )
      );
  }

  return res
    .status(500)
    .json(
      errorResponse(
        'INTERNAL_SERVER_ERROR',
        'Internal Server Error',
        'An unexpected error occurred'
      )
    );
};
