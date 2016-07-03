module.exports = {
  development: {
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME || 'boldr_dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME || 'boldr_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME || 'boldr',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};