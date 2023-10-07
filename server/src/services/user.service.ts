import sequelize from 'config/database.config';
import { CreateUserDto, UpdateUserDto } from 'dto/user.dto';
import * as roleService from 'services/role.service';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import { QueryTypes } from 'sequelize';
import logger from 'utils/logger';
import { hashPassword } from 'utils/password';

const findOneWithEmail = async (email: string) => {
  logger.info(`Finding user with email ${email}`);

  const result = await sequelize.query(
    `
  select * from users where users.email = '${email}' ;
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length > 0)
    throw new ValidationError(
      'Email should be unique',
      'Email should be unique'
    );

  logger.info(`Sending user with email ${email}`);

  return result;
};

const createOne = async (userDto: CreateUserDto) => {
  const { email, name, password, roleId } = userDto;

  await findOneWithEmail(email);

  logger.info('Creating user');

  const encryptPassword = await hashPassword(password);

  console.log(
    '🚀 ~ file: user.service.ts:39 ~ createOne ~ encryptPassword:',
    encryptPassword
  );

  await sequelize.query(
    `
    insert into users (name, email, password, roleid) values (
      '${name}',
      '${email}',
      '${encryptPassword}',
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

  logger.info(`Sending user with id ${userId}`);

  return result;
};

const updateOne = async (userId: string, updateDto: UpdateUserDto) => {
  const { email, name, roleId } = updateDto;

  await findOne(userId);

  const values: { email?: string; roleId?: string; name?: string } = {};
  const conditions = [];

  if (email) {
    values.email = email;
    conditions.push('email = :email');
  }

  if (roleId) {
    await roleService.findOne(roleId);
    values.roleId = roleId;
    conditions.push('roleId = :roleId');
  }

  if (name) {
    values.name = name;
    conditions.push('name = :name');
  }

  const query = `UPDATE users SET ${conditions.join(', ')} WHERE id = :userId;`;

  await sequelize.query(query, {
    type: QueryTypes.UPDATE,
    replacements: { ...values, userId },
  });

  return findOne(userId);
};

const remove = async (userId: string) => {
  await findOne(userId);

  logger.info(`Deleting user with id ${userId}`);

  await sequelize.query(
    `
    delete from users where users.id = ${userId};
    `,
    { type: QueryTypes.DELETE }
  );
  return { message: `User deleted with id ${userId}` };
};

export { createOne, updateOne, findOne, findAll, remove };
