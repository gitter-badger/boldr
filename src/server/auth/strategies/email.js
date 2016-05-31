import r from '../../db';
import { Strategy as CustomStrategy } from 'passport-custom';
import bcrypt from 'bcryptjs';
import Models from '../../db/models';
const User = Models.User;
export default new CustomStrategy(async (ctx, done) => {
  try {
    // Test whether is a login using email and password
    if (ctx.body.email && ctx.body.password) {
      const user = await User.findOne({ where: { email: ctx.body.email } });

      if (!user) {
        return done(null, false, { message: `Email ${ctx.body.email} not found` });
      }
      const pw = user.comparePassword(ctx.body.password, user.password);
      if (pw === false) {
        done(null, false);
      }

      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
