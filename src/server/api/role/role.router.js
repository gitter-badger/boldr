import Router from 'koa-router';
import * as controller from './role.controller';
import { checkAuth } from '../../auth/validateToken';
const roleRouter = new Router({ prefix: '/api/v1/roles' });

roleRouter
    .get('/', controller.getAllRoles)

export default roleRouter;
