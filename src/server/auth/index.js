/**
 * server/auth/index.js
 * Sets up Passport authentication
 *
 * @exports {Function} isAuthenticated - Authentication check
 * @exports {Object} - Koa router objects
 */

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

export function isAuthenticated() {
  return passport.authenticate('jwt');
}

export function authEmail() {
  return passport.authenticate('email');
}
