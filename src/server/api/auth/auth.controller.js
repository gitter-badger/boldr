import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import r from 'server/db';
import _debug from 'debug';
import config, { paths } from 'config';
import Joi from 'joi';
import shortid from 'shortid';
import logger from 'server/utils/logger';
import userSchema from '../user/user.schema';
import { sendVerifyEmail, generateVerifyCode } from '../../utils/mailer';
import Models from '../../db/models';
const User = Models.User;
const saltRounds = 10;
shortid.worker(process.pid % 16);
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
  const user = User.build({
    // userId: shortid.generate(),
    email: ctx.request.body.email,
    username: ctx.request.body.username,
    password: hash,
    location: ctx.request.body.location,
    bio: ctx.request.body.bio,
    avatar: ctx.request.body.avatar,
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    website: ctx.request.body.website
  });

  const existingUser = await User.findOne({
    where: {
      email: ctx.request.body.email
    }
  });
  if (existingUser) {
    ctx.status = 409;
    ctx.body = 'Account with this email address already exists!';
  }
  try {
    user.save()
      .then((user) => {
        const verificationToken = generateVerifyCode();
        sendVerifyEmail(user.email, verificationToken);
        return ctx.created(user);
      });
  } catch (err) {
    ctx.status = 500;
    ctx.body = 'Unable to register user.';
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
    const user = await User.findOne({
      where: {
        email: ctx.request.body.email
      }
    });
    if (!user) {
      ctx.status = 403;
      ctx.body = 'Unable to log in.';
    }
    const pw = bcrypt.compareSync(ctx.request.body.password, user.password);
    if (pw === false) {
      ctx.status = 403;
      ctx.body = 'Unable to log in.';
    }
    const payload = {
      email: user.email,
      id: user.id
    };
    // make this data available across the app on ctx.session
    ctx.session = payload;
    logger.info(ctx.session);
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return ctx.ok({
      token
    });
  } catch (err) {
    ctx.status = 403;
    ctx.body = 'Unable to log in.';
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
    const user = await User.findById(ctx.state.user.userId)
      .then((result) => {
        return ctx.ok(result);
      });
  } catch (err) {
    ctx.status = 403;
    ctx.body = 'Unable to log in.';
  }
}
