import createTable from 'migrations/create-table';
// eslint-disable-next-line import/extensions
import logger from './logger';

// eslint-disable-next-line import/prefer-default-export
export const migrateDatabase = async () => {
  logger.info('Migrating database..');
  await createTable();
  logger.info('Migration was successfull');
};
