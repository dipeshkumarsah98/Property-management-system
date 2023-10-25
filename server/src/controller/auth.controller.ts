/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import { successResponse } from 'utils/successResponse.utils';
import * as authService from 'services/auth.service';
import { CreateUserDto } from 'dto/user.dto';

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
const refreshUserToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const token = await authService.refreshParticularUserToken(req.body.token);

  return res.status(200).json(successResponse(200, 'Ok', token));
};

export { registerUser, loginUser, refreshUserToken };
