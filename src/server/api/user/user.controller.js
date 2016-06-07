import jwt from 'jsonwebtoken';
import Models from '../../db/models';
import logger from '../../lib/logger';
import config, { paths } from 'config';

const User = Models.User;

/**
 * Returns a listing of all the user users in the database.
 * @method getUsers
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export async function getAll(ctx) {
  try {
    const users = await User.findAll({});
    return ctx.ok(users);
  } catch (err) {
    return ctx.badRequest('Users dont exist?');
  }
}

/**
 * Performs a lookup of a user by their id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the User object.
 */
export async function getId(ctx, next) {
  try {
    const user = await User.findById(ctx.params.id);
    return ctx.ok(user);
  } catch (err) {
    return ctx.badRequest('User is Not Found');
  }
}

export async function update(ctx) {
  const query = { id: ctx.params.id };
  const result = await User.update(ctx.request.body, { where: query });
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const result = await User.findById(ctx.params.id);
  result.destroy();

  return ctx.ok();
}
