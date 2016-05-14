import Router from 'koa-router';
import * as controller from './role.controller';
import { checkAuth } from '../../auth/validateToken';
const roleRouter = new Router({ prefix: '/api/v1/roles' });

roleRouter
    .post('/', controller.createRole)
    .get('/', controller.getAllRoles)
    .get('/:id', controller.getId)
    .put('/:id', controller.update)
    .delete('/:id', controller.destroy);

export default roleRouter;
