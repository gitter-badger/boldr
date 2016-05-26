/**
 * boldr/server/middleware/session
 * Session configuration
 *
 * @requires {Object} ReSession - ReSession is rethinkdb session storage for koa.
 * @exports {Function} session - Middleware for sessions
 */
import session from 'koa-session2';
// import ReSession from 'koa-resession';
import Store from '../db/redis';

const TTL = 15 * 60 * 1000; // 15 minutes // session timeout, in seconds

// const sessionStore = new ReSession({
//   connection: rethinkdbdash,
//   browserSessionsMaxAge: 5000,
//   db: 'boldr_dev',
//   table: 'sessions'
// });
// sessionStore.setup();
export default session({
  store: new Store(),
  ttl: TTL,
  reconnectTimeout: 10000,
  rolling: true
});
