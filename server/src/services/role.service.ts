import sequelize from 'config/database.config';
import { CreateRoleDto, UpdateRoleDto } from 'dto/role.dto';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import { QueryTypes } from 'sequelize';
import logger from 'utils/logger';

const findOneWithName = async (name: string) => {
  logger.info(`Finding role with name ${name}`);

  const result = await sequelize.query(
    `
  select * from roles where roles.name = '${name}' ;
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length > 0)
    throw new NotFoundError(
      'Role name should be unique',
      'Role name should be unique'
    );

  logger.info(`Sending role with name ${name}`);

  return result;
};

const createOne = async (roleDto: CreateRoleDto) => {
  const { name, description } = roleDto;

  await findOneWithName(name);

  logger.info('Creating role');

  const result = await sequelize.query(
    `
    insert into roles (name, description) values (
      '${name}',
      '${description}' 
    )
    `,
    { type: QueryTypes.INSERT }
  );

  logger.info('Role created');

  return { name, description, createdAt: Date.now(), updatedat: Date.now() };
};

const findAll = async () => {
  logger.info('Retreiving all role list');

  const roles = await sequelize.query(
    `
  select * from roles;
 
 `,
    { type: QueryTypes.SELECT }
  );

  return roles;
};

const findOne = async (roleId: string) => {
  logger.info(`Finding role with id ${roleId}`);

  const result = await sequelize.query(
    `
   select * from roles where roles.id = ${roleId}; 
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length === 0)
    throw new NotFoundError(
      'No role found with given id',
      'No role found with given id'
    );

  logger.info(`Sending role with id ${roleId}`);

  return result;
};

const updateOne = async (roleId: string, updateRoleDto: UpdateRoleDto) => {
  const { description, name } = updateRoleDto;

  await findOne(roleId);

  let query = ``;
  if (description) {
    query += `description='${description}'`;
  }
  if (name) {
    await findOneWithName(name);
    query += `name = '${name}'`;
  }
  if (description && name) {
    query = `name='${name}', description='${description}'`;
  }
  if (query === ``) {
    throw new ValidationError(
      'At lest one field should be update',
      'At lest one field should be update'
    );
  }

  logger.info(`Updating role with id ${roleId}`);

  const roleUser = await sequelize.query(
    `
    update roles set ${query} where roles.id = ${roleId}
 `,
    {
      type: QueryTypes.UPDATE,
    }
  );
  return roleUser;
};

const remove = async (roleId: string) => {
  logger.info(`Deleting role with id ${roleId}`);

  await findOne(roleId);

  const result = await sequelize.query(
    `
    delete from roles where roles.id = ${roleId}
    `,
    { type: QueryTypes.DELETE }
  );
  return result;
};

export { createOne, updateOne, findOne, findAll, remove };
