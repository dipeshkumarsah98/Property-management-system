import { Router } from 'express';
import userRouter from 'routes/user.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);

export default apiRouter;
