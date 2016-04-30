import bcrypt, { genSaltSync } from 'bcryptjs';

const saltAndHashPassword = pwd => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pwd, salt, (_err, hash) => {
      if (_err) {
        return reject(_err);
      }
      return resolve(hash);
    });

    if (err) {
      return reject(err);
    }
  });
});

export default saltAndHashPassword;
