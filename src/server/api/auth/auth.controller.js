import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _debug from 'debug';
import passport from 'koa-passport';
import Promise from 'bluebird';
import config, { paths } from 'config';
import { signJwt } from '../../auth/signToken';
import User from '../../db/models/user';
import Profile from '../../db/models/profile';

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
    const user = await new User({
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      username: ctx.request.body.username,
      name: {
        first: ctx.request.body.first,
        last: ctx.request.body.last
      },
      location: ctx.request.body.location,
      website: ctx.request.body.website,
      avatar: ctx.request.body.avatar,
      bio: ctx.request.body.bio
    }).save().then((user) => {
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
 * Token response is
 * {
 * isFulfilled: true,
 * isRejected: false,
 * fulfillmentValue: TOKEN
 * }
 */
export async function loginUser(ctx, next) {
  return passport.authenticate('local', (user) => {
    if (!user) {
      ctx.unauthorized('Failed to validate login information.');
    }
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      right: user.right
    };
    ctx.user = payload;

    const token = jwt.signAsync(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    ctx.session.user = ctx.user;
    return ctx.ok(token);
  })(ctx, next);
}
