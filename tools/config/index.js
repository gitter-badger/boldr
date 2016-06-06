import dotenv from 'dotenv';
import { argv } from 'yargs';
import path from 'path';
import paths from './paths';
dotenv.config();
export const env = (string) => {
  return process.env[string] || '';
};

const NODE_ENV = process.env.NODE_ENV || 'development';
export const ROOT_DIR = path.normalize(path.join(__dirname, '..', '..'));
export const API_BASE = '/api/v1';
const config = {
  // Environment
  __CLIENT__: true,
  __SERVER__: false,
  __DEV__: NODE_ENV === 'development',
  __PROD__: NODE_ENV === 'production',
  __DEBUG__: !!argv.debug,
  // Entry file
  BLDR_ENTRY: `${paths.APP_DIR}/client.jsx`,
  // Server Configuration
  SERVER_HOST: 'localhost',
  SERVER_PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'boldr',
  // Webpack Configuration
  WEBPACK_DEV_SERVER_PORT: 3001,
  PG_USER: process.env.PG_USER || 'postgres',
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: process.env.PG_PORT || 5432,
  PG_DB_NAME: process.env.PG_DB_NAME || 'boldr',
  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,
  logger: {
    console: true,
    level: 'silly', // 'silly' 'debug' 'verbose' 'info' 'warn' 'error'
    files: false
  },
  aws: {
    config: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      bucket: process.env.AWS_BUCKET || 'boldr',
      ACL: 'public-read',
      region: 'us-west-1',
      endpoint: 's3.amazonaws.com'
    },
    s3: {
      bucket: 'boldr',
      ACL: 'public-read'
    }
  },
  mg: {
    api_key: process.env.MG_KEY || '',
    domain: process.env.MG_DOMAIN || 'boldr.io',
    from: 'postmaster@boldr.io'
  },
  PATH_BASE: ROOT_DIR
};
export { config as default };
