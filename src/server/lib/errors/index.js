import { STATUS_CODES } from 'http';

export default () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.isBoom) {
        ctx.body = err.output.payload;
        ctx.status = err.output.statusCode;

        return;
      }
      ctx.app.emit('error', err, ctx);
        // others
      ctx.status = ctx.status || 500;
      const message = err.message;

      ctx.type = 'application/json';
      ctx.body = {
        code: STATUS_CODES[ctx.status],
        message
      };
    }
  };
};
