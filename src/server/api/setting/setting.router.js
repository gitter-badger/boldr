import Router from 'koa-router';
import * as controller from './setting.controller';
import { checkAuth } from '../../auth/validateToken';
const settingRouter = new Router({ prefix: '/api/v1/settings' });

settingRouter
  .get('/', controller.getAllSettings);

export default settingRouter;
