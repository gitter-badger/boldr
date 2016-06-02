import jwt from 'jsonwebtoken';
import Models from '../db/models';
const User = Models.User;

// After autentication using one of the strategies, generate a JWT token
export default function generateToken() {
  return async ctx => {
    const { user } = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({ id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
      });
      const token = _token;

      const currentUser = await User.findById(user.id);

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser
      };
    }
  };
}
