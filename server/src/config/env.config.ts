/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
// importing configuration and middleware
import dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'staging')
      .required(),
    PORT: Joi.number().positive().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    ACCESSTOKENEXPIRETIME: Joi.string().required(),
    REFRESHTOKENEXPIRETIME: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: { label: 'key' },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config env validation error: ${error.message}`);
}

export default envVars;
