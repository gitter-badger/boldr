import r from 'server/db';
import _debug from 'debug';
import Joi from 'joi';
import roleSchema from './role.schema';
const debug = _debug('boldr:roles:controller');
debug('init');

export async function getAllRoles(ctx, index) {
  const roles = await r.table('roles')
  .run();
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
    description: ctx.request.body.description,
    permissions: {
      editContent: ctx.request.body.permissions.editContent,
      createContent: ctx.request.body.permissions.createContent,
      deleteContent: ctx.request.body.permissions.deleteContent,
      manageMedia: ctx.request.body.permissions.manageMedia,
      manageUsers: ctx.request.body.permissions.manageUsers,
      manageRoles: ctx.request.body.permissions.manageRoles,
      manageSettings: ctx.request.body.permissions.manageSettings,
      allPrivilages: ctx.request.body.permissions.allPrivilages
    }
  };
  try {
    await r.table('roles').insert(role).run();
    return ctx.created(role);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};

export const addUserToRole = async (ctx, next) => {
  try {
    await r.table('roles')
    .get(ctx.request.body.roleId)
    .update({ users: r.row('users').append(ctx.request.body.roleId) })
    .run();
    return ctx.ok();
  } catch (error) {
    return ctx.error('Error building relationship between user and role.');
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
      .eqJoin('userId', r.table('users'))// returns left and right joins
      .zip()// zip combines the two tables into one on request.
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
