import { User } from '../../../db/models';
import { logger } from '../../../lib';

export default async(email, password, done) =>
  User.verifyUser(email, password).then((user) => {
    if (!user) {
      return done(null, false, { message: `There is no record of the email ${email}.` });
    }

    return done(null, user);
  }).catch((err) => {
    logger.error(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
