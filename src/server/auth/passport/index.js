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
      const user = await User.query().where({
        id
      });
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
async function authenticate(ctx, next) {
  try {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    User.filter({
      email
    })
      .limit(1)
      .run()
      .then((userArray) => {
        const user = userArray[0];
        if (!user) {
          return ctx.error();
        }

        User.comparePassword(password, user, (err, valid) => {
          if (err) {
            return ctx.badRequest();
          }

          if (!valid) {
            return ctx.badRequest();
          } else {
            return ctx.ok({
              user
            }).end();
          }
        });
      });
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
