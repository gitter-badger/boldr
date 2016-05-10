import _debug from 'debug';

import Account from '../../db/models/account';
import jwt from 'jsonwebtoken';
import config, { paths } from '../../../../tools/config';
import getToken from '../../auth/getToken';
const debug = _debug('boldr:account:controller');
debug('init');

/**
 * Returns a listing of all the user accounts in the database.
 * @method getUsers
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export async function getAccounts(ctx) {
  const accounts = await Account.getJoin({
    profile: true
  }).getClean().execute();
  return ctx.ok(accounts);
}

/**
 * Performs a lookup of a user by their id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the User object.
 */
export async function getAccountById(ctx, next) {
  try {
    const account = await Account.get(ctx.params.id).getClean().execute();
    if (!account) {
      return ctx.badRequest('Account is Not Found');
    }

    return ctx.ok(account);
  } catch (err) {
    return ctx.badRequest('Account is Not Found');
  }
}

export async function updateAccount(ctx) {
  if (ctx.request.body._id) {
    delete ctx.request.body._id;
  }
  const account = await Account.get(ctx.params.id);
  Object.assign(account, ctx.request.body);
  await account.save();

  ctx.body = {
    account
  };
}

export async function deleteAccount(ctx) {
  const account = Account.get(ctx.params.id);

  await account.remove();

  ctx.status = 200;
  return ctx.ok();
}
