import { Router } from 'express';
import * as propertyTypeController from 'controller/propertyType.controller';
import { checkRole, validateToken } from 'middleware/auth';
import { validate } from 'middleware/validate';

const route = Router();

route.get('/', propertyTypeController.getAll);

route.get('/:id', propertyTypeController.getOne);

route.post(
  '/',
  validateToken,
  validate('roleSchema', 'createRole'),
  propertyTypeController.createOne
);

route.patch(
  '/:id',
  validateToken,
  checkRole(['admin']),
  validate('roleSchema', 'updateRole'),
  propertyTypeController.updateOne
);

route.delete(
  '/:id',
  validateToken,
  checkRole(['admin']),
  propertyTypeController.deleteOne
);

export default route;
