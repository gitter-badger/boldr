import convict from 'convict';
import path from 'path';
import 'server/utils/dotenv';

const conf = convict({
  version: {
    doc: 'The version of Boldr currently being used.',
    format: String,
    default: 'Invalid',
    env: 'npm_package_version',
    arg: 'npmPackageVersion'
  },
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test', 'stage'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'env'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
    arg: 'ip'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  webpackPort: {
    doc: 'The port bound for webpack hot reloading.',
    format: 'port',
    default: 3001,
    env: 'WP_PORT',
    arg: 'wpPort'
  },
  printStack: {
    doc: 'Indicates if the server should send the stack with the error.',
    format: Boolean,
    default: false,
    env: 'PRINT_STACK',
    arg: 'printStack'
  },
  db: {
    name: {
      doc: 'Name of the database.',
      format: String,
      default: 'boldr',
      env: 'DB_NAME',
      arg: 'dbName'
    },
    host: {
      doc: 'Host of the database.',
      format: String,
      default: 'http://localhost',
      env: 'DB_HOST',
      arg: 'dbHost'
    },
    dialect: {
      doc: 'The dialect of the database.',
      format: String,
      default: 'postgres',
      env: 'DB_DIALECT',
      arg: 'dbDialect'
    },
    port: {
      doc: 'Port used by the database.',
      format: Number,
      default: 5432,
      env: 'DB_PORT',
      arg: 'dbPort'
    },
    user: {
      doc: 'Username for the database.',
      format: String,
      default: 'postgres',
      env: 'DB_USER',
      arg: 'dbUser'
    },
    password: {
      doc: 'Password for the database.',
      format: String,
      default: 'password',
      env: 'DB_PASSWORD',
      arg: 'dbPassword'
    },
    pool: {
      enabled: {
        doc: 'Indicates if sequelize should use a connection pool or not.',
        default: true,
        format: Boolean,
        env: 'DB_POOL_ENABLED',
        arg: 'databasePoolEnabled'
      },
      maxConnections: {
        doc: 'If pool is enabled, max number of connections should be this.',
        default: 8,
        format: Number,
        env: 'DB_MAX_CONNECTIONS',
        arg: 'databaseMaxConnections'
      },
      minConnections: {
        doc: 'If pool is enabled, min number of connections should be this.',
        default: 0,
        format: Number,
        env: 'DB_POOL_MIN_CONNECTIONS',
        arg: 'databaseMinConnections'
      },
      maxIdleTime: {
        doc: 'If pool is enabled, max idle time of a connection in milliseconds.',
        default: 10000,
        format: Number,
        env: 'DB_POOL_MAX_IDLE_TIME',
        arg: 'databaseMaxIdleTime'
      }
    }
  },
  jwt: {
    secret: {
      doc: 'Secret for JWT and session storage.',
      format: String,
      default: 'boldrsecret',
      env: 'JWT_SECRET',
      arg: 'jwtSecret'
    },
    expiresIn: {
      doc: 'The expiration date of the JWT.',
      format: String,
      default: '1h',
      env: 'JWT_EXPIRE_IN',
      arg: 'jwtExpireIn'
    },
    maxIssuer: {
      doc: 'Maximum time in milliseconds how much the server tolaretes refreshing tokens.',
      format: Number,
      default: 86400000, // 24 hours
      env: 'JWT_MAX_ISSUER',
      arg: 'jwtMaxIssuer'
    }
  }
});

// Load environment dependent configuration
const env = conf.get('env');
conf.loadFile(path.normalize(`${__dirname}/${env}.json`));

// Perform validation
conf.validate({
  strict: true
});

// console.log(`ENV ${env}`);
export const config = conf.getProperties();
