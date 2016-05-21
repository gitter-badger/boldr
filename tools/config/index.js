import dotenv from 'dotenv';
import { argv } from 'yargs';
import path from 'path';
dotenv.config();
export const env = (string) => {
  return process.env[string] || '';
};

const NODE_ENV = process.env.NODE_ENV || 'development';
export const ROOT_DIR = path.normalize(path.join(__dirname, '..', '..'));
const config = {
  // Environment
  __CLIENT__: true,
  __SERVER__: false,
  __DEV__: NODE_ENV === 'development',
  __PROD__: NODE_ENV === 'production',
  __DEBUG__: !!argv.debug,
  // Server Configuration
  SERVER_HOST: 'localhost',
  SERVER_PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'boldr',
  // Webpack Configuration
  WEBPACK_DEV_SERVER_PORT: 3001,
  VENDOR_DEPENDENCIES: [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'material-ui',
    'redux',
    'lodash',
    'classnames',
    'axios'
  ],
  RDB_HOST: process.env.RDB_HOST || '10.211.55.7',
  RDB_PORT: process.env.RDB_PORT || 28015,
  RDB_DB: process.env.RDB_DB || 'boldr_dev',
  logger: {
    console: true,
    level: 'silly', // 'silly' 'debug' 'verbose' 'info' 'warn' 'error'
    files: false
  },
  AWS: {
    config: {
      accessKeyId: process.env.AWS_KEY_ID || '',
      secretAccessKey: process.env.AWS_KEY_SECRET || '',
      region: 'us-west-1',
      endpoint: 's3.amazonaws.com'
    },
    s3: {
      bucket: 'boldr'
    }
  },
  mg: {
    api_key: process.env.MG_KEY || '',
    domain: process.env.MG_DOMAIN || 'boldr.io',
    from: 'noreploy@boldr.io'
  },
  // Project Structure
  PATH_BASE: ROOT_DIR,
  ENTRY_APP: 'client',
  DIR_SRC: 'src',
  DIR_CLIENT: 'app',
  DIR_STATIC: 'static',
  DIR_DIST: 'dist',
  DIR_BUILD: 'build',
  DIR_SERVER: 'server',
  DIR_TEST: '__tests__',
  DIR_NODE_MODULES: 'node_modules'
};

const paths = (dir = 'base') => {
  const resolve = path.resolve;
  const base = (...args) => (
  resolve.apply(resolve, [config.PATH_BASE, ...args])
  );
  const _paths = {
    base: base(),
    entryApp: base(config.DIR_SRC, config.DIR_CLIENT, config.ENTRY_APP),
    src: base(config.DIR_SRC),
    dist: base(config.DIR_STATIC, config.DIR_DIST),
    build: base(config.DIR_BUILD),
    server: base(config.DIR_SERVER),
    test: base(config.DIR_TEST),
    nodeModules: base(config.DIR_NODE_MODULES)
  };

  return _paths[dir];
};

export { config as default, paths };
