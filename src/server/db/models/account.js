import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import shortid from 'shortid';
import thinky from '../thinky';
const { type, r } = thinky;

const Account = thinky.createModel('accounts', {
  id: type.string().default(shortid.generate),
  username: type.string().required().alphanum().min(2).max(16),
  password: type.string().required(),
  salt: type.string(),
  email: type.string().required().email().max(64).lowercase(),
  group: type.string(),
  createdAt: type.date().default(r.now()),
  isActive: type.boolean().default(true)
});

Account.defineStatic('uniqueResult', function() {
  // passing null as defaultwill give Error from thinky.Errors.DocumentNotFound;
  // https://github.com/neumino/thinky/issues/182
  return this.nth(0).default(null);
});

Account.define('makeSalt', (callback) => {
  const byteSize = 16;

  if (!callback) {
    return crypto.randomBytes(byteSize).toString('base64');
  }
  crypto.randomBytes(byteSize, (err, salt) => {
    if (err) {
      return callback(err);
    }
    callback(null, salt.toString('base64'));
  });
});

// Available only within the model
Account.define('encryptPassword', function(password, callback) {
  const defaultIterations = 10000;
  const defaultKeyLength = 64;
  const salt = new Buffer(this.salt, 'base64');

  if (!callback) {
    return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256')
      .toString('base64');
  }
  crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
    if (err) {
      return callback(err);
    }
    callback(null, key.toString('base64'));
  });
});

// available for this Model and on its query.
Account.define('authenticate', function(password, callback) {
  if (!callback) {
    return this.password === this.encryptPassword(password);
  }
  this.encryptPassword(password, (err, encryptedPassword) => {
    if (err) {
      return callback(err);
    }
    if (this.password === encryptedPassword) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
});

Account.pre('save', function(next) {
  this.makeSalt((err, salt) => {
    if (err) {
      return next(err);
    }
    this.salt = salt;
    this.encryptPassword(this.password, (err, encryptedPassword) => {
      if (err) {
        return next(err);
      }
      this.password = encryptedPassword;
      next();
    });
  });
});

/**
 * A method available that never returns the password.
 * @method getClean
 * @return {Object}                The user model without the password
 * @example
 *    User.get(1).getClean().run()
 */
Account.defineStatic('getClean', function() {
  return this.without(['password', 'salt']);
});

export default Account;
