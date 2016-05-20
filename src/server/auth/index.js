import passport from 'koa-passport';
import compose from 'koa-compose';
import importDir from 'import-dir';
import jwt from 'jsonwebtoken';
import r from '../db';
// Strategies
import jwtStrategy from './strategies/jwt';
import emailStrategy from './strategies/email';
const EXPIRATION_AGE = 604800000; // 7 days

passport.use('jwt', jwtStrategy);
passport.use('email', emailStrategy);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});
passport.deserializeUser((userId, done) => {
  (async () => {
    try {
      const user = await r.table('users').get(userId).run();
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

export default function auth() {
  return compose([
    passport.initialize()
  ]);
}

export function isAuthenticated() {
  return passport.authenticate('jwt');
}

export function authEmail() {
  return passport.authenticate('email');
}

// After autentication using one of the strategies, generate a JWT token
export function generateToken() {
  return async ctx => {
    const { user } = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: EXPIRATION_AGE });
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
