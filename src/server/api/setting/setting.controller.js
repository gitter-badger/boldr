import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:settings:controller');
debug('init');

export async function getAllSettings(ctx) {
  const settings =
  await r.table('settings')
  .run();
  return ctx.ok(settings);
}
