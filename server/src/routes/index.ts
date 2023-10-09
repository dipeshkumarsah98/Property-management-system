import { Router } from 'express';
import userRouter from 'routes/user.route';
import roleRouter from 'routes/role.route';
import authRouter from 'routes/auth.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
