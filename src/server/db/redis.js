import Redis from 'ioredis';
import logger from 'server/lib/logger';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redisClient.on('connect', () => {
  logger.info('Redis server is listening.');
});

redisClient.on('error', err => {
  logger.error(err);
  process.exit(1);
});

redisClient.on('close', () => {
  logger.warn('Redis closed..');
  process.exit(1);
});

redisClient.on('reconnecting', () => {
  logger.info('Redis is reconnecting');
});

export default redisClient;
