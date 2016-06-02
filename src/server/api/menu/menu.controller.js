import slug from 'slugg';
import Models from '../../db/models';
const Menu = Models.Menu;

export async function getAllMenus(ctx) {
  const menus = await Menu.findAll({});
  return ctx.ok(menus);
}
/**
 * @description
 * creates a new menu in the db.
 * @route /api/v1/menus
 * @method POST
 */
export const createMenu = async (ctx, next) => {
  const menu = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    const newMenu = await Menu.create(menu);
    return ctx.created(newMenu);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};
/**
 * Performs a lookup of a menu by its id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the menu object.
 */
export async function getId(ctx, next) {
  try {
    const menu = await Menu.findById(ctx.params.id);
    return ctx.ok(menu);
  } catch (err) {
    return ctx.badRequest('Menu not available.');
  }
}

export async function update(ctx) {
  const result = await Menu.update(ctx.request.body, { where: { id: ctx.params.id } });
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const found = await Menu.findById(ctx.params.id);
  found.destroy();
  ctx.status = 204;
}
