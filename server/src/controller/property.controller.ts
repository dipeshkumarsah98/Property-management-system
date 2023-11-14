import { Request, RequestHandler, Response } from 'express';
import ValidationError from 'errors/badRequestError';
import { successResponse } from 'utils/successResponse.utils';
import * as propertyService from 'services/property.service';

const getAll: RequestHandler = async (req: Request, res: Response) => {
  const result = await propertyService.findAll();

  return res.status(200).json(successResponse(200, 'Ok', result));
};

const getOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ValidationError('No id found', 'please provide id in params');
  }

  const propertyType = await propertyService.findOne(id);

  return res.status(200).json(successResponse(200, 'Ok', propertyType));
};

const createOne: RequestHandler = async (req: Request, res: Response) => {
  const propertyType = await propertyService.createOne(req.body);

  return res.status(201).json(successResponse(201, 'Created', propertyType));
};

const updateOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedType = await propertyService.updateOne(id, req.body);

  return res.status(200).json(successResponse(200, 'Ok', updatedType));
};

const deleteOne: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedType = await propertyService.remove(id);

  return res.status(200).json(successResponse(200, 'Ok', deletedType));
};
export { createOne, getAll, getOne, updateOne, deleteOne };
