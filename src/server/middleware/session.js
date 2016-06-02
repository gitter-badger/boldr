/**
 * boldr/server/middleware/session
 * Session configuration
 *
 * @exports {Function} session - Middleware for sessions
 */
import session from 'koa-session2';
import Store from '../db/redis';

const TTL = 15 * 60 * 1000; // 15 minutes // session timeout, in seconds

export default session({
  store: new Store(),
  ttl: TTL,
  reconnectTimeout: 10000,
  rolling: true
});
