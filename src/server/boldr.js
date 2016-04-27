import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import methodOverride from 'koa-methodoverride';
import routers from './api';
export default class Boldr {
  static init(application) {
    application
      .use(logger())
      .use(morgan('dev'))
      .use(bodyParser())
      .use(methodOverride());
    for (const router of routers) {
      application.use(router.routes());
      application.use(router.allowedMethods());
    }
  }
}
