/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/extensions */
import { Request, Response, RequestHandler } from 'express';
import { successResponse } from 'utils/successResponse.utils';
import { Product } from 'models';
import NotFoundError from 'errors/notFoundError';
import ValidationError from 'errors/badRequestError';

export interface FilterQueryParam {
  maxPrice?: string;
  minPrice?: string;
  material?: string;
  category?: string | string[];
  color?: string | string[];
  size?: string | string[];
  sortByPrice?: 'ASC' | 'DESC';
  search?: string;
}

// controller to fetch all products
const getAllproducts: RequestHandler = async (
  req: Request<{}, {}, {}, FilterQueryParam>,
  res: Response
) => {
  const products = await Product.getAllProduct(req.query);
  res.status(200).json(successResponse(200, 'Ok', products));
};

// controller to fetch single product by its ID
const getSingleProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;
  const product = await Product.findProduct({ uuid });
  if (!product) {
    return res.status(404).json({
      status: 404,
      Success: false,
      Msg: `No product found with ID ${uuid}`,
    });
  }
  return res.status(200).json(successResponse(200, 'Ok', product));
};

// controller to post a product
const createProduct: RequestHandler = async (req: Request, res: Response) => {
  const product = req.body;
  const addedProduct = await Product.createProduct(product);
  return res.status(200).json(successResponse(200, 'Ok', addedProduct));
};

// controller to update a product
const updateProduct: RequestHandler = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const productData = req.body;
  if (!uuid) {
    throw new ValidationError('Bad Request', 'UUID is required');
  }
  const updatedProduct = await Product.updateProduct(productData, uuid);
  res.status(200).json(successResponse(200, 'Ok', updatedProduct));
};

// controller to delete a product
const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const deletedProduct = await Product.deleteProduct(uuid);
  if (!deletedProduct) {
    throw new NotFoundError(
      'Failed',
      `No product found with ID ${uuid} to delete`
    );
  }
  return res
    .status(200)
    .json(
      successResponse(200, 'Ok', `Successfully deleted Product with ID ${uuid}`)
    );
};

export {
  getAllproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
