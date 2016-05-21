import jwt from 'jsonwebtoken';
import r from '../db';

// After autentication using one of the strategies, generate a JWT token
export default function generateToken() {
  return async ctx => {
    const { user } = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({ userId: user.userId
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
      });
      const token = _token;

      const currentUser = await r.table('users').get(user.userId).without('password').run();

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser
      };
    }
  };
}
