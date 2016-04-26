import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from 'config';
import render from 'server/middlewares/render';
import logger from 'server/lib/logger/logger';
import { session as bldrSess } from 'server/middlewares/session';

const server = express();

if (config.env === 'development') {
  require('server/middlewares/webpack').default(server);
}

if (config.env === 'production') {
  server.use(compression());
  server.use(bodyParser.json());
  server.use('/dist', express.static(config.distFolder));
  server.use(config.apiUrl, require('api').default);
}

server.use('/assets', express.static(config.assetsFolder));
server.use(render);

server.use(session({
  store: bldrSess,
  key: 'tsg.sid',
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

server.listen(config.port, 'localhost', err => {
  /* eslint-disable no-console */
  if (err) {
    return console.log(err);
  }
  logger.info(`[APP] listening at localhost:${config.port} in ${config.env} mode`);
/* eslint-enable no-console */
});
