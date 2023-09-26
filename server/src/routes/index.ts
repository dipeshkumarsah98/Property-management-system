import { Router } from 'express';
import authRouter from 'routes/auth.route';
import userRouter from 'routes/user.route';
import productRouter from 'routes/product.route';
import categoryRouter from 'routes/category.route';

const apiRouter = Router();

apiRouter.use(`/auth`, authRouter);
apiRouter.use(`/users`, userRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/categories', categoryRouter);

export default apiRouter;
