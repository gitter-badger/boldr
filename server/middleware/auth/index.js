import passport from 'passport';
import local from './strategies/local';
import google from './strategies/google';
import services from './services';
import facebook from './strategies/facebook';
export default () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(services.deserializeUser);
  local(passport);
  facebook(passport);
  google(passport);
};
