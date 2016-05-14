import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:roles:controller');
debug('init');

export async function getAllRoles(ctx) {
  const roles = await r.table('roles').run();
  return ctx.ok(roles);
}
