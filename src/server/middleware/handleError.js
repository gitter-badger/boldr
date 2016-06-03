import { errors, logger } from '../lib';

export const handleError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof errors.HttpError) {
      logger.warn('HttpError err', err.message, err.status);
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = { error: 'Protected resource, use Authorization header to get access' };
      } else {
        ctx.status = err.status;
        logger.debug('HttpError err', err.message, err.stack);
        ctx.body = { error: err.message };
      }
    } else if (err instanceof errors.ServiceError) {
      logger.debug('ServiceError err', err.message, err.stack);
      logger.warn('ServiceError err', err.message, err.status);
      ctx.status = 400;
      ctx.body = { error: err.message };
    } else if (err instanceof errors.ModelError) {
      logger.warn('ModelError err', err.message, err.status);
      logger.debug('ModelError err', err.message, err.stack);
      ctx.status = 400;
      ctx.body = { error: err.message };
    } else if (err instanceof errors.AppError) {
      logger.warn('AppError err', err.message, err.stack);
      ctx.status = 400;
      ctx.body = { error: err.message };
    } else {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = { error: 'Protected resource, use Authorization header to get access' };
      } else {
        if (__DEV__) {
          throw err;
        } else {
          ctx.status = 400;
          logger.error('Uncathed error', err.message, err.stack);
          ctx.body = { error: 'Uncatched error' };
        }
      }
    }
  }
};
