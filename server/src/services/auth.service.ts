/* eslint-disable import/extensions */
import sequelize from 'config/database.config';
import { CreateUserDto } from 'dto/user.dto';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import ServerError from 'errors/serverError';
import { QueryTypes } from 'sequelize';
import {
  generateAccessToken,
  generateRefreshToken,
} from 'utils/handleToken.utils';
import logger from 'utils/logger';
import { comparePassword } from 'utils/password';
import * as userService from 'services/user.service';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export const register = async (createUserDto: CreateUserDto) => {
  const user = await userService.createOne(createUserDto);

  return user;
};

/* eslint-disable import/prefer-default-export */
export const loginParticularUser = async (email: string, password: string) => {
  logger.info('Checking user exist of not');

  const user: User[] | [] = await sequelize.query(
    `select users.id, users.name, users.email, users.password, roles.name as role from users left join roles on roles.id=users.roleid where users.email = '${email}';`,
    { type: QueryTypes.SELECT }
  );

  if (user.length < 1) {
    throw new NotFoundError('No user found.', 'No user found with given email');
  }

  logger.info('Checking password..');
  const isValidPassword = await comparePassword(password, user[0].password);

  if (!isValidPassword) {
    throw new ValidationError('Invalid password', 'Invalid password');
  }

  logger.info('Checking token..');
  // generating access and refresh token
  const accessToken = generateAccessToken({
    email: user[0].email,
    role: user[0].role,
    id: user[0].id,
  });
  const refreshToken: string = generateRefreshToken({
    email: user[0].email,
    role: user[0].role,
    id: user[0].id,
  });

  //   //   saving refresh token in the db
  const result = await sequelize.query(
    `update users set refresh_token='${refreshToken}' where users.email = '${email}'`
  );

  if (result.length < 1)
    throw new ServerError('Something went wrong', 'something went wrong');

  logger.info('Sending token..');
  return { access: accessToken, refresh: refreshToken };
};

export const refreshParticularUserToken = async (token: string) => {
  logger.info('Checking refresh token');

  // finding user with given refresh token
  const user: User[] | [] = await sequelize.query(
    `select users.id, users.name, users.email, users.refresh_token, users.password, roles.name as role from users left join roles on
     roles.id=users.roleid where users.refresh_token = '${token}';`,
    { type: QueryTypes.SELECT }
  );
  if (user.length < 1) {
    throw new ValidationError('Invalid token', 'Token is invalid or expire');
  }
  // generating new tokens
  logger.info('Generating new tokens');
  const newAccessToken = generateAccessToken({
    email: user[0].email,
    id: user[0].id,
    role: user[0].role,
  });
  const newRefreshToken = generateRefreshToken({
    email: user[0].email,
    id: user[0].id,
    role: user[0].role,
  });
  // updating new tokens
  const isUpdated = await sequelize.query(
    `update users set refresh_token = '${newRefreshToken}' where users.email='${user[0].email}';`
  );
  if (isUpdated.length < 1) {
    throw new ServerError(
      'Something went wrong',
      'Something went wrong with server. Try again'
    );
  }
  logger.info('Sending new tokens');
  return { access: newAccessToken, refresh: newRefreshToken };
};
