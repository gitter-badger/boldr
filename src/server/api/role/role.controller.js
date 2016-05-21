import r from 'server/db';
import _debug from 'debug';
import Joi from 'joi';
import roleSchema from './role.schema';
const debug = _debug('boldr:roles:controller');
debug('init');

export async function getAllRoles(ctx, index) {
  let query = null;
  try {
    query = r.table('roles');
    const result = await query.run();
    return ctx.ok(result);
  } catch (error) {
    return ctx.error(error);
  }
}

/**
 * @description
 * creates a new role in the db.
 * @route /api/v1/roles
 * @method POST
 */
export const createRole = async (ctx, next) => {
  let query = null;
  const role = {
    role: ctx.request.body.role,
    description: ctx.request.body.description,
    permissions: {
      editContent: ctx.request.body.permissions.editContent || false,
      createContent: ctx.request.body.permissions.createContent || false,
      deleteContent: ctx.request.body.permissions.deleteContent || false,
      manageMedia: ctx.request.body.permissions.manageMedia || false,
      manageUsers: ctx.request.body.permissions.manageUsers || false,
      manageRoles: ctx.request.body.permissions.manageRoles || false,
      manageSettings: ctx.request.body.permissions.manageSettings || false,
      allPrivilages: ctx.request.body.permissions.allPrivilages || false
    }
  };

  try {
    query = r.table('roles').insert(role);
    const result = await query.run();
    let id = '';
    if (result && result.generated_keys && result.generated_keys.length > 0) {
      id = result.generated_keys[0];
    }
    return ctx.created(result, id);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};

export const addUserToRole = async (ctx, next) => {
  let query = null;

  try {
    query = r.table('roles').get(ctx.params.id).insert({
      membership: ctx.request.body.userId
    });

    const result = await query.run();
    return ctx.ok(result);
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
  let query = null;
  try {
    query = r.table('roles')
      .get(ctx.params.id)
      .eqJoin('userId', r.table('users')); // returns left and right joins

    const result = await query.zip().run();
    return ctx.ok(result);
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
