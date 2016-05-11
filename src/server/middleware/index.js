import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import jwt from 'koa-jwt';
import compose from 'koa-compose';
import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import convert from 'koa-convert';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import responseCalls from './responseCalls';
import handleError from './handleError';
import redisStore from './redisStore';

const TTL = 15 * 60 * 1000; // 15 minutes // session timeout, in seconds
/**
 * Boldr middleware bootstraps the majority of middleware for the app.
 * @class BoldrMiddleware
 * @param  {Object} application
 */
export default class BoldrMiddleware {
  static init(application) {
    application
      .use(responseCalls)
      .use(convert(logger()))
      .use(morgan('dev'))
      .use(bodyParser())
      .use(methodOverride())
      .use(etag())
      // verify jwt token and set `this.state.user`
      .use(convert(jwt({
        secret: process.env.JWT_SECRET,
        cookie: 'token',
        key: 'user',
        passthrough: true
      })))
      .use(convert(session({
        store: redisStore,
        ttl: TTL,
        reconnectTimeout: 10000,
        rolling: true
      })))
      .use(helmet());
    application.use(passport.initialize());
    application.use(passport.session());
  }
}
