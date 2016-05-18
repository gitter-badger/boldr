import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import r from 'server/db';
import _debug from 'debug';
import config, { paths } from 'config';
import Joi from 'joi';
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
    createdAt: Date.toString()
  };
  try {
    // check for ctx.request.body.email in the database.
    const emailCheck = await r
      .table('users')
      .getAll(ctx.request.body.email, { index: 'email' })
      .run();
    if (emailCheck.length) {
      // if an email matching ctx.request.body.email is found
      // throw an error and end the function.
      throw ctx.error('The email address is in use.');
    }

    await r.table('users')
      .insert(user)
      .run();
    return ctx.created(user);
  } catch (err) {
    return ctx.error(`There was a problem registering. ${err}`);
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
    .filter({ email: ctx.request.body.email })
    .run()
    .then((result) => {
      const pw = bcrypt.compareSync(ctx.request.body.password, result[0].password);
      if (pw === false) {
        throw ctx.error();
      }
      const payload = {
        email: result[0].email,
        username: result[0].username,
        userId: result[0].userId
      };
      // make this data available across the app on ctx.session
      ctx.session = payload;
      logger.info(ctx.session);
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return ctx.ok({ token });
    });
  } catch (err) {
    logger.error(err);
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
    logger.error(err);
  }
}
