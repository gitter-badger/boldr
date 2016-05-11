/**
 * boldr/server/middleware/session
 * Session configuration
 *
 * @requires {Object} redisStore - redisStore or any other type of system.
 * @exports {Function} session - Middleware for sessions
 */
import session from 'koa-generic-session';
import convert from 'koa-convert';
import redisStore from './redisStore';

const TTL = 15 * 60 * 1000; // 15 minutes // session timeout, in seconds

export default convert(session({
  store: redisStore,
  ttl: TTL,
  reconnectTimeout: 10000,
  rolling: true
}));
