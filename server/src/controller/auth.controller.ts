/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import { successResponse } from 'utils/successResponse.utils';
import * as authService from 'services/auth.service';
import { CreateUserDto } from 'dto/user.dto';
import ValidationError from 'errors/badRequestError';

const sendPasswordResetOtp: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.params;
  if (!email)
    throw new ValidationError(
      'Email is required in params',
      'Email is required in params'
    );

  const message = await authService.requestPasswordReset(email);

  return res.status(200).json(successResponse(200, 'Ok', message));
};

const sendOtp: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  const message = await authService.sendOtp({ email });

  return res.status(200).json(successResponse(200, 'Ok', message));
};

const registerUser: RequestHandler = async (req: Request, res: Response) => {
  const { name, roleId, email, password } = req.body;

  const data: CreateUserDto = {
    name,
    email,
    password,
    roleId,
  };

  const user = await authService.register(data);

  return res.status(201).json(successResponse(201, 'Created', user));
};

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  const token = await authService.loginParticularUser(
    req.body.email,
    req.body.password
  );

  return res.status(200).json(successResponse(200, 'Ok', token));
};

const changePassword: RequestHandler = async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.email, req.body.password);

  return res.status(200).json(
    successResponse(200, 'Ok', {
      message: 'Password changed successfully',
    })
  );
};

const refreshUserToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const token = await authService.refreshParticularUserToken(req.body.token);

  return res.status(200).json(successResponse(200, 'Ok', token));
};

export {
  registerUser,
  loginUser,
  refreshUserToken,
  sendOtp,
  sendPasswordResetOtp,
  changePassword,
};
