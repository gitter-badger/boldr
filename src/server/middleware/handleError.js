import logger from '../utils/logger';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    logger.error('errorHandler:', err);
    ctx.body = {
      message: err.message
    };
    ctx.app.emit('error', err, ctx);
  }
};
