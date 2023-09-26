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
    refreshToken: Joi.object({
      token: Joi.string().required().messages({
        'any.required': `"Token" is a required field`,
        'string.empty': `"Token" cannot be an empty field`,
      }),
    }),
  },
  userSchema: {
    createUser: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      contact: Joi.number().required(),
      dob: Joi.date().required(),
    }),
  },
  productSchema: {
    createProduct: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      color: Joi.array().required(),
      material: Joi.string().required(),
      image: Joi.array().required(),
      price: Joi.number().positive().allow(0).required(),
      available_stock: Joi.number().positive().allow(0).required(),
      size: Joi.array()
        .items(Joi.string().valid(...SizeOptions))
        .required(),
    }),
    updateProduct: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      material: Joi.string(),
      color: Joi.string(),
      image: Joi.string(),
      price: Joi.number().positive().allow(0),
      available_stock: Joi.number().positive().allow(0),
      size: Joi.array().items(Joi.string().valid(...SizeOptions)),
    }),
  },
  categorySchema: {
    createCategory: Joi.object({
      name: Joi.string().required(),
    }),
  },
  newArrivalSchema: {
    createNewArrival: Joi.object({
      product_id: Joi.number().required(),
    }),
    updateNewArrival: Joi.object({
      product_id: Joi.number(),
    }),
  },
};

export default validationSchema;
