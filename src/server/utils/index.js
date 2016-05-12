import util from 'util';
export * as mailer from './mailer';
export logger from './logger';
/**
 * Normalize a port into a number, string, or false.
 */

export function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */

export function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port // eslint-disable-line
    : 'Port ' + process.env.NODE_PORT; // eslint-disable-line

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges'); // eslint-disable-line
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use'); // eslint-disable-line
      process.exit(1);
      break;
    default:
      throw error;
  }
}
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
