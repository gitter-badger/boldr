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

export default function middleware() {
  return compose([
    responseCalls,
    convert(logger()),
    morgan('dev'),
    bodyParser(),
    methodOverride(),
    etag(),
    convert(session({
      key: 'sid',
      store: sessionStore
    })),
    handleError(),
    helmet()]);
}
