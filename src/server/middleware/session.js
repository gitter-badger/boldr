/**
 * boldr/server/middleware/session
 * Session configuration
 *
 * @exports {Function} session - Middleware for sessions
 */
import session from 'koa-session2';
import Store from '../db/redisStore';
import config from 'config';

export default session({
  store: new Store(),
  key: config.JWT_SECRET,
  secure: config.session.secure,
  httpOnly: config.session.http_only,
  domain: config.session.domain,
  maxAge: config.session.ttl * 1000
});
