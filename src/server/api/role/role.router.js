import Router from 'koa-router';
import * as controller from './role.controller';

const roleRouter = new Router({ prefix: '/api/v1/roles' });

roleRouter
    .post('/', controller.createRole)
    .get('/', controller.getAllRoles)
    .get('/:id', controller.getId)
    .put('/:id', controller.update)
    .delete('/:id', controller.destroy)
    .post('/:id/add', controller.addUserToRole);
export default roleRouter;
