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
import { createServer } from 'http';
import proxy from 'koa-proxy';
import config from 'config';
import Boldr from './boldr';
import BoldrMiddleware from './middleware';
import Problem from './utils/problem';
import logger from './utils/logger';
import { handleRender } from './utils/renderReact';
const RethinkdbWebsocketServer = require('rethinkdb-websocket-server');
dotenv.config();
const debug = _debug('boldr:server:dev');

// Application constants
const {SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT} = config;

const app = new Koa();
app.name = 'Boldr';
app.env = process.env.NODE_ENV;
app.keys = [config.JWT_SECRET];
// allow both legacy and modern middleware
// https://www.npmjs.com/package/koa-convert
const use = app.use;
app.use = x => use.call(app, convert(x));

export const server = createServer(app.callback());
(async() => {
  await BoldrMiddleware.init(app);
  await Boldr.initRoutes(app);

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
  app.use(serve('static'));
  app.use(async (ctx, next) => {
    const start = new Date();
    ctx.Problem = Problem;
    ctx.req.body = ctx.request.body;
    const end = new Date();
    logger.info(`${ctx.method} ${ctx.status} ${ctx.url} => ${end - start}ms`);
    await next();
  });
  // This is fired every time the server side receives a request
  app.use(handleRender);

  server.listen(SERVER_PORT, () => {
    logger.info(`Doing Boldr things on port ${SERVER_PORT}`);
  });

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
})();
RethinkdbWebsocketServer.listen({
  httpServer: server,
  httpPath: '/db',
  dbHost: '168.235.72.129',
  dbPort: 28015,
  unsafelyAllowAnyQuery: true
});
export default app;