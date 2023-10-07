import sequelize from 'config/database.config';
import { CreateUserDto, UpdateUserDto } from 'dto/user.dto';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import { QueryTypes } from 'sequelize';
import logger from 'utils/logger';

const findOneWithEmail = async (email: string) => {
  logger.info(`Finding user with email ${email}`);

  const result = await sequelize.query(
    `
  select * from users where users.email = '${email}' ;
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length > 0)
    throw new NotFoundError('Email should be unique', 'Email should be unique');

  logger.info(`Sending user with email ${email}`);

  return result;
};

const createOne = async (userDto: CreateUserDto) => {
  const { email, name, password, roleId } = userDto;

  await findOneWithEmail(email);

  logger.info('Creating user');

  await sequelize.query(
    `
    insert into users (name, email, password, roleid) values (
      '${name}',
      '${email}',
      '${password}',
      '${roleId || 1}'
    );`,
    { type: QueryTypes.INSERT }
  );

  logger.info('User created');

  return { name, email, createdAt: Date.now(), updatedAt: Date.now() };
};

const findAll = async () => {
  logger.info('Retreiving all user list');

  const users = await sequelize.query(
    `
  select users.id, users.name, users.email, roles.name as role, users.createdat, users.updatedat 
  from users left join roles on users.roleid = roles.id;
 
 `,
    { type: QueryTypes.SELECT }
  );
  return users;
};

const findOne = async (userId: string) => {
  logger.info(`Finding user with id ${userId}`);

  const result = await sequelize.query(
    `
  select users.id, users.name, users.email, roles.name as role, users.createdat, users.updatedat 
  from users left join roles on users.roleid = roles.id where users.id = ${userId} ;
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length === 0)
    throw new NotFoundError(
      'No user found with given id',
      'No user found with given id'
    );

  logger.info(`Sending product with id ${userId}`);

  return result;
};

const updateOne = async (userId: string, updateDto: UpdateUserDto) => {
  const { email, name, roleId } = updateDto;

  await findOne(userId);

  let query = ``;
  if (email) {
    query += `email='${email}',`;
  }
  if (roleId) {
    query += `roleid='${roleId}',`;
  }
  if (name) {
    query += `name = '${name}'`;
  }
  if (query === ``) {
    throw new ValidationError(
      'At lest one field should be update',
      'At lest one field should be update'
    );
  }

  logger.info(`Updating collection with id ${userId}`);

  const updatedUser = await sequelize.query(
    `
    update users set ${query} where users.id = ${userId};
 `,
    {
      type: QueryTypes.UPDATE,
    }
  );
  return updatedUser;
};

const remove = async (userId: string) => {
  await findOne(userId);

  logger.info(`Deleting user with id ${userId}`);

  const result = await sequelize.query(
    `
    delete from users where users.id = ${userId};
    `,
    { type: QueryTypes.DELETE }
  );
  return result;
};

export { createOne, updateOne, findOne, findAll, remove };
