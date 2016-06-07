import Redis from 'ioredis';
import logger from 'server/lib/logger';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redisClient.on('connect', () => {
  logger.info('redis has connected');
});

redisClient.on('error', err => {
  logger.error(err);
  process.exit(1);
});

redisClient.on('close', () => {
  logger.warn('redis has closed.');
  process.exit(1);
});

redisClient.on('reconnecting', () => {
  logger.info('redis has reconnecting');
});

export default redisClient;
