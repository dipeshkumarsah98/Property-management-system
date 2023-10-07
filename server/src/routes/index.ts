import { Router } from 'express';
import userRouter from 'routes/user.route';
import roleRouter from 'routes/role.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/roles', roleRouter);

export default apiRouter;
