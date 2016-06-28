/**
 * boldr/server/middleware/jwt
 * Session configuration
 *
 * @exports {Function} jwt - Middleware for handling jsonwebtokens with koa.
 */
import jwt from 'koa-jwt';
// verify jwt token and set `this.state.user`
export default jwt({
  secret: process.env.JWT_SECRET,
  cookie: 'token',
  key: 'user',
  passthrough: true
});
