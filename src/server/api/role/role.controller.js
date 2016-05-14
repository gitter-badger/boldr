import r from 'server/db';
import _debug from 'debug';
import Joi from 'joi';
import roleSchema from './role.schema';
const debug = _debug('boldr:roles:controller');
debug('init');

export async function getAllRoles(ctx) {
  const roles = await r.table('roles').run();
  return ctx.ok(roles);
}
/**
 * @description
 * creates a new role in the db.
 * @route /api/v1/roles
 * @method POST
 */
export const createRole = async (ctx, next) => {
  const role = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    // validate the role (ctx.request.body) against the roleSchema defined
    const parsed = Joi.validate(role, roleSchema);
    if (parsed.error !== null) {
      throw new Error(parsed.error.details[0].message);
    }
    await r.table('roles').insert(parsed.value).run();
    return ctx.created(parsed.value);
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
    const role = await r.table('roles')
      .get(ctx.params.id)
      .run();
    return ctx.ok(role);
  } catch (err) {
    return ctx.badRequest('Role not available.');
  }
}

export async function update(ctx) {
  const result = await r.table('roles')
    .get(ctx.params.id)
    .update(ctx.request.body)
    .run();
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const result = await r.table('roles')
    .get(ctx.params.id)
    .delete()
    .run();

  return ctx.ok();
}
