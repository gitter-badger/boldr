import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import logger from 'server/lib/logger';
import { sendVerifyEmail, generateVerifyCode } from '../../utils/mailer';
import Models from '../../db/models';
import redisClient from '../../db/redis';

const User = Models.User;
const UserGroup = Models.UserGroup;
const VerificationToken = Models.VerificationToken;
const saltRounds = 10;

/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 */
export const registerUser = async ctx => {
  try {
    User.findOne({
      where: {
        email: ctx.request.body.email
      }
    });
  } catch (error) {
    ctx.status = 409;
    ctx.body = 'Account with this email address already exists!';
  }
  try {
    // take the incoming password and hash it.
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
    // Save newUser once the request body forms the user model.
    const newUser = await user.save();
    // Add the user's id to the default User group
    await UserGroup.addUserIdInGroups(['User'], newUser.get().id);
    // Generate the verification token.
    const verificationToken = await generateVerifyCode();
    // Send the verification email.
    sendVerifyEmail(newUser.email, verificationToken);
    // Store the verification token, userId and expiration date in the db.
    const verificationStorage = await VerificationToken.create({
      userId: newUser.id,
      token: verificationToken,
      expiresAt: moment().add(3, 'days')
    });
    // Save token.
    verificationStorage.save();
    // Send response.
    ctx.status = 201;
    ctx.body = user;
    logger.info(`Registered account: ${user}`);
  } catch (err) {
    ctx.status = 500;
    ctx.body = `Unable to register user: ${err}`;
  }
};

/**
 * Endpoint used to login
 * @param  {object}  ctx async  Koa object.
 * @param  {Function}    next Function to pass error.
 * @return {void}
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
    const pw = await bcrypt.compareSync(ctx.request.body.password, user.password);
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
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    redisClient.set(token, true);
    return ctx.ok({
      token
    });
  } catch (err) {
    logger.debug(err);
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
    User.findById(ctx.state.user.id)
      .then((result) => {
        return ctx.ok(result);
      });
  } catch (err) {
    ctx.status = 403;
    ctx.body = 'Unable to log in.';
  }
}
