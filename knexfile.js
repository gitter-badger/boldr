module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || '10.211.55.7',
      user: process.env.DB_USER || 'boldr',
      password: process.env.DB_PASSWORD || 'boldr',
      database: process.env.DB_NAME || 'boldr'
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
