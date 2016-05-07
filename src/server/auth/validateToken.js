import { verify, verifyAsync, signAsync } from 'jsonwebtoken';
import config, { paths } from '../../../tools/config';
import User from '../db/models/user';
import getToken from './getToken';

const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}
export async function signJwt(payload, options) {
  return await signAsync(payload, process.env.JWT_SECRET, options);
}
export async function validateToken(ctx, next) {
  const token = getToken(ctx);

  if (!token) {
    ctx.throw(401);
  }

  let decoded = null;
  try {
    decoded = verify(token, process.env.JWT_SECRET);
  } catch (err) {
    ctx.throw(401);
  }
  ctx.decoded = decoded;
  const user = await User.query().where('id', decoded.id);
  if (!user) {
    ctx.throw(401);
  }
  return next();
}

export async function verifyJwt(token) {
  return await verifyAsync(token, process.env.JWT_SECRET);
}

export async function getUserByJwt(token) {
  const decoded = await verifyJwt(token);
  return await User.query().where({ id: decoded.id });
}

export async function fetchAuthenticatedUserData(ctx, next) {
  if (ctx.isAuthenticated()) {
    const user = await User.query().where('id', ctx.req.user.id);
    ctx.req.user = user;
  }

  await next();
}
