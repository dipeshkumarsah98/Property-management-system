/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import validationSchema from 'schema/schema.validator';
import ValidationError from 'errors/badRequestError';

type SchemaKeys<T> = {
  [K in keyof T]: keyof T[K];
};

/**
 * @DESC Validate schema from request body Middleware
 */
const validate = <T extends keyof typeof validationSchema>(
  schemaName: T,
  schemaKey: SchemaKeys<typeof validationSchema>[T]
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = validationSchema[schemaName][schemaKey] as ObjectSchema<any>;
    if (!schema) {
      throw new ValidationError('No schema found', 'No schema found');
    }
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.message, error.details[0].message);
    }
    next();
  };
};
export { validate };
