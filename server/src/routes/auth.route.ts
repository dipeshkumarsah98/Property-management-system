import { Router } from 'express';
import * as authController from 'controller/auth.controller';
import { verifyToken } from 'middleware/auth';

const route = Router();

route.post('/send-otp', authController.sendOtp);

route.post('/login', authController.loginUser);

route.post('/register', verifyToken, authController.registerUser);

route.post('/refresh', authController.refreshUserToken);

export default route;
