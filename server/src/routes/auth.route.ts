import { Router } from 'express';
import * as authController from 'controller/auth.controller';
import { verifyToken } from 'middleware/auth';
import { validate } from 'middleware/validate';

const route = Router();

route.post(
  '/send-otp',
  validate('authSchema', 'send-otp'),
  authController.sendOtp
);

route.post('/login', validate('authSchema', 'login'), authController.loginUser);

route.post(
  '/register',
  validate('authSchema', 'register'),
  verifyToken,
  authController.registerUser
);

route.post(
  '/refresh',
  validate('authSchema', 'refreshToken'),
  authController.refreshUserToken
);

export default route;
