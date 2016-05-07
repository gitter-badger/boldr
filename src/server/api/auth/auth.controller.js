import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _debug from 'debug';
import passport from 'koa-passport';
import Promise from 'bluebird';
import config, { paths } from '../../../../tools/config';
import User from '../../db/models/user';
import { saltAndHashPassword } from '../../utils';

const debug = _debug('boldr:auth:controller');
debug('init');
const errorMessages = {
  authFailed: 'Authorization failed.',
  incompleteAttributes: 'Incomplete attributes.',
  emailTaken: 'Email already taken.'
};
/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 * @see docs/api/auth/registerUser.md
 */
export const registerUser = async ctx => {
  if (!ctx.request.body || !ctx.request.body.username || !ctx.request.body.password || !ctx.request.body.email) {
    return ctx.throw(400, errorMessages.incompleteAttributes);
  }
  try {
    const user = await User.save({
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      username: ctx.request.body.username,
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      bio: ctx.request.body.bio,
      avatar: ctx.request.body.avatar,
      website: ctx.request.body.website
    }).then((user) => {
      return ctx.created(user);
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
  return passport.authenticate('local', (user) => {
    if (!user) {
      ctx.throw(401);
    }

    const token = jwt.sign({
      id: user
    }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });


    return ctx.ok(token);
  })(ctx, next);
}

export const registerEmailCheck = async ctx => {
  const {code} = ctx.request.query;
  const result = await User.registerEmailCheck(code);
  if (typeof result === 'string') {
    return ctx.badRequest('there was a problem with the email');
  }
  return ctx.ok('the email is ok');
};

export async function fetchAuthenticatedUserData(ctx, next) {
  if (ctx.isAuthenticated()) {
    const user = await User.query().where({
      id: ctx.req.user.id
    });
    ctx.req.user = user;
  }

  await next();
}
