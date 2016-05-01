import 'dotenv/config';
import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';

import Boldr from './boldr';
import projectConfig from '../../tools/config';
import { renderReact } from './middleware/renderReact';
import InitDev from './initDev';
import _log from './utils/logger';

const debug = _debug('app:server:dev');
const app = new Koa();
const log = _log(module);

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

// Start server.
app.on('error', (err, ctx) => {
  debug(err);
  log.debug('Boldr error', err, ctx);
});
app.listen(projectConfig.SERVER_PORT, () => {
  log.debug(`Boldr server listening on ${projectConfig.SERVER_PORT} in ${app.env} node`);
});
