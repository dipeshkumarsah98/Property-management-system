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
import { AuthDto } from 'dto/auth.dto';
import { generateOtp } from 'utils/otp';
import * as mailerService from 'services/mailer.service';
import { User } from 'types/user.type';

// setup method to send opt
export const sendOtp = async (authDto: Omit<AuthDto, 'otp'>) => {
  const { email } = authDto;

  logger.info(`Generating OTP to ${email}`);

  const token = generateOtp();

  if (token) {
    mailerService.sendOtp({ email, name: email.split('@')[0], opt: token });

    return {
      msg: 'OTP sent successfully',
    };
  }

  return null;
};

export const register = async (createUserDto: CreateUserDto) => {
  logger.info('Registering new user');

  const user = await userService.createOne(createUserDto);

  mailerService.sendWelcome({ email: user.email, name: user.name });

  return user;
};

export const resetPassword = async (email: string, password: string) => {
  const user: any = await userService.changePassword(email, password);

  mailerService.passwordUpdate({ email: user[0].email, name: user[0].name });

  return user;
};

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
    throw new ValidationError(
      'Invalid email or password',
      'Invalid password or password'
    );
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
  return {
    email,
    name: user[0].name,
    access: accessToken,
    refresh: refreshToken,
  };
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

export const requestPasswordReset = async (email: string) => {
  logger.info(`Sending Reset password OTP to ${email}`);

  const user: User[] | [] = await sequelize.query(
    `select users.id, users.name, users.email, users.password, roles.name as role from users left join roles on roles.id=users.roleid where users.email = '${email}';`,
    { type: QueryTypes.SELECT }
  );

  if (user.length < 1) {
    throw new NotFoundError('No user found.', 'No user found with given email');
  }

  const token = generateAccessToken({
    email: user[0].email,
    role: user[0].role,
    id: user[0].id,
  });

  mailerService.passwordReset({
    email,
    name: user[0].name,
    opt: token,
  });

  return {
    message: 'Please check your email!',
  };
};
