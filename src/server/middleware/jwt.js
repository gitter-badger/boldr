/**
 * boldr/server/middleware/jwt
 * Session configuration
 *
 * @exports {Function} jwt - Middleware for handling jsonwebtokens with koa.
 */
import jwt from 'koa-jwt';
import convert from 'koa-convert';
// verify jwt token and set `this.state.user`
export default convert(jwt({
  secret: process.env.JWT_SECRET,
  cookie: 'token',
  key: 'user',
  passthrough: true
}));
