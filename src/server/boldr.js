import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';

import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import convert from 'koa-convert';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import routers from './api';
import handleError from './middleware/handleError';
import config from '../../tools/config';

export default class Boldr {
  static init(application) {
    application.keys = [config.session.keys];
    application
      .use(convert(logger()))
      .use(morgan('dev'))
      .use(bodyParser())
      .use(methodOverride())
      .use(etag())
      .use(convert(session()))
      .use(helmet());
    require('./auth/passport');

    application.use(passport.initialize());
    application.use(passport.session());
    for (const router of routers) {
      application.use(router.routes());
      application.use(router.allowedMethods());
    }
    application.use(handleError());
  }
}
