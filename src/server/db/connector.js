import knex from 'knex';
import bookshelf from 'bookshelf';
import config from 'config';

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

const User = () => require('server/db/models/User');

export {
  Knex,
  Bookshelf,
  database,
  User
};
