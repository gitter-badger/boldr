import thinky from 'thinky';
import dbConfig from './dbConfig';
import logger from 'server/utils/logger';

const conn = thinky(dbConfig, {
  silent: true
});

conn.r
  .getPoolMaster()
  .getConnection()
  .catch(() => {
    logger.error('Connection to DB failed.');
    process.exit(1);
  });

export default conn;
