import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import config, { paths } from '../../../tools/config';
import Account from '../db/models/account';
import getToken from './getToken';

Promise.promisifyAll(jwt);

const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export async function signJwt(payload, options) {
  return await jwt.signAsync(payload, process.env.JWT_SECRET, options);
}

export function validateToken(force = false) {
  return async function (ctx, next) {
    ctx.state.isAuthorised = false;
    const token = getToken(ctx);

    if (typeof token === 'undefined' && force) {
      ctx.unauthorized();
      return;
    }
    try {
      ctx.account = await jwt.verifyAsync(token, process.env.JWT_SECRET);
      ctx.state.isAuthorised = true;
    } catch (err) {
      if (force) {
        return ctx.forbidden();
      }
    }
    await next();
  };
}
