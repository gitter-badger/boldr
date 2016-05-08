import rethinkdbDash from 'rethinkdbdash';
import dbConfig from './dbConfig';

export const r = rethinkdbDash(dbConfig);
export async function createDbConnection(ctx, next) {
  r.connect(dbConfig, (err, conn) => {
    if (err) {
      next(err);
    } else {
      ctx.dbConn = conn;
      next();
    }
  });
}

export function closeDbConnection(ctx, next) {
  ctx.dbConn.close();
  next();
}
