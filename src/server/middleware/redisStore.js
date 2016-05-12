import RedisStore from 'koa-redis';
import redis from 'ioredis';
import config from 'config';

const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT
});

const redisStore = new RedisStore({
  client: redisClient
});

export default redisStore;
