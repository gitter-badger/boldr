import Koa from 'koa';
import Router from 'koa-router';
import compose from 'koa-compose';
import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import convert from 'koa-convert';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import error from 'koa-json-error';
import responseCalls from './responseCalls';
import bodyParser from './bodyParser';
import session from './session';
import jwt from './jwt';

/**
 * Boldr middleware bootstraps the majority of middleware for the app.
 * @class BoldrMiddleware
 * @param  {Object} application
 */
export default class BoldrMiddleware {
  static init(application) {
    application
      .use(responseCalls)
      .use(error())
      .use(bodyParser)
      .use(methodOverride())
      .use(etag())
      .use(jwt)
      .use(session)
      .use(helmet());
    application.use(passport.initialize());
    application.use(passport.session());
  }
}
