import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

function localAuthenticate(Account, email, password, done) {
  function handleUserFound(account) {
    account.authenticate(password, (err, authenticated) => {
      if (err) {
        return done(err);
      }
      if (!authenticated) {
        return done(null, false, {
          message: 'This password is not correct'
        });
      } else {
        return done(null, account);
      }
    });
  }

  function handleUserNotFound(err) {
    done(null, false, {
      message: 'This account is not registered'
    });
  }

  Account
    .filter({
      email
    })
    .then((doc) => {
      if (!doc || doc.length < 1) {
        return done(null, false, {
          message: `Unknown account ${email}`
        });
      }
      doc[0].authenticate(password, (err, isMatch) => {
        if (err) {
          return done(null, false, {
            message: 'Incorrect account information.'
          });
        }

        if (isMatch) {
          return done(null, doc[0]);
        } else {
          return done(null, false, {
            message: 'could not match the account.'
          });
        }
      });
    }).error((err) => {
      done(err);
    });
}

export default function setup(Account) {
  passport.serializeUser((account, done) => {
    done(null, account.id);
  });
  passport.deserializeUser((id, done) => {
    (async () => {
      try {
        const account = await Account.get(id).run();
        done(null, account);
      } catch (error) {
        done(error);
      }
    })();
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    return localAuthenticate(Account, email, password, done);
  }));
}

export function isAuthenticated() {
  return passport.authenticate('local');
}
