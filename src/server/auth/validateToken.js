import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import config, { paths } from '../../../tools/config';
import User from '../db/models/user';
import getToken from './getToken';

Promise.promisifyAll(jwt);

const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export async function signJwt(payload, options) {
  return await jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function checkAuth(force = false) {
  return async function (ctx, next) {
    ctx.state.isAuthorised = false;

    const token = ctx.request.get('Authorization').split(' ')[1];

    if (typeof token === 'undefined' && force) {
      ctx.throw(401, { _errors: ['No credentials were provided.'] });
      return;
    }
    try {
      ctx.user = await jwt.verifyAsync(token, process.env.JWT_SECRET);
      ctx.state.isAuthorised = true;
      ctx.state.user = ctx.user;
    } catch (err) {
      if (force) {
        return ctx.throw(403, { _errors: ['Invalid credentials provided.'] });
      }
    }
    await next();
  };
}
