import { Router } from 'express';
import * as userController from 'controller/user.controller';

const route = Router();

route.post('/', userController.createUser);

route.get('/:id', userController.getUser);

export default route;
