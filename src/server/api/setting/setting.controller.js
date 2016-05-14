import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:settings:controller');
debug('init');

export async function getAllSettings(ctx) {
  const settings = await r.table('settings').run();
  return ctx.ok(settings);
}
/**
 * @description
 * creates a new role in the db.
 * @route /api/v1/roles
 * @method POST
 */
export const createSetting = async (ctx, next) => {
  const setting = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    await r.table('settings').insert(setting).run();
    return ctx.created(setting);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};
/**
 * Performs a lookup of a setting by its id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the setting object.
 */
export async function getId(ctx, next) {
  try {
    const setting = await r.table('settings')
      .get(ctx.params.id)
      .run();
    return ctx.ok(setting);
  } catch (err) {
    return ctx.badRequest('Role not available.');
  }
}

export async function update(ctx) {
  const result = await r.table('settings')
    .get(ctx.params.id)
    .update(ctx.request.body)
    .run();
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const result = await r.table('settings')
    .get(ctx.params.id)
    .delete()
    .run();

  return ctx.ok();
}
