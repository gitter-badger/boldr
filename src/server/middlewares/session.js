import session from 'express-session';
import connectRedis from 'connect-redis';
import { instance } from 'server/db/connector';

const redis = instance;
const RedisStore = connectRedis(session);

export default () =>
  new RedisStore(redis()
  );
