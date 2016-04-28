import jwt from 'jsonwebtoken';
import config, { paths } from '../../../../tools/config';

export default async function decodeToken(ctx, next) {
  let token = undefined;
  console.log(ctx.path, ctx.header.authorization);
  if (ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      console.log(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n');
      ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n');
    }
  } else {
    console.log(401, 'No Authorization header found\n');
  }

  console.log('token:' + token, 'secret:' + config.JWT_SECRET_KEY);
  if (token) {
    const decoded = await jwt.verify(token, config.JWT_SECRET_KEY);
    console.log(decoded);
  } else {
    return next();
  }

  return next();
}
