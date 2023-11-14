import { Router } from 'express';
import * as propertyController from 'controller/property.controller';
import { checkRole, validateToken } from 'middleware/auth';
import { validate } from 'middleware/validate';

const route = Router();

route.get('/', propertyController.getAll);

route.get('/:id', propertyController.getOne);

route.post(
  '/',
  validateToken,
  validate('propertySchema', 'createProperty'),
  propertyController.createOne
);

route.patch(
  '/:id',
  validateToken,
  checkRole(['admin']),
  validate('propertySchema', 'updateProperty'),
  propertyController.updateOne
);

route.delete(
  '/:id',
  validateToken,
  checkRole(['admin']),
  propertyController.deleteOne
);

export default route;
