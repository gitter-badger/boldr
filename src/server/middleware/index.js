import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import RethinkDBSession from 'koa-generic-session-rethinkdb';
import compose from 'koa-compose';
import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import convert from 'koa-convert';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import responseCalls from './responseCalls';
import handleError from './handleError';
import { r } from '../db/connector';

const sessionStore = new RethinkDBSession({
  connection: r,
  db: process.env.RDB_NAME || 'boldr_dev',
  table: 'sessions'
});

require('co')(sessionStore.setup());

export default class BoldrMiddleware {
  static init(application) {
    application
      .use(responseCalls)
      .use(convert(logger()))
      .use(morgan('dev'))
      .use(bodyParser())
      .use(methodOverride())
      .use(etag())
      .use(convert(session({
        key: 'sid',
        store: sessionStore
      })))
      .use(helmet());
    application.use(passport.initialize());
    application.use(passport.session());
  }
}
