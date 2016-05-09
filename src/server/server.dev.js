import dotenv from 'dotenv';
import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';
import { createServer } from 'http';
import proxy from 'koa-proxy';
import SocketIO from 'socket.io';
import Boldr from './boldr';
import BoldrMiddleware from './middleware';
import projectConfig from 'config';
import { logger as _log, normalizePort, onError } from './utils';
import { handleRender } from './utils/renderReact';

dotenv.config();

const debug = _debug('app:server:dev');
const app = new Koa();
// export server for easier testing.
export const server = createServer(app.callback());
const io = SocketIO(server);
// Logging
const log = _log(module);
// Application constants
const { SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT } = projectConfig;

async function init() {
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

  // This is fired every time the server side receives a request
  app.use(handleRender);

  await server.listen(SERVER_PORT, () => {
    log.debug(`Boldr server listening on ${SERVER_PORT} in ${process.env.NODE_ENV} node`);
  });
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? ` pipe ${addr}`
    : ` port ${addr.port}`;
  debug(`listening on  ${bind}`);
}

init();
