import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { config } from '../../../config/boldr';
import services from '../services';

export default (passport) => {
  passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: config.google.callback
  }, services.google));
};
