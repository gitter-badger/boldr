import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import convert from 'koa-convert';
import routers from './api';
import config from '../../tools/config';
export default class Boldr {
  static init(application) {
    application.keys = [config.session];
    application
      .use(logger())
      .use(morgan('dev'))
      .use(bodyParser())
      .use(convert(session()))
      .use(methodOverride())
      .use(async (ctx, next) => {
        return await next();
      });
    require('./auth/passport');

    application.use(passport.initialize());
    application.use(passport.session());
    for (const router of routers) {
      application.use(router.routes());
      application.use(router.allowedMethods());
    }
  }
}
