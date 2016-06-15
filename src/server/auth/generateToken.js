import jwt from 'jsonwebtoken';
import Models from '../db/models';
import moment from 'moment';
const User = Models.User;

// After autentication using one of the strategies, generate a JWT token
export default function generateToken() {
  return async ctx => {
    const { user } = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const payload = {
        iss: 'boldr.io', // issuer
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix(),
        id: user.id
      };
      const _token = jwt.sign(payload, process.env.JWT_SECRET);
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
