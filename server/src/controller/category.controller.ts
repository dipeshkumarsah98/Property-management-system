import { Request, Response, RequestHandler } from 'express';
import { successResponse } from 'utils/successResponse.utils';
import { Category } from 'models/categories';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';

// controller to fetch all category
const getAllCategory: RequestHandler = async (req: Request, res: Response) => {
  const categories = await Category.getAllCategory();

  res.status(200).json(successResponse(200, 'Ok', categories));
};

// controller to create a category
const createCategory: RequestHandler = async (req: Request, res: Response) => {
  const category = req.body;

  const addedCategory = await Category.createCategory(category);

  res.status(201).json(successResponse(201, 'Created', addedCategory));
};

// controller to update a category
const updateCategory: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryData = req.body;

  if (!id) {
    throw new ValidationError('Bad Request', 'Id is required');
  }

  const updatedCategory = await Category.updateCategory(categoryData, id);

  res.status(200).json(successResponse(200, 'Ok', updatedCategory));
};

// controller to delete a category
const deleteCategory: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ValidationError('Bad Request', 'Id is required');
  }

  const deletedCategory = await Category.deleteCategory(id);

  if (!deletedCategory) {
    throw new NotFoundError(
      'Failed',
      `No category found with ID ${id} to delete`
    );
  }

  res
    .status(200)
    .json(
      successResponse(200, 'Ok', `Successfully deleted Category with Id ${id}`)
    );
};

export { getAllCategory, createCategory, updateCategory, deleteCategory };
