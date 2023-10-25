/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import { successResponse } from 'utils/successResponse.utils';
import * as authService from 'services/auth.service';

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  const token = await authService.loginParticularUser(
    req.body.email,
    req.body.password
  );

  return res.status(200).json(successResponse(200, 'Ok', token));
};
const refreshUserToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const token = await authService.refreshParticularUserToken(req.body.token);

  return res.status(200).json(successResponse(200, 'Ok', token));
};

export { loginUser, refreshUserToken };
