import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import logger from 'server/lib/logger';
// import { google } from '../secrets';
import { googleSetup } from '../googleSetup';

export default (passport) => {
  if (!passport || !passport.google || ! typeof passport.google === 'function') {
    return;
  }
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  }, googleSetup.google));
};
