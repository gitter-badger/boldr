import http from 'http';
import app from './boldr';
import sockets from './lib/socket';
import logger from './lib/logger';
import { connectDatabase } from './db/connector';
import config from 'config';

const { SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT } = config;
const server = http.createServer(app.callback());
sockets.register(app);

(async() => {
  try {
    logger.info('Connected');
  } catch (error) {
    logger.error('Unable to connect to database');
  }

  server.listen(SERVER_PORT);
  logger.info(`Server started on port ${SERVER_PORT}`);

  server.on('close', () => {
    logger.info('And now my watch has ended');
  });
})();
