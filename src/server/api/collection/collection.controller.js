import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:collection:controller');
debug('init');

export async function getAllCollections(ctx) {
  const collections = await r.table('collections').run();
  return ctx.ok(collections);
}
/**
 * @description
 * creates a new role in the db.
 * @route /api/v1/roles
 * @method POST
 */
export const createCollection = async (ctx, next) => {
  const collection = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    await r.table('collections').insert(collection).run();
    return ctx.created(collection);
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
    const collection = await r.table('collections')
      .get(ctx.params.id)
      .run();
    return ctx.ok(collection);
  } catch (err) {
    return ctx.badRequest('Collection not available.');
  }
}

export async function update(ctx) {
  const result = await r.table('collections')
    .get(ctx.params.id)
    .update(ctx.request.body)
    .run();
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const result = await r.table('collections')
    .get(ctx.params.id)
    .delete()
    .run();

  return ctx.ok();
}
