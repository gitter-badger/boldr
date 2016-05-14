import r from 'server/db';
import _debug from 'debug';
const debug = _debug('boldr:pages:controller');
debug('init');

export async function getAllPages(ctx) {
  const pages = await r.table('pages').run();
  return ctx.ok(pages);
}
/**
 * @description
 * creates a new role in the db.
 * @route /api/v1/roles
 * @method POST
 */
export const createPage = async (ctx, next) => {
  const page = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    await r.table('pages').insert(page).run();
    return ctx.created(page);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};
/**
 * Performs a lookup of a role by its id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the role object.
 */
export async function getId(ctx, next) {
  try {
    const page = await r.table('pages')
      .get(ctx.params.id)
      .run();
    return ctx.ok(page);
  } catch (err) {
    return ctx.badRequest('Page not available.');
  }
}

export async function update(ctx) {
  const result = await r.table('pages')
    .get(ctx.params.id)
    .update(ctx.request.body)
    .run();
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const result = await r.table('pages')
    .get(ctx.params.id)
    .delete()
    .run();

  return ctx.ok();
}
