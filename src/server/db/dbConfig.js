export default {
  host: process.env.RDB_HOST || '10.211.55.7',
  port: process.env.RDB_PORT || 28015,
  db: process.env.RDB_NAME || 'boldr_dev'
};
