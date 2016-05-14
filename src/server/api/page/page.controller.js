import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:pages:controller');
debug('init');

export async function getAllPages(ctx) {
  const pages = await r.table('pages').run();
  return ctx.ok(pages);
}
