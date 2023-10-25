import { Router } from 'express';
import * as roleController from 'controller/role.controller';
import { checkRole, validateToken } from 'middleware/auth';

const route = Router();

route.get('/', validateToken, checkRole(['admin']), roleController.getAllRoles);

route.get('/:id', validateToken, checkRole(['admin']), roleController.getrole);

route.post('/', validateToken, checkRole(['admin']), roleController.createrole);

route.patch(
  '/:id',
  validateToken,
  checkRole(['admin']),
  roleController.updaterole
);

route.delete(
  '/:id',
  validateToken,
  checkRole(['admin']),
  roleController.deleterole
);

export default route;
