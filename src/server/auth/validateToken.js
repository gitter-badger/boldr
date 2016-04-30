import { verify } from 'jsonwebtoken';
import config, { paths } from '../../../tools/config';
import User from '../db/models/user';
import getToken from './getToken';


export async function validateToken(ctx, next) {
  const token = getToken(ctx);

  if (!token) {
    ctx.throw(401);
  }

  let decoded = null;
  try {
    decoded = verify(token, config.JWT_SECRET_KEY);
  } catch (err) {
    ctx.throw(401);
  }
  ctx.decoded = decoded;
  const user = await User.where('id', decoded.id);
  if (!user) {
    ctx.throw(401);
  }
  return next();
}
