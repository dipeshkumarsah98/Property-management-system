import { Router } from 'express';
import * as userController from 'controller/user.controller';
import { validate } from 'middleware/validate';
import { checkItSelf, checkRole } from 'middleware/auth';

const route = Router();

route.get('/', validate, checkRole(['admin']), userController.getAllUsers);

route.post('/', validate, checkRole(['admin']), userController.createUser);

route.get('/:id', validate, checkItSelf, userController.getUser);

route.patch('/:id', validate, checkItSelf, userController.updateUser);

route.delete(
  '/:id',
  validate,
  checkItSelf,
  checkRole(['admin']),
  userController.deleteUser
);

export default route;
