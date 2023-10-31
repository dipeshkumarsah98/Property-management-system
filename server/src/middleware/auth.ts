/* eslint-disable import/extensions */
import { Response, Request, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import UnauthorizedError from 'errors/unauthorizedError';
import envVars from 'config/env.config';
import logger from 'utils/logger';
import ValidationError from 'errors/badRequestError';
import { verifyOtp } from 'utils/otp';

/**
 * @DESC Verify JWT from authorization header Middleware
 */
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

/**
 * @DESC Check Role Middleware
 */
const checkRole =
  (roles: string[]) =>
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    let user: any;

    logger.info('Checking roles');

    // retrieve employee info from DB
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
    Jwt.verify(token, key, (err, validUser) => {
      // if token is invalid or expired
      if (err) {
        throw new UnauthorizedError(
          'Access Denied: Token is invalid or expired.',
          'Access Denied: Please provide valid token or generate new one.'
        );
      } else {
        // provided token is valid
        user = validUser;
      }
    });

    // eslint-disable-next-line no-unused-expressions
    if (!roles.includes(user.role)) {
      throw new UnauthorizedError(
        'Sorry you do not have access to this route',
        'Sorry you do not have access to this route'
      );
    }
    next();
  };

/**
 * @DESC Verify user is accessing itself Middleware
 */
const checkItSelf = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let user: any;

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
  Jwt.verify(token, key, (err, validUser) => {
    // if token is invalid or expired
    if (err) {
      throw new UnauthorizedError(
        'Access Denied: Token is invalid or expired.',
        'Access Denied: Please provide valid token or generate new one.'
      );
    } else {
      // provided token is valid
      user = validUser;
    }
  });
  if (+id !== user.id) {
    throw new UnauthorizedError(
      'Sorry you do not have access to this route',
      'Sorry you do not have access to this route'
    );
  }
  next();
};

/**
 * @DESC Verify OTP from request body Middleware
 */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  logger.info('Verifying OTP');

  const isValidToken = verifyOtp(token);

  if (!isValidToken)
    throw new ValidationError(
      'token is expired or invalid.',
      'The provided token is expire or invalid'
    );

  next();
};

/**
 * @DESC Verify reset token from request param Middleware
 */
const verifyResetToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;

  logger.info('Verifying password reset token');

  if (!token) {
    throw new ValidationError(
      'No token provided',
      'No token provided in params'
    );
  }

  let user: any;

  const key: string = envVars.JWT_SECRET_KEY;

  Jwt.verify(token, key, (err, validUser) => {
    // if token is invalid or expired
    if (err) {
      throw new UnauthorizedError(
        'Access Denied: Token is invalid or expired.',
        'Access Denied: Please provide valid token or reset again'
      );
    } else {
      // provided token is valid
      user = validUser;
    }
  });

  req.body.email = user.email;

  next();
};

export { validateToken, checkRole, checkItSelf, verifyToken, verifyResetToken };
