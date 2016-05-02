import 'dotenv/config';
import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';
import { createServer } from 'http';

import Boldr from './boldr';
import projectConfig from '../../tools/config';
import { renderReact } from './middleware/renderReact';
import InitDev from './initDev';
import { logger as _log, normalizePort, onError } from './utils';

const debug = _debug('app:server:dev');
const app = new Koa();
const server = createServer(app.callback());
const log = _log(module);

export function init() {
  Boldr.init(app);
  /**
   * Loads the development specific functions
   * @param  {Boolean} __DEV__ Global variable for development environment
   * @return {InitDev}        The initializer class for development
   */
  if (__DEV__) {
    InitDev.init(app);
  }
  app.use(serve('static'));

  // This is fired every time the server side receives a request
  app.use(renderReact);

  server.listen(process.env.NODE_PORT, () => {
    log.debug(`Boldr server listening on ${process.env.NODE_PORT} in ${process.env.NODE_ENV} node`);
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
