import Boom from 'boom';
import logger from '../utils/logger';

export default function() {
  return async(ctx, next) => {
    try {
      await next();
      if (ctx.status === 404 && !ctx.body) {
        ctx.throw(Boom.notFound('Endpoint not found.'));
      }
    } catch (err) {
      if (err.status === 400) err = Boom.badRequest(err.message); //eslint-disable-line
      if (err.isBoom) {
        ctx.body = err.output.payload;
        ctx.status = err.output.statusCode;
        return;
      }
      ctx.body = {
        message: err.message,
        stack: err.stack,
        options: err
      };

      ctx.status = err.status || 500;
      logger.error(err);
      ctx.app.emit('error', err, ctx);
    }
  };
}
