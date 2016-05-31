import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import Models from '../../db/models';
const User = Models.User;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: process.env.JWT_SECRET
};

export default new JWTStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findById(jwt_payload.id);
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});
