/**
 * boldr/server
 * Main web server.
 *
 * @exports {Object} app - Koa
 * @exports {Object} server - HTTP built into node.
 */
import dotenv from 'dotenv';

import Koa from 'koa';
import { createServer } from 'http';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';
import proxy from 'koa-proxy';
import Router from 'koa-router';

import BoldrMiddleware from './middleware';
import config from 'config';
import handleError from './middleware/handleError';
import rethinkdbSocket from './lib/socket/rethinkdbSocket';
import routers from './api';
import { Problem, logger, handleRender } from './utils';
// Load environment variables.
dotenv.config();
const debug = _debug('boldr:server:dev');

// Application constants
const { SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT } = config;

const app = new Koa();
const server = createServer(app.callback());
app.name = 'Boldr';
app.proxy = true;
app.env = process.env.NODE_ENV;
app.keys = [config.JWT_SECRET];

// allow both legacy and modern middleware
// https://www.npmjs.com/package/koa-convert
const use = app.use;
app.use = x => use.call(app, convert(x));

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
  app.use(serve('static'));
  // This is fired every time the server side receives a request
  app.use(handleRender);

  app.use(handleError);
})();

/**
 * Initialize the HTTP server, Socket server and RethinkDB Socket server.
 * @method init
 */
function init() {
  server.listen(SERVER_PORT, () => {
    logger.info(`Doing Boldr things on port ${SERVER_PORT}`);
  });

  rethinkdbSocket(server);

  server.on('close', () => {
    process.on('SIGINT', exitHandler);
    logger.info('Keep on, keepin on. Boldr out.');
  });

  function exitHandler(error) {
    if (error) {
      logger.error(error.stack);
      process.exit(1);
    }
    process.exit(0);
  }
}

init();

export { app as default, server };
