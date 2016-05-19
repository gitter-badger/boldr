import Koa from 'koa';
import _debug from 'debug';
import serve from 'koa-static';

import projectConfig from 'config';
import { handleRender } from './utils/renderReact';

const debug = _debug('app:server:prod');
const app = new Koa();

app.use(serve('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(projectConfig.SERVER_PORT, () => {
  debug(`Boldr server listening on ${projectConfig.SERVER_PORT} in ${process.env.NODE_ENV} node`);
});
