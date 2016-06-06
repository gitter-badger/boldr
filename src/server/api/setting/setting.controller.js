import slug from 'slugg';
import Models from '../../db/models';
const Settings = Models.Settings;

export async function getAllSettings(ctx) {
  try {
    const settings = await Settings.findAll({});
    return ctx.ok(settings);
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}
/**
 * @description
 * creates a new setting in the db.
 * @route /api/v1/settings
 * @method POST
 */
export const createSettings = async (ctx, next) => {
  const setting = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    const newSetting = await Settings.create(setting);
    return ctx.created(newSetting);
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
    const setting = await Settings.findById(ctx.params.id);
    return ctx.ok(setting);
  } catch (err) {
    return ctx.badRequest('Collection not available.');
  }
}

export async function update(ctx) {
  const result = await Settings.update(ctx.request.body, { where: { id: ctx.params.id } });
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const found = await Settings.findById(ctx.params.id);
  found.destroy();
  ctx.status = 204;
}
