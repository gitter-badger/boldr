/**
 * server/utils/logger
 * Starts a winston logging session
 *
 * @exports {EventHandler} - Winston event handler
 */
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import config, { paths } from 'config';

const getFilePath = m => m.filename.split('/').slice(-2).join('/');

const dirLog = path.join(process.cwd(), 'docs/logs');
if (!fs.existsSync(dirLog)) {
  fs.mkdirSync(dirLog);
}
const filePath = path.join(dirLog, 'all.log');
const transports = [];

if (config.logger.console) {
  transports.push(
    new winston.transports.Console({
      handleExceptions: false,
      prettyPrint: true,
      colorize: true,
      level: config.logger.level,
      label: getFilePath(module),
      timestamp: () => new Date().toLocaleString()
    })
  );
}

if (config.logger.files) {
  transports.push(
    new winston.transports.File({
      handleExceptions: false,
      name: 'error-file',
      filename: filePath,
      maxSize: 5242880, // 5mb
      level: 'error'
    })
  );
}

const logger = new winston.Logger({ transports });

logger.exitOnError = false;

process.on('unhandledRejection', (reason, promise) => {
  logger.warn(`Unhandled rejection at ${promise}\n`, reason);
});

export default logger;
