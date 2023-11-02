import sequelize from 'config/database.config';
import { CreateRoleDto, UpdateRoleDto } from 'dto/role.dto';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import { QueryTypes } from 'sequelize';
import logger from 'utils/logger';

const findOneWithName = async (name: string) => {
  logger.info(`Finding property type with name ${name}`);

  const result = await sequelize.query(
    `
  select * from property_type where property_type.name= '${name}' ;
    `,
    { type: QueryTypes.SELECT }
  );

  logger.info(`Sending property_type with name ${name}`);

  return result;
};

const createOne = async (roleDto: CreateRoleDto) => {
  const { name, description } = roleDto;

  const type = await findOneWithName(name);

  if (type.length > 0)
    throw new ValidationError('name should be unique', 'name should be unique');

  logger.info('Creating property_type');

  await sequelize.query(
    `
    insert into property_type (name, description) values (
      '${name}',
      '${description}' 
    );
    `,
    { type: QueryTypes.INSERT }
  );

  logger.info('Property_type created');

  return { name, description, createdAt: Date.now(), updatedat: Date.now() };
};

const findAll = async () => {
  logger.info('Retreiving all property_type list');

  const properties = await sequelize.query(
    `
  select * from property_type;
 
 `,
    { type: QueryTypes.SELECT }
  );

  return properties;
};

const findOne = async (typeId: string) => {
  logger.info(`Finding property_type with id ${typeId}`);

  const result = await sequelize.query(
    `
   select * from property_type where property_type.id = ${typeId}; 
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length === 0)
    throw new NotFoundError(
      'No record found with given id',
      'No record found with given id'
    );

  logger.info(`Sending property_type with id ${typeId}`);

  return result;
};

const updateOne = async (typeId: string, updateRoleDto: UpdateRoleDto) => {
  const { description, name } = updateRoleDto;

  await findOne(typeId);

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

  logger.info(`Updating property_type with id ${typeId}`);

  await sequelize.query(
    `
    update roles set ${query} where roles.id = ${typeId}
 `,
    {
      type: QueryTypes.UPDATE,
    }
  );

  return findOne(typeId);
};

const remove = async (typeId: string) => {
  logger.info(`Deleting property_type with id ${typeId}`);

  await findOne(typeId);

  const result = await sequelize.query(
    `
    delete from property_type where property_type.id = ${typeId}
    `,
    { type: QueryTypes.DELETE }
  );
  return result;
};

export { createOne, updateOne, findOne, findAll, remove };
