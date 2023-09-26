import env from './env.config';

interface DbConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
  };
}
const developmentUserName = env.DB_DEVELOPMENT_USER_NAME;
const developmentPassword = env.DB_DEVELOPMENT_PASSWORD;
const developmentDatabaseName = env.DB_DEVELOPMENT_DATABASE_NAME;
const developmentHost = env.DB_DEVELOPMENT_HOST;

const stagingUserName = env.DB_STAGING_USER_NAME;
const stagingPassword = env.DB_STAGING_PASSWORD;
const stagingDatabaseName = env.DB_STAGING_DATABASE_NAME;
const stagingHost = env.DB_STAGING_HOST;

const productionUserName = env.DB_PRODUCTION_USER_NAME;
const productionPassword = env.DB_PRODUCTION_PASSWORD;
const productionDatabaseName = env.DB_PRODUCTION_DATABASE_NAME;
const productionHost = env.DB_PRODUCTION_HOST;

const config: DbConfig = {};

if (
  developmentUserName &&
  developmentPassword &&
  developmentDatabaseName &&
  developmentHost
) {
  config.development = {
    username: developmentUserName,
    password: developmentPassword,
    database: developmentDatabaseName,
    host: developmentHost,
    dialect: 'postgresql',
  };
}
if (stagingUserName && stagingPassword && stagingDatabaseName && stagingHost) {
  config.staging = {
    username: stagingUserName,
    password: stagingPassword,
    database: stagingDatabaseName,
    host: stagingHost,
    dialect: 'postgresql',
  };
}
if (
  productionUserName &&
  productionPassword &&
  productionDatabaseName &&
  productionHost
) {
  config.production = {
    username: productionUserName,
    password: productionPassword,
    database: productionDatabaseName,
    host: productionHost,
    dialect: 'postgresql',
  };
}

export = config;
