import Koa from 'koa';
import webpack from 'webpack';
import _debug from 'debug';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import serve from 'koa-static';
import convert from 'koa-convert';
import Helmet from 'react-helmet';

import createRoutes from 'common/routes';
import Boldr from './boldr';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHotMiddleware from './middleware/webpack-hot';
import projectConfig from '../../tools/config';
import webpackConfig from '../../tools/webpack/dev.config';
import { renderReact } from './middleware/renderReact';

const debug = _debug('app:server:dev');
const app = new Koa();
const compiler = webpack(webpackConfig);
const serverOptions = { publicPath: webpackConfig.output.publicPath };

Boldr.init(app);

app.use(convert(serve('static')));

/**
 * WEBPACK CONFIGURATION
 * Use these middlewares to set up hot module reloading via webpack.
 */
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

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
