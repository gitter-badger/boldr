import Router from 'koa-router';
import * as controller from './setting.controller';

const settingRouter = new Router({ prefix: '/api/v1/settings' });

settingRouter
  .post('/', controller.createSetting)
  .get('/', controller.getAllSettings)
  .get('/:id', controller.getId)
  .put('/:id', controller.update)
  .delete('/:id', controller.destroy);

export default settingRouter;
