/* eslint-disable import/extensions */
import { Request, RequestHandler, Response } from 'express';
import ValidationError from 'errors/badRequestError';
import { successResponse } from 'utils/successResponse.utils';
import * as roleService from 'services/role.service';
import { CreateRoleDto } from 'dto/role.dto';

const getAllRoles: RequestHandler = async (req: Request, res: Response) => {
  const roles = await roleService.findAll();

  return res.status(200).json(successResponse(200, 'Ok', roles));
};

const getrole: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ValidationError('No id found', 'please provide id in params');
  }

  const role = await roleService.findOne(id);

  return res.status(200).json(successResponse(200, 'Ok', role));
};

const createrole: RequestHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const data: CreateRoleDto = {
    name,
    description,
  };

  const role = await roleService.createOne(data);

  return res.status(201).json(successResponse(201, 'Created', role));
};

const updaterole: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedrole = await roleService.updateOne(id, req.body);

  return res.status(200).json(successResponse(200, 'Ok', updatedrole));
};

const deleterole: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedrole = await roleService.remove(id);

  return res.status(200).json(successResponse(200, 'Ok', deletedrole));
};
export { getrole, createrole, getAllRoles, updaterole, deleterole };
