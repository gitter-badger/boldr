import util from 'util';
import mailer from './mailer';
import logger from './logger';

/**
 * Clones an object
 * @param  {Mixed}    obj        The object to clone
 * @param  {Boolean} [deep=true] Optional. Deep cloning
 * @return {Mixed} The same object, but different reference
 */
function clone(obj, deep = true) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Copy constructor
  const result = obj.constructor();
  Object.keys(obj).forEach(key => {
    result[key] = deep ? clone(obj[key]) : obj[key];
  });

  return result;
}

export { mailer, logger, clone };
