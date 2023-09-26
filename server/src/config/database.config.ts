import { Sequelize } from 'sequelize';
import env from 'config/env.config';
import Config from 'config/config';

type Dialect = 'postgres';
const { NODE_ENV } = env;
const config = Config[NODE_ENV];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect as Dialect,
  }
);

export default sequelize;
