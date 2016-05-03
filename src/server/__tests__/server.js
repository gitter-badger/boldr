/* eslint-disable */
import 'dotenv/config';
import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';
import { createServer } from 'http';
import proxy from 'koa-proxy';

import Boldr from '../boldr';
import { logger as _log, normalizePort, onError } from '../utils';

const debug = _debug('app:server:dev');
const app = new Koa();
export const server = createServer(app.callback());
const log = _log(module);

export function init() {
  Boldr.init(app);

  app.use(serve('static'));

  // This is fired every time the server side receives a request
  // app.use(handleRender);

  server.listen(3000, () => {
    log.debug(`Boldr server listening on 3000 in ${process.env.NODE_ENV} node`);
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
