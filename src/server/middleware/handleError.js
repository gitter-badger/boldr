import logger from '../utils/logger';

export const handleError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.toString()
    };
    ctx.app.emit('error', err, ctx);
    logger.error('errorHandler:', err);
  }
};
