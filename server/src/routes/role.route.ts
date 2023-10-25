import { Router } from 'express';
import * as roleController from 'controller/role.controller';
import { validate } from 'middleware/validate';
import { checkRole } from 'middleware/auth';

const route = Router();

route.get('/', validate, checkRole(['admin']), roleController.getAllRoles);

route.get('/:id', validate, checkRole(['admin']), roleController.getrole);

route.post('/', validate, checkRole(['admin']), roleController.createrole);

route.patch('/:id', validate, checkRole(['admin']), roleController.updaterole);

route.delete('/:id', validate, checkRole(['admin']), roleController.deleterole);

export default route;
