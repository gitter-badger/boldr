import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config, { paths } from 'config';
import logger from 'server/lib/logger';
import { sendVerifyEmail, generateVerifyCode } from '../../utils/mailer';
import Models from '../../db/models';
import redisClient from '../../db/redis';
const User = Models.User;
const saltRounds = 10;

/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 * @see docs/api/auth/registerUser.md
 */
export const registerUser = async ctx => {
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
    const hash = bcrypt.hashSync(ctx.request.body.password, saltRounds);
    const user = User.build({
      email: ctx.request.body.email,
      password: hash,
      location: ctx.request.body.location,
      bio: ctx.request.body.bio,
      avatar: ctx.request.body.avatar,
      firstname: ctx.request.body.firstname,
      lastname: ctx.request.body.lastname,
      website: ctx.request.body.website
    });

    const newUser = await user.save()
      .then((user) => {
        const verificationToken = generateVerifyCode();
        sendVerifyEmail(user.email, verificationToken);
      });
    ctx.status = 201;
    ctx.body = user;
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
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    await redisClient.set(token, true);
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
    const user = await User.findById(ctx.state.user.id)
      .then((result) => {
        return ctx.ok(result);
      });
  } catch (err) {
    ctx.status = 403;
    ctx.body = 'Unable to log in.';
  }
}
