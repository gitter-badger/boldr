import Koa from 'koa';
import Router from 'koa-router';
import routers from './api';
import handleError from './middleware/handleError';
import config from 'config';
export default class Boldr {
  static initRoutes(application) {
    for (const router of routers) {
      application.use(router.routes());
      application.use(router.allowedMethods());
    }
    application.use(handleError);
  }
}
