import { Strategy as LocalStrategy } from 'passport-local';
import services from '../services';

export default (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, services.local));
};
