import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import r from 'server/db';
import _debug from 'debug';
import config, { paths } from 'config';
import Joi from 'joi';
import Boom from 'boom';
import logger from 'server/utils/logger';
import userSchema from '../user/user.schema';
const saltRounds = 10;

const debug = _debug('boldr:auth:controller');
debug('init');

/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 * @see docs/api/auth/registerUser.md
 */
export const registerUser = async ctx => {
  const hash = bcrypt.hashSync(ctx.request.body.password, saltRounds);
  const user = {
    email: ctx.request.body.email,
    username: ctx.request.body.username,
    password: hash,
    location: ctx.request.body.location,
    bio: ctx.request.body.bio,
    avatar: ctx.request.body.avatar,
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    website: ctx.request.body.website,
    createdAt: new Date().toISOString()
  };
  // check for ctx.request.body.email in the database.
  const emailCheck = await r
    .table('users')
    .getAll(ctx.request.body.email, {
      index: 'email'
    })
    .run();
  if (emailCheck.length !== 0) {
    // if an email matching ctx.request.body.email is found
    // throw an error and end the function.
    throw Boom.badRequest('The email address is in use.');
  }
  try {
    await Joi.validate(user, userSchema, (err, value) => {
      if (err) {
        logger.info(err);
      }
      r.table('users')
        .insert(value)
        .run();
      return ctx.created(value);
    });
  } catch (err) {
    throw Boom.badRequest('Unable to register user.');
  }
};

/**
 * @description
 * logs a user into his or her account.
 * @route /api/v1/auth/login
 * @method POST
 */
export async function loginUser(ctx, next) {
  try {
    const user = await r.table('users')
      .filter({
        email: ctx.request.body.email
      })
      .run();
    if (!user) {
      throw Boom.notFound('email/password not found');
    }
    const pw = bcrypt.compareSync(ctx.request.body.password, user[0].password);
    if (pw === false) {
      throw Boom.unauthorized();
    }
    const payload = {
      email: user[0].email,
      username: user[0].username,
      userId: user[0].userId
    };
    // make this data available across the app on ctx.session
    ctx.session = payload;
    logger.info(ctx.session);
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return ctx.ok({
      token
    });
  } catch (err) {
    throw Boom.badRequest('Unable to log in.', err);
  }
}
/**
 * @description
 * checks if the user is logged in and returns their information
 * @route /api/v1/auth/check
 * @method GET
 */
export async function checkUser(ctx, next) {
  try {
    const user = await r.table('users')
      .get(ctx.state.user.userId)
      .without('password')
      .run()
      .then((result) => {
        return ctx.ok(result);
      });
  } catch (err) {
    throw Boom.unauthorized(err);
  }
}
