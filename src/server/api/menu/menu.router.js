import Router from 'koa-router';
import * as controller from './menu.controller';

const menuRouter = new Router({ prefix: '/api/v1/menus' });

menuRouter
    .get('/', controller.getAllMenus)

export default menuRouter;
