import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import r from '../../db';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: process.env.JWT_SECRET
};

export default new JWTStrategy(opts, async (jwt_payload, done) => {
  const user = await r.table('users').get(jwt_payload.userId).run();
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});
