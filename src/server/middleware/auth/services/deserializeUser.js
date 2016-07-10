import { User } from '../../../db/models';

export default (id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch(done);
};
