import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import compose from 'koa-compose';
import methodOverride from 'koa-methodoverride';
import passport from 'koa-passport';
import convert from 'koa-convert';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import responseCalls from './responseCalls';
import handleError from './handleError';

export default function middleware() {
  return compose([
    responseCalls,
    convert(logger()),
    morgan('dev'),
    bodyParser(),
    methodOverride(),
    etag(),
    convert(session()),
    handleError(),
    helmet()]);
}
