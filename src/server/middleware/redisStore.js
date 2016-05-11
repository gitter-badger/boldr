import RedisStore from 'koa-redis';
import redis from 'ioredis';

const redisClient = redis.createClient({
  host: '10.211.55.7',
  port: 6379
});

const redisStore = new RedisStore({
  client: redisClient
});

export default redisStore;
