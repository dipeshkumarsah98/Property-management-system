import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import { NewArrival, Product } from 'models';

// service to create new arrival record
export async function createNewArrival(
  productId: string
): Promise<NewArrival | void> {
  // checking if product exist in product table or not
  const doesProductExist = await Product.findProduct({ id: productId });
  if (!doesProductExist) {
    throw new NotFoundError(
      'Product does not exits',
      'No product found with given uuid'
    );
  }

  // checking if product already exist in new arrivals
  const isProductAlreadyInNewArrivals =
    await NewArrival.getParticularNewArrival({ product_id: productId });

  if (isProductAlreadyInNewArrivals) {
    throw new ValidationError(
      'Bad request',
      'Product already exist in new arrivals'
    );
  }

  // creating new arrival when product is unique
  const newArrivalProduct = await NewArrival.createNewArrival({
    product_id: productId,
  });

  return newArrivalProduct;
}

// service to udpate new arrival record
export async function updateNewArrival(
  id: string,
  productId: string
): Promise<NewArrival[] | void> {
  // checking if product exist in product table or not
  const doesProductExist = await Product.findProduct({ id: productId });
  if (!doesProductExist) {
    throw new NotFoundError(
      'Product does not exits',
      'No product found with given id'
    );
  }

  // checking if product already exist in new arrivals
  const isProductAlreadyInNewArrivals =
    await NewArrival.getParticularNewArrival({ product_id: productId });

  if (isProductAlreadyInNewArrivals) {
    throw new ValidationError(
      'Bad request',
      'Product already exist in new arrivals'
    );
  }

  // updating new arrival when product is unique
  const updatedNewArrival = await NewArrival.updateNewArrival(
    { product_id: productId },
    id
  );

  return updatedNewArrival;
}
