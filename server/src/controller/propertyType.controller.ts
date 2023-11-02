import { Request, RequestHandler, Response } from 'express';
import ValidationError from 'errors/badRequestError';
import { successResponse } from 'utils/successResponse.utils';
import * as propertyTypeService from 'services/propertyType.service';
import { CreateRoleDto } from 'dto/role.dto';

const getAll: RequestHandler = async (req: Request, res: Response) => {
  const result = await propertyTypeService.findAll();

  return res.status(200).json(successResponse(200, 'Ok', result));
};

const getOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ValidationError('No id found', 'please provide id in params');
  }

  const propertyType = await propertyTypeService.findOne(id);

  return res.status(200).json(successResponse(200, 'Ok', propertyType));
};

const createOne: RequestHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const data: CreateRoleDto = {
    name,
    description,
  };

  const propertyType = await propertyTypeService.createOne(data);

  return res.status(201).json(successResponse(201, 'Created', propertyType));
};

const updateOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedType = await propertyTypeService.updateOne(id, req.body);

  return res.status(200).json(successResponse(200, 'Ok', updatedType));
};

const deleteOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedType = await propertyTypeService.remove(id);

  return res.status(200).json(successResponse(200, 'Ok', deletedType));
};
export { createOne, getAll, getOne, updateOne, deleteOne };
