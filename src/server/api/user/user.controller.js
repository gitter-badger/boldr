import _debug from 'debug';

import User from '../../db/models/user';
import jwt from 'jsonwebtoken';
import config, { paths } from '../../../../tools/config';
import getToken from '../../auth/getToken';
const debug = _debug('boldr:user:controller');
debug('init');

/**
 * Returns a listing of all the user users in the database.
 * @method getUsers
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export async function getUsers(ctx) {
  const users = await User.getClean().execute();
  return ctx.ok(users);
}

/**
 * Performs a lookup of a user by their id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the User object.
 */
export async function getUserById(ctx, next) {
  try {
    const user = await User.get(ctx.params.id).getClean().execute();
    if (!user) {
      return ctx.badRequest('User is Not Found');
    }

    return ctx.ok(user);
  } catch (err) {
    return ctx.badRequest('User is Not Found');
  }
}

export async function updateUser(ctx) {
  if (ctx.request.body._id) {
    delete ctx.request.body._id;
  }
  const user = await User.get(ctx.params.id);
  Object.assign(user, ctx.request.body);
  await user.save();

  ctx.body = {
    user
  };
}

export async function deleteUser(ctx) {
  const user = User.get(ctx.params.id);

  await user.remove();

  ctx.status = 200;
  return ctx.ok();
}
