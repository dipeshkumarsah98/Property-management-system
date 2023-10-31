import { Router } from 'express';
import * as userController from 'controller/user.controller';
import { validateToken, checkItSelf, checkRole } from 'middleware/auth';
import { validate } from 'middleware/validate';

const route = Router();

route.get('/', validateToken, checkRole(['admin']), userController.getAllUsers);

route.post(
  '/',
  validateToken,
  validate('userSchema', 'createUser'),
  checkRole(['admin']),
  userController.createUser
);

route.get('/:id', validateToken, checkItSelf, userController.getUser);

route.patch(
  '/:id',
  validateToken,
  checkItSelf,
  validate('userSchema', 'updateUser'),
  userController.updateUser
);

route.delete(
  '/:id',
  validateToken,
  checkItSelf,
  checkRole(['admin']),
  userController.deleteUser
);

export default route;
