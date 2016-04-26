import logger from './logger';

export default (req, res, next) => {
  const _res = res.json;
  res.json = function(body) {
    _res.call(this, body);
    logger.info('sent response: ' + res.statusCode + ' ' + res.statusMessage); // eslint-disable-line
  };
  next();
};
