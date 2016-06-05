import Models from '../../db/models';
import slugg from 'slugg';
const Page = Models.Page;

export async function getAllPages(ctx) {
  try {
    const pages = await Page.findAll();
    ctx.status = 200;
    ctx.body = { pages };
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}
/**
 * @description
 * creates a new page in the db.
 * @route /api/v1/pages
 * @method POST
 */
export const createPage = async (ctx, next) => {
  const pageBody = {
    name: ctx.request.body.name,
    slug: slugg(ctx.request.body.slug),
    description: ctx.request.body.description,
    content: ctx.request.body.content,
    showInMenu: ctx.request.body.showInMenu,
    status: ctx.request.body.status
  };
  try {
    const page = await Page.create(pageBody);
    ctx.status = 201;
    ctx.body = { page };
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
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
    ctx.status = 200;
    ctx.body = { page };
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

export async function update(ctx) {
  const result = await Page.update(ctx.request.body, { where: { id: ctx.params.id } });
  ctx.status = 202;
  ctx.body = { result };
}

export async function destroy(ctx) {
  const found = await Page.findById(ctx.params.id);
  found.destroy();
  ctx.status = 204;
}
