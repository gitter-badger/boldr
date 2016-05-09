export const getRethinkConfig = () => {
  const config = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 28015,
    authKey: process.env.DATABASE_AUTH_KEY || '',
    db: process.env.NODE_ENV === 'testing' ? 'ava' : 'meatier',
    min: process.env.NODE_ENV === 'production' ? 50 : 3,
    buffer: process.env.NODE_ENV === 'production' ? 50 : 3
  };
}
