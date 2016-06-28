/**
 * server/auth/index.js
 * Sets up Passport authentication
 *
 * @exports {Function} isAuthenticated - Authentication check
 * @exports {Object} - Koa router objects
 */

import passport from 'koa-passport';
// import r from '../db';
import Models from '../db/models';

// Strategies
import jwtStrategy from './strategies/jwt';
import emailStrategy from './strategies/email';
import googleStrategy from './strategies/google';

const User = Models.User;

passport.use('jwt', jwtStrategy);
passport.use('email', emailStrategy);
passport.use('google', googleStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

export function isAuthenticated() {
  return passport.authenticate('jwt');
}

export function authEmail() {
  return passport.authenticate('email');
}
