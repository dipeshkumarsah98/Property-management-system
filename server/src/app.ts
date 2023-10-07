/* eslint-disable prefer-destructuring */
/* eslint-disable import/first */
/* eslint-disable import/extensions */
require('express-async-errors');

import env from 'config/env.config';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import sequelize from 'config/database.config';
// import apiRouter from 'routes';
import swaggerSpec from 'config/swagger.config';
import apiRouter from 'routes';
import { corsHandler } from 'middleware/cors';
import { errorHandler } from 'middleware/errorHandler';
import { notFoundHandler } from 'middleware/notFound';
import logger from 'utils/logger';
import { QueryTypes } from 'sequelize';
import { migrateDatabase } from 'utils/migration';

const PORT = env.PORT;
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsHandler);
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // adding docs api

(async () => {
  await migrateDatabase();
})();

app.use('/api/v1/', apiRouter);
app.use('/test', async (req, res) => {
  const result = await sequelize.query('select * from users', {
    type: QueryTypes.SELECT,
  });

  return res.status(200).json(result);
});

app.use(notFoundHandler); // Not found middleware. It will get triggered when user try to access invalid route.

app.use(errorHandler); // Error handler middleware. It will get triggered when any error is encounterd in our app.

// Start if the database connection is established
sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection established successfully.');
    app.listen(PORT, () => {
      logger.info(`Server started successfully in ${PORT}`);
      logger.info(`Docs availabe at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });
