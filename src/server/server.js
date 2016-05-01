import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';
import convert from 'koa-convert';

import Boldr from './boldr';
import projectConfig from '../../tools/config';
import { renderReact } from './middleware/renderReact';
import InitDev from './initDev';
const debug = _debug('app:server:dev');
const app = new Koa();

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

/* ****************
 START THE SERVER
***************** */
app.on('error', (err, ctx) => {
  debug(err);
  debug('Boldr error', err, ctx);
});
app.listen(projectConfig.SERVER_PORT, () => {
  debug(`Boldr server listening on ${projectConfig.SERVER_PORT} in ${app.env} node`);
});
