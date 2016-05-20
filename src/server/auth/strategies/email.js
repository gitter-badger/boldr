import r from '../../db';
import { Strategy as CustomStrategy } from 'passport-custom';
import bcrypt from 'bcryptjs';
export default new CustomStrategy(async (ctx, done) => {
  try {
    // Test whether is a login using email and password
    if (ctx.body.email && ctx.body.password) {
      const user = await r.table('users').getAll(ctx.body.email, { index: 'email' }).run();

      if (!user[0]) {
        done(null, false, { message: `Email ${ctx.body.email} not found` });
      }
      const pw = bcrypt.compareSync(ctx.body.password, user[0].password);
      if (pw === false) {
        done(null, false);
      }

      done(null, user[0]);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
