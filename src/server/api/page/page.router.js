import Router from 'koa-router';
import * as controller from './page.controller';
import { checkAuth } from '../../auth/validateToken';
// import { isAuthenticated } from '../../auth/local/passport';
const pageRouter = new Router({ prefix: '/api/v1/pages' });

pageRouter
    .get('/', controller.getAllPages)

export default pageRouter;
