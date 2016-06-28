global.Promise = require('bluebird');
/**
 * boldr/server/boldr
 * Main web server.
 *
 * @exports {Object} app - Koa
 * @exports {Object} server - HTTP built into node.
 */
import dotenv from 'dotenv';
import Koa from 'koa';
import IO from 'koa-socket';
import serve from 'koa-static';
import convert from 'koa-convert';
import proxy from 'koa-proxy';
import { join } from 'path';
import mount from 'koa-mount';
import middleware from './middleware';
import config from 'config';
import routers from './api';
import { logger } from './lib';
import { handleRender } from './utils';
import connector from './db/connector';

// Load environment variables.
dotenv.config();

// Application constants
const { SERVER_HOST, WEBPACK_DEV_SERVER_PORT } = config;

const app = new Koa();
const io = new IO();
app.name = 'Boldr';
app.proxy = true;
app.env = process.env.NODE_ENV;
app.keys = [config.JWT_SECRET];
io.attach(app);
connector();

// allow both legacy and modern middleware
// https://www.npmjs.com/package/koa-convert
const use = app.use;
app.use = x => use.call(app, convert(x));

/**
 * Asynchronous function that sets up the middleware
 * and context for Boldr.
 */
(async() => {
  await middleware(app);

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
   * Enables logging of response time along w/ the request type, status code, endpoint
   * @param  {Function} async the context object on the request
   * @return {Object}       The response log output
   */
  app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const end = new Date();
    logger.info(`${ctx.method} ${ctx.status} ${ctx.url} => ${end - start}ms`);
  });

  /**
   * Middlewares set to be available on context.
   * @method use
   */
  app.use(async (ctx, next) => {
    ctx.req.body = ctx.request.body;
    await next();
  });

  // Load the routers.
  for (const router of routers) {
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
  // Error pages
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.app.emit('error', error, ctx);

      const pkg = {
        status: error.status || 500
      };

      if (app.env === 'development') {
        pkg.detail = error.stack;
      }

      if (error.expose) {
        pkg.title = error.message || 'Boldr has encountered an error';
      } else {
        pkg.title = 'Boldr has encountered an error';
      }
      ctx.status = pkg.status;

      return ctx.render('error', { error: pkg });
    }
  });

  // Error logging
  app.on('error', async (error, ctx, next) => {
    if (app.env === 'test') {
      return;
    }

    if (/4.*/.test(error.status)) {
      logger.verbose(`${ctx.method} ${ctx.status} ${ctx.url} |> ${error.message}`);
    } else {
      logger.error(error);
    }

    try {
      await next();
    } catch (err) {
      ctx.status = 500;
      ctx.body = 'Something went terribly wrong and things might get heated. Try again?';
      return;
    }
  });

  app.use(handleRender);
  app.use(mount('/static', serve(join(__dirname, '..', '..', 'static'))));
})();

export default app;
