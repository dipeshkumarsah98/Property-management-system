import { Router } from 'express';
import * as roleController from 'controller/role.controller';
import { checkRole, validateToken } from 'middleware/auth';
import { validate } from 'middleware/validate';

const route = Router();

route.get('/', validateToken, checkRole(['admin']), roleController.getAllRoles);

route.get('/:id', validateToken, checkRole(['admin']), roleController.getrole);

route.post(
  '/',
  validateToken,
  checkRole(['admin']),
  validate('roleSchema', 'createRole'),
  roleController.createrole
);

route.patch(
  '/:id',
  validateToken,
  checkRole(['admin']),
  validate('roleSchema', 'updateRole'),
  roleController.updaterole
);

route.delete(
  '/:id',
  validateToken,
  checkRole(['admin']),
  roleController.deleterole
);

export default route;
