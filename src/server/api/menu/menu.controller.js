import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:menus:controller');
debug('init');

export async function getAllMenus(ctx) {
  const menus = await r.table('menus').run();
  return ctx.ok(menus);
}
