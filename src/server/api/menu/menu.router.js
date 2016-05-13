import Router from 'koa-router';
import * as controller from './menu.controller';
import { checkAuth } from '../../auth/validateToken';
const menuRouter = new Router({ prefix: '/api/v1/menus' });

menuRouter
    .get('/', controller.getAllMenus)

export default menuRouter;
