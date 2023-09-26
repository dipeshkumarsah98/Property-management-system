/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import sequelize from 'config/database.config';
import ValidationError from 'errors/badRequestError';
import NotFoundError from 'errors/notFoundError';
import { Login, User } from 'models';

type CreateUserTypes = {
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  login_uuid: string;
  email: string;
  password: string;
};

const createUserTransaction = async (data: CreateUserTypes) => {
  // created transaction where User and Login both table should gets updated or no one gets updated
  const result = await sequelize.transaction(async (t) => {
    const login = await Login.createLoginCredential(
      { email: data.email, password: data.password },
      { transaction: t }
    );
    const details = {
      ...data,
      login_id: login?.id || '',
    };
    const user = await User.createUser(details, { transaction: t });
    return {
      id: user?.id,
      uuid: user?.uuid,
      email: login?.email,
      firstName: user?.first_name,
      lastName: user?.last_name,
    };
  });
  return result;
};

export const createNewUser = async (data: CreateUserTypes) => {
  // checking if email is already in use
  const doesUserAlreadyExit = await Login.findLoginCredential({
    email: data.email,
  });

  if (doesUserAlreadyExit) {
    throw new ValidationError(
      'Email is already in use',
      'Email is already in use. Please use another email'
    );
  }
  // Transaction to create new user.
  const result = await createUserTransaction(data);

  return result;
};

export const getParticularUser = async (condition: any) => {
  const user = await User.findUser(condition);

  // if no user is found
  if (!user) {
    throw new NotFoundError(
      'No user found with given id',
      'No user found with given id'
    );
  }
  return user.toJSON();
};
