import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _debug from 'debug';
import passport from 'koa-passport';
import uuid from 'node-uuid';

import Promise from 'bluebird';
import config, { paths } from '../../../../config';
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
    const hash = await saltAndHashPassword(ctx.request.body.password);
    const user = await User.forge({
      username: ctx.request.body.username,
      display_name: ctx.request.body.displayName,
      first_name: ctx.request.body.firstName,
      last_name: ctx.request.body.lastName,
      location: ctx.request.body.location,
      website: ctx.request.body.website,
      slug: ctx.request.body.slug,
      status: ctx.request.body.status,
      uuid: uuid.v4(),
      avatar: ctx.request.body.avatar,
      bio: ctx.request.body.bio,
      facebook: ctx.request.body.facebook,
      twitter: ctx.request.body.twitter,
      password: hash,
      email: ctx.request.body.email,
      role: 'admin'
    }).save();

    ctx.body = user;
    ctx.status = 201;
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

    const response = user.toJSON();

    delete response.password;

    ctx.body = {
      token,
      user: response
    };
  })(ctx, next);
}

export const registerEmailCheck = async ctx => {
  const { code } = ctx.request.query;
  const result = await User.registerEmailCheck(code);
  if (typeof result === 'string') {
    return ctx.badRequest('there was a problem with the email');
  }
  return ctx.ok('the email is ok');
};

export async function fetchAuthenticatedUserData(ctx, next) {
  if (ctx.isAuthenticated()) {
    const user = await User.where('id', ctx.req.user.id);
    ctx.req.user = user;
  }

  await next();
}
