import sequelize from 'config/database.config';
import { UpdateUserDto } from 'dto/user.dto';
import * as roleService from 'services/role.service';
import NotFoundError from 'errors/notFoundError';
import { QueryTypes } from 'sequelize';
import logger from 'utils/logger';
import slugify from 'slugify';
import { CreatePropertyDto } from 'dto/property.dto';

const findOneWithSlug = async (slug: string) => {
  logger.info(`Finding user with email ${slug}`);

  const result = await sequelize.query(
    `
    select properties.id, properties.location, properties.description, properties.price, properties.size, properties.slug,
    properties.status, properties.images, property_type.name as type
    from properties left join property_type on properties.typeId = property_type.id where properties.slug = '${slug}';

    `,
    { type: QueryTypes.SELECT }
  );

  logger.info(`Sending user with slug ${slug}`);

  return result;
};

const createOne = async (propDto: CreatePropertyDto) => {
  const {
    amenities,
    description,
    images,
    location,
    price,
    size,
    status,
    typeId,
    userId,
    name,
  } = propDto;
  logger.info('Creating properties');

  const slug = slugify(description);

  const query = `
    insert into properties (name,location, description, price, size, slug,amenities, status,
        images, typeId, userId) values (
      '${name}',
      '${location}',
      '${description}',
      '${price}',
      '${size}',
      '${slug}',
      '${amenities}',
      '${status}',
      '${images}',
       ${+typeId} ,
       ${+userId}  
    );
  `;
  console.log('🚀 ~ file: property.service.ts:61 ~ createOne ~ query:', query);
  await sequelize.query(query, { type: QueryTypes.INSERT });

  logger.info('properties created');

  return findOneWithSlug(slug);
};

const findAll = async () => {
  logger.info('Retreiving all properties list');

  const properties = await sequelize.query(
    `
    select properties.id, properties.location, properties.description, properties.price, properties.size, properties.slug,
    properties.status, properties.images, property_type.name as type from properties left 
    join property_type on properties.typeId = property_type.id;
 
 `,
    { type: QueryTypes.SELECT }
  );
  return properties;
};

const findOne = async (id: string) => {
  logger.info(`Finding properites with id ${id}`);

  const result = await sequelize.query(
    `
    select properties.id, properties.location, properties.description, properties.price, properties.size, properties.slug,
    properties.status, properties.images, property_type.name as type from properties left 
    join property_type on properties.typeId = property_type.id where properties.id = ${id};
    `,
    { type: QueryTypes.SELECT }
  );

  if (result.length === 0)
    throw new NotFoundError(
      'No user found with given id',
      'No user found with given id'
    );

  logger.info(`Sending properties with id ${id}`);

  return result;
};

const updateOne = async (userId: string, updateDto: UpdateUserDto) => {
  const { email, name, roleId } = updateDto;
  return { message: 'Feature not implemented yet' };

  await findOne(userId);

  const values: { email?: string; roleId?: string; name?: string } = {};
  const conditions = [];

  if (email) {
    values.email = email;
    conditions.push('email = :email');
  }

  if (roleId) {
    // await roleService.findOne(roleId);
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

const remove = async (id: string) => {
  await findOne(id);

  logger.info(`Deleting user with id ${id}`);

  await sequelize.query(
    `
    delete from properties where properties.id = ${id};
    `,
    { type: QueryTypes.DELETE }
  );
  return { message: `User deleted with id ${id}` };
};

export { createOne, updateOne, findOne, findAll, remove, findOneWithSlug };
