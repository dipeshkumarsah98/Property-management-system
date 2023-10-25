import { Router } from 'express';
import * as userController from 'controller/user.controller';
import { validateToken, checkItSelf, checkRole } from 'middleware/auth';

const route = Router();

route.get('/', validateToken, checkRole(['admin']), userController.getAllUsers);

route.post('/', validateToken, checkRole(['admin']), userController.createUser);

route.get('/:id', validateToken, checkItSelf, userController.getUser);

route.patch('/:id', validateToken, checkItSelf, userController.updateUser);

route.delete(
  '/:id',
  validateToken,
  checkItSelf,
  checkRole(['admin']),
  userController.deleteUser
);

export default route;
