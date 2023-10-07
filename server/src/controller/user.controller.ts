/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import ValidationError from 'errors/badRequestError';
import { successResponse } from 'utils/successResponse.utils';
import * as userService from 'services/user.service';
import { CreateUserDto } from 'dto/user.dto';

const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  const users = await userService.findAll();

  return res.status(200).json(successResponse(200, 'Ok', users));
};

const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ValidationError('No id found', 'please provide id in params');
  }

  const user = await userService.findOne(id);

  return res.status(200).json(successResponse(200, 'Ok', user));
};

const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { name, roleId, email, password } = req.body;

  const data: CreateUserDto = {
    name,
    email,
    password,
    roleId,
  };

  const user = await userService.createOne(data);

  return res.status(201).json(successResponse(201, 'Created', user));
};

const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedUser = await userService.updateOne(id, req.body);

  return res.status(200).json(successResponse(200, 'Ok', updatedUser));
};

const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await userService.remove(id);

  return res.status(200).json(successResponse(200, 'Ok', deletedUser));
};
export { getUser, createUser, getAllUsers, updateUser, deleteUser };
