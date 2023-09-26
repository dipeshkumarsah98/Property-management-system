/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import { successResponse } from 'utils/successResponse.utils';
import * as authService from 'services/auth.service';

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.loginParticularUser(email, password);

  return res.status(200).json(successResponse(200, 'Ok', result));
};

const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  const result = await authService.refreshParticularUserToken(token);

  return res.status(200).json(successResponse(200, 'Ok', result));
};

export { loginUser, refreshToken };
