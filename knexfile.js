var config = require('./config/index'); // eslint-disable-line

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      // host: '10.211.55.7',
      // user: 'postgres',
      // password: 'postgres',
      // database: 'boldr_test'
      host: '127.0.0.1',
      user: 'ubuntu',
      database: 'circleci_test'
    },
    pool: {
      min: 0,
      max: 7
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
