/* eslint-disable import/extensions */
import { Response, Request, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import UnauthorizedError from 'errors/unauthorizedError';
import envVars from 'config/env.config';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  // getting token from header
  const key: string = envVars.JWT_SECRET_KEY;
  const authHeader = req.headers.authorization;
  // the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (!token) {
    throw new UnauthorizedError(
      'Access Denied: No token provided.',
      'Access Denied: Please provide valid credentials or contact support for assistance with API authorization.'
    );
  }
  Jwt.verify(token, key, (err, user) => {
    // if token is invalid or expired
    if (err) {
      throw new UnauthorizedError(
        'Access Denied: Token is invalid or expired.',
        'Access Denied: Please provide valid token or generate new one.'
      );
    } else {
      // provided token is valid
      next();
    }
  });
  return null;
};

export default validateToken;
