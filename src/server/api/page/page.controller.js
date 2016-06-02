import Models from '../../db/models';
const Page = Models.Page;

export async function getAllPages(ctx) {
  const pages = await Page.findAll({});
  return ctx.ok(pages);
}
/**
 * @description
 * creates a new page in the db.
 * @route /api/v1/pages
 * @method POST
 */
export const createPage = async (ctx, next) => {
  const page = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    await Page.create(page);
    return ctx.created(page);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};
/**
 * Performs a lookup of a page by its id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the page object.
 */
export async function getId(ctx, next) {
  try {
    const page = await Page.findById(ctx.params.id);
    return ctx.ok(page);
  } catch (err) {
    return ctx.badRequest('Page not available.');
  }
}

export async function update(ctx) {
  const result = await Page.update(ctx.request.body, { where: { id: ctx.params.id } });
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const found = await Page.findById(ctx.params.id);
  found.destroy();
  ctx.status = 204;
}
