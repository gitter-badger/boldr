/**
 * boldr/server/middleware/jwt
 * Session configuration
 *
 * @exports {Function} bodyParser - Middleware for parsing request bodies.
 */
import bodyParser from 'koa-bodyparser';

export default bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  },
  onerror(err, ctx) {
    ctx.throw('body parse error', 422);
  }
});
