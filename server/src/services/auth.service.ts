/* eslint-disable import/extensions */
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import ServerError from 'errors/serverError';
import { Login } from 'models';
import {
  generateAccessToken,
  generateRefreshToken,
} from 'utils/handleToken.utils';

/* eslint-disable import/prefer-default-export */
export const loginParticularUser = async (email: string, password: string) => {
  const user = await Login.findLoginCredential({ email });

  if (!user) {
    throw new NotFoundError('No user found.', 'No user found with given email');
  }

  const isValidPassword = await Login.validatePassword(password, user.password);
  if (!isValidPassword) {
    throw new ValidationError('Invalid password', 'Invalid password');
  }

  // generating access and refresh token
  const accessToken = generateAccessToken({
    email: user.email,
    uuid: user.uuid,
    id: user.id,
  });
  const refreshToken: string = generateRefreshToken({
    email: user.email,
    uuid: user.uuid,
    id: user.id,
  });

  // saving refresh token in the db
  const result = await user.update({ refreshToken });

  if (!result)
    throw new ServerError('Internal Server error', 'Something went wrong');

  return { access: accessToken, refresh: refreshToken };
};

export const refreshParticularUserToken = async (token: string) => {
  // finding user with given refresh token
  const user = await Login.findLoginCredential({ refreshToken: token });

  if (!user) {
    throw new ValidationError('Invalid token', 'Token is invalid or expire');
  }

  // generating new tokens
  const newAccessToken = generateAccessToken({
    email: user.email,
    uuid: user.uuid,
    id: user.id,
  });

  const newRefreshToken = generateRefreshToken({
    email: user.email,
    uuid: user.uuid,
    id: user.id,
  });

  // updating new tokens
  user.refreshToken = newRefreshToken;
  const result = user.save();
  if (!result) {
    throw new ServerError(
      'Something went wrong',
      'Something went wrong with server. Try again'
    );
  }

  return { access: newAccessToken, refresh: newRefreshToken };
};
