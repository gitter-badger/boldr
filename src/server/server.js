import http from 'http';
import app from './boldr';
import { inspect } from 'util';

import logger from './lib/logger';
import redisClient from './db/redis';
import { config } from 'config/boldr';

const server = http.createServer(app.callback());

(async() => {
  try {
    server.listen(config.port);
    logger.info(`💚  Server started on port ${config.port}`);

    redisClient.on('connect', () => app.emit('log', 'info', 'redis connected'));
    redisClient.on('error', err => app.emit('error', err));
    if (process.send) {
      process.send('online');
    }
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
    logger.info('Closing connection');
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

export default server;
