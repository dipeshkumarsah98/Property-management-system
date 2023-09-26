/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import ValidationError from 'errors/badRequestError';
import { successResponse } from 'utils/successResponse.utils';
import * as userService from 'services/user.service';

const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError('No id found', 'please provide id in params');
  }

  const user = await userService.getParticularUser({ id });

  return res.status(200).json(successResponse(200, 'Ok', user));
};

const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, contact, dob, email, password } = req.body;

  const data = {
    first_name: firstName,
    last_name: lastName,
    phone_number: contact,
    date_of_birth: dob,
    login_uuid: '',
    email,
    password,
  };

  const user = await userService.createNewUser(data);

  return res.status(201).json(successResponse(201, 'Created', user));
};

export { getUser, createUser };
