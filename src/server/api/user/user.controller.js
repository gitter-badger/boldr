import _debug from 'debug';

import User from '../../db/models/user.js';
import config, { paths } from '../../../../tools/config';

const debug = _debug('boldr:user:controller');
debug('init');
/**
 * Returns a listing of all the user accounts in the database.
 * @method getUsers
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export async function getUsers(ctx) {
  const users = await User.getClean().execute();
  ctx.body = users;
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
    if (err === 404 || err.name === 'CastError') {
      return ctx.badRequest('User is Not Found');
    }
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
  ctx.body = {
    success: true
  };
}

export async function getMe(ctx) {

}
