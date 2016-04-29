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

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User({ id }).fetch();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use('local', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.where('email', email).fetch({
      columns: ['password', 'id']
    });

    if (!user) {
      return done(null, false);
    }

    try {
      const isMatch = await compareSync(password, user.attributes.password);

      if (!isMatch) {
        return done(null, false);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  } catch (err) {
    return done(err);
  }
}));

