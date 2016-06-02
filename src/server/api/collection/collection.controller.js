import slug from 'slugg';
import Models from '../../db/models';
const Collection = Models.Collection;

export async function getAllCollections(ctx) {
  const collections = await Collection.findAll({});
  return ctx.ok(collections);
}
/**
 * @description
 * creates a new collection in the db.
 * @route /api/v1/collections
 * @method POST
 */
export const createCollection = async (ctx, next) => {
  const collection = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    const newCollection = await Collection.create(collection);
    return ctx.created(newCollection);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};
/**
 * Performs a lookup of a collection by its id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the collection object.
 */
export async function getId(ctx, next) {
  try {
    const collection = await Collection.findById(ctx.params.id);
    return ctx.ok(collection);
  } catch (err) {
    return ctx.badRequest('Collection not available.');
  }
}

export async function update(ctx) {
  const result = await Collection.update(ctx.request.body, { where: { id: ctx.params.id } });
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const found = await Collection.findById(ctx.params.id);
  found.destroy();
  ctx.status = 204;
}
