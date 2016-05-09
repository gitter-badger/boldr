import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _debug from 'debug';
import passport from 'koa-passport';
import Promise from 'bluebird';
import config, { paths } from 'config';
import Account from '../../db/models/account';

const debug = _debug('boldr:auth:controller');
debug('init');
const errorMessages = {
  authFailed: 'Authorization failed.',
  incompleteAttributes: 'Incomplete attributes.',
  emailTaken: 'Email already taken.'
};
/**
 * @description
 * registers a new account
 * @route /api/v1/auth/register
 * @method POST
 * @see docs/api/auth/registerUser.md
 */
export const registerAccount = async ctx => {
  if (!ctx.request.body || !ctx.request.body.username || !ctx.request.body.password || !ctx.request.body.email) {
    return ctx.throw(400, errorMessages.incompleteAttributes);
  }
  try {
    const account = await Account.save({
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      username: ctx.request.body.username
    }).then((user) => {
      return ctx.created(account);
    });
  } catch (error) {
    ctx.throw(400, error.message);
    debug(error);
  }
};

/**
 * @description
 * logs a user into his or her account.
 * @route /api/v1/auth/login
 * @method POST
 */
export async function loginUser(ctx, next) {
  return passport.authenticate('local', (account) => {
    if (!account) {
      ctx.unauthorized('Failed to validate login information.');
    }
    const token = jwt.sign({
      id: account
    }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    return ctx.ok({ token });
  })(ctx, next);
}
