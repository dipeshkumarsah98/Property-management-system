/* eslint-disable camelcase */
import { Response, Request, RequestHandler } from 'express';
import { NewArrival } from 'models';
import { successResponse } from 'utils/successResponse.utils';
import * as newArrivalService from 'services/newArrival.service';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';

// controller to fetch all the new arrivals products
const getAllNewArrivals: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const newArrivalProducts = await NewArrival.getAllNewArrival();
  res.status(200).json(successResponse(200, 'Ok', newArrivalProducts));
};

// controller to create new arrival product
const creteNewArrival: RequestHandler = async (req: Request, res: Response) => {
  // getting all the required data
  const { product_id } = req.body;

  const newArrivalProduct = await newArrivalService.createNewArrival(
    product_id
  );

  res.status(201).json(successResponse(201, 'Ok', newArrivalProduct));
};

// controller to update the new arrival product
const updateNewArrival: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // getting all the required data
  const { id } = req.params;

  if (!id) {
    throw new ValidationError('Bad Request', 'id is required');
  }

  const { product_id } = req.body;

  const updatedNewArrival = await newArrivalService.updateNewArrival(
    id,
    product_id
  );

  res.status(200).json(successResponse(200, 'Ok', updatedNewArrival));
};

// Controller to delete the new arrival product
const deleteNewArrival: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const deletedNewArrival = await NewArrival.deleteNewArrival(id);

  if (!deletedNewArrival) {
    throw new NotFoundError(
      'Failed',
      `No New Arrival product found with ID ${id} to delete`
    );
  }
  return res
    .status(200)
    .json(
      successResponse(200, 'Ok', `Successfully deleted Product with ID ${id}`)
    );
};

export {
  getAllNewArrivals,
  creteNewArrival,
  updateNewArrival,
  deleteNewArrival,
};
