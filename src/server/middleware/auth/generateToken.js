import jwt from 'jsonwebtoken';
import config, { paths } from '../../../../tools/config';
import User from '../../db/models/user';

// After autentication using one of the strategies, generate a JWT token
export default function generateToken(user) {
  return async ctx => {
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({ id: user }, config.JWT_SECRET_KEY);
      const token = `JWT ${_token}`;
      console.log(_token)
      const currentUser = await User.where('id', user);

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser
      };
    }
  };
}
