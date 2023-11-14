import { Router } from 'express';
import userRouter from 'routes/user.route';
import roleRouter from 'routes/role.route';
import authRouter from 'routes/auth.route';
import propertyTypeRouter from 'routes/propertyType.route';
import propertyRouter from 'routes/property.route';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/property', propertyRouter);
apiRouter.use('/property-type', propertyTypeRouter);

export default apiRouter;
