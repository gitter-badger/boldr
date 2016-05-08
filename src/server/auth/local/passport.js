import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

function localAuthenticate(User, email, password, done) {
  function handleUserFound(user) {
    user.authenticate(password, (err, authenticated) => {
      if (err) {
        return done(err);
      }
      if (!authenticated) {
        return done(null, false, {
          message: 'This password is not correct'
        });
      } else {
        return done(null, user);
      }
    });
  }

  function handleUserNotFound(err) {
    done(null, false, {
      message: 'This username is not registered'
    });
  }

  User
    .filter({
      email
    })
    .then((doc) => {
      if (!doc || doc.length < 1) {
        return done(null, false, {
          message: `Unknown user ${email}`
        });
      }
      doc[0].authenticate(password, (err, isMatch) => {
        if (err) {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }

        if (isMatch) {
          return done(null, doc[0]);
        } else {
          return done(null, false, {
            message: 'could not match.'
          });
        }
      });
    }).error((err) => {
      done(err);
    });
}

export default function setup(User) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    (async () => {
      try {
        const user = await User.get(id).run();
        done(null, user);
      } catch (error) {
        done(error);
      }
    })();
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    return localAuthenticate(User, email, password, done);
  }));
}

export function isAuthenticated() {
  return passport.authenticate('local');
}
