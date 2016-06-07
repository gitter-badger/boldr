import http from 'http';
import app from './boldr';
import sockets from './lib/socket';
import logger from './lib/logger';
import redisClient from './db/redis';
import { connectDatabase } from './db/connector';
import config from 'config';
import { inspect } from 'util';
const { SERVER_HOST, SERVER_PORT, WEBPACK_DEV_SERVER_PORT } = config;

(async() => {
  const server = await http.createServer(app.callback());
  await sockets.register(app);
  try {
    server.listen(SERVER_PORT);
    logger.info(`Server started on port ${SERVER_PORT}`);

    redisClient.on('connect', () => app.emit('log', 'info', 'redis connected'));
    redisClient.on('error', err => app.emit('error', err));
  } catch (error) {
    // handle uncaught exceptions
    process.on('uncaughtException', err => {
      logger.error(inspect(err && err.stack || err, {
        colors: true,
        showHidden: true,
        depth: null
      }));
    });
  }
  server.on('close', () => {
    logger.info('And now my watch has ended');
  });
    // handle graceful restarts
  process.on('SIGTERM', () => {
    if (!server || !server.close) {
      return process.exit(0);
    }
    server.close((err) => {
      if (err) {
        app.emit('error', err);
        process.exit(1);
        return;
      }
      process.exit(0);
    });
  });
})();
