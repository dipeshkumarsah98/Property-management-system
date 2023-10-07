import { Router } from 'express';
import * as userController from 'controller/user.controller';

const route = Router();

route.get('/', userController.getAllUsers);

route.post('/', userController.createUser);

route.get('/:id', userController.getUser);

route.patch('/:id', userController.updateUser);

route.delete('/:id', userController.deleteUser);

export default route;
