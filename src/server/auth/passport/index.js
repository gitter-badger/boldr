import passport from 'koa-passport';
import User from '../../db/models/user';
import { Strategy } from 'passport-local';
import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import _debug from 'debug';

const debug = _debug('boldr:auth:passport');
debug('init');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.where('id', id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })();
});

/**
 * authenticates the information with whats in the database.
 * @param  {String} email    the email address of the user
 * @param  {String} password the user's password
 * @return {Promise}          promises to return the user object or fail
 */
async function authenticate(email, password) {
  try {
    const user = await User.where('email', email).fetch({
      columns: ['password', 'id']
    });
    const match = await await compareSync(password, user.attributes.password);
    return match ? user : false;
  } catch (err) {
    return false;
  }
}

passport.use('local', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  authenticate(email, password)
      .then(user => done(null, user))
      .catch(err => done(err));
}));

export function isAuthenticated() {
  return passport.authenticate('local');
}
