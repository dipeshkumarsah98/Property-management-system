import { Router } from 'express';
import * as roleController from 'controller/role.controller';

const route = Router();

route.get('/', roleController.getAllRoles);

route.post('/', roleController.createrole);

route.get('/:id', roleController.getrole);

route.patch('/:id', roleController.updaterole);

route.delete('/:id', roleController.deleterole);

export default route;
