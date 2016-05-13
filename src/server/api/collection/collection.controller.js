import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:collection:controller');
debug('init');

export async function getAllCollections(ctx) {
  const collections =
  await r.table('collections')
  .run();
  return ctx.ok(collections);
}
