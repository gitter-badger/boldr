import jsonwebtoken from 'jsonwebtoken';
import r from '../db';
import Models from '../db/models';
const User = Models.User;
const COOKIE_NAME = 'koa.sid';

function getExpirationDate() {
  return new Date(Number(new Date()) + process.env.TOKEN_EXPIRATION);
}

export async function refreshJwtCookie(ctx, next) {
  if (ctx.isAuthenticated()) {
    const jwt = await jsonwebtoken.sign({ id: ctx.req.user.id }, { expiresIn: process.env.TOKEN_EXPIRATION });
    ctx.cookies.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      expires: getExpirationDate()
    });
  }
  await next();
}

function lastWeek() {
  return new Date(Number(new Date()) - process.env.TOKEN_EXPIRATION);
}

export async function expireJwtCookie(ctx, next) {
  ctx.cookies.set(COOKIE_NAME, false, {
    httpOnly: true,
    expires: lastWeek()
  });
  ctx.status = 200;

  await next();
}

export async function authenticateJwtCookie(ctx, next) {
  const jwt = ctx.cookies.get(COOKIE_NAME);
  try {
    const decoded = await jsonwebtoken.verify(jwt);
    ctx.req.user = decoded;
  } catch (err) {
    throw err;
  }

  await next();
}

export async function requireAuthentication(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 401;
  }
}

export async function fetchAuthenticatedUserData(ctx, next) {
  if (ctx.isAuthenticated()) {
    const user = await User.findById(ctx.req.user.id);
    ctx.req.user = user;
  }

  await next();
}
