import { Router } from 'express';
import * as authController from 'controller/auth.controller';

const route = Router();

route.post('/login', authController.loginUser);

route.post('/refresh', authController.refreshUserToken);

export default route;
