/**
 * boldr/server
 * Main web server.
 *
 * @exports {Object} app - Koa
 * @exports {Object} server - HTTP built into node.
 */
import dotenv from 'dotenv';

import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';
import proxy from 'koa-proxy';
import { join } from 'path';
import mount from 'koa-mount';
import Router from 'koa-router';
import BoldrMiddleware from './middleware';
import config from 'config';
import { handleError } from './middleware/handleError';
import routers from './api';
import { logger } from './lib';
import { Problem, handleRender } from './utils';
import connector from './db/connector';
import sockets from './lib/socket';
// Load environment variables.
dotenv.config();
const debug = _debug('boldr:server:dev');

// Application constants
const { SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT } = config;

const app = new Koa();

app.name = 'Boldr';
app.proxy = true;
app.env = process.env.NODE_ENV;
app.keys = [config.JWT_SECRET];

connector();
// allow both legacy and modern middleware
// https://www.npmjs.com/package/koa-convert
const use = app.use;
app.use = x => use.call(app, convert(x));
sockets.register(app);
/**
 * Asynchronous function that sets up the middleware
 * and context for Boldr.
 */
(async() => {
  await BoldrMiddleware.init(app);

  /**
   * Loads the development specific functions
   * @param  {Boolean} __DEV__ Global variable for development environment
   * @return {InitDev}        The initializer class for development
   */
  if (__DEV__) {
    app.use(convert(proxy({
      host: `http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`,
      match: /^\/build\//
    })));
  }

  /**
   * Middlewares set to be available on context.
   * @method use
   */
  app.use(async (ctx, next) => {
    ctx.Problem = Problem;
    ctx.req.body = ctx.request.body;
    await next();
  });
  // Load the routers.
  for (const router of routers) {
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
  // This is fired every time the server side receives a request
  app.use(handleRender);
  app.use(mount('/static', serve(join(__dirname, '..', '..', 'static'))));
})();

export default app;
