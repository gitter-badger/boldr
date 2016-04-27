import knex from 'knex';
import bookshelf from 'bookshelf';
import config, { paths } from '../../../tools/config';
// import Redis from 'ioredis';
import Debug from 'debug';
//
// const redisClient = new Redis('redis://10.211.55.7:6379/4');
// redisClient.on('error', err => {
//   Debug(`Error ${err}`);
// });
//
// redisClient.on('connect', () => {
//   Debug('Redis is online');
// });

const Knex = knex({
  client: 'pg',
  debug: true,
  connection: {
    host: '10.211.55.7',
    user: 'boldr',
    password: 'boldr',
    database: 'boldr'
  },
  searchPath: 'knex,public'
});

const Bookshelf = bookshelf(Knex);
Bookshelf.plugin('registry');

const database = () => {
  if (config.dbType === 'postgres') {
    return Bookshelf;
  }
  /*
  else {
    // Connect with MongoDB and setup schemas
  }
  */

  return null;
};

const User = () => require('./models/user');

// export function instance() {
//   // Return instance of redis client
//   return redisClient;
// }

export {
  // redisClient,
  Knex,
  Bookshelf,
  database,
  User
};
