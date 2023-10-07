import sequelize from 'config/database.config';
import { QueryTypes } from 'sequelize';

type createUserDto = {
  name: string;
  email: string;
  password: string;
};

const createOne = async (userDto: createUserDto) => {
  const result = await sequelize.query(`
   select * from users; 
    `);
  return result;
};

const findOne = async (userId: string) => {
  const result = await sequelize.query(
    `
   select * from users where users.id = ${userId}; 
    `,
    { type: QueryTypes.SELECT }
  );
  return result;
};

export { createOne, findOne };
