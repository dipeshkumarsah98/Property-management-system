import Joi from 'joi';

const SizeOptions = ['SM', 'MD', 'LG', 'XL', '2XL', '3XL', '4XL'];

const validationSchema = {
  authSchema: {
    login: Joi.object({
      email: Joi.string().email().required().messages({
        'any.required': `"email" is a required field`,
        'string.email': `"email" should be a type of 'email'`,
      }),
      password: Joi.string().messages({
        'string.min': `"password" should have a minimun lengt of {#limit}`,
        'string.empty': `"password" cannot be an empty field`,
      }),
    }),
    'send-otp': Joi.object({
      email: Joi.string().email().required(),
    }),
    register: Joi.object({
      token: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    }),
    refreshToken: Joi.object({
      token: Joi.string().required().messages({
        'any.required': `"Token" is a required field`,
        'string.empty': `"Token" cannot be an empty field`,
      }),
    }),
  },
  userSchema: {
    createUser: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    }),
    updateUser: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
    }),
  },
  roleSchema: {
    createRole: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }),
    updateRole: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
    }),
  },
};

export default validationSchema;
