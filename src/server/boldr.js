import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import routers from './api';

export default class Boldr {
  static init(application) {
    application
      .use(logger())
      .use(morgan('dev'))
      .use(bodyParser())
      .use(methodOverride())
      .use(passport.initialize())
      .use(passport.session())
      .use(async function(ctx, next) {
        console.log(ctx); // eslint-disable-line
        return await next();
      });
    for (const router of routers) {
      application.use(router.routes());
      application.use(router.allowedMethods());
    }
  }
}
