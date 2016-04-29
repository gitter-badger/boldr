import bcrypt, { genSaltSync } from 'bcryptjs';
import { Bookshelf } from '../connector';
import Post from './post';

const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  posts: () => this.hasMany(Post),
  initialize: function init() {
    this.on('updating', () => {
      this.attributes.updated_at = new Date();
    });

    this.on('creating', () => {
      this.attributes.created_at = new Date();
      this.set('email', this.get('email').toLowerCase().trim());
    });
  },
  hashPassword(model, attrs, options) {
    const password = options.patch ? attrs.password : model.get('password');
    if (!password) { return; }
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (options.patch) {
            attrs.password = hash;
          }
          model.set('password', hash);
          resolve();
        });
      });
    });
  },

  toJSON: function toJSON(options) {
    options = options || {};

    const attrs = Bookshelf.Model.prototype.toJSON.call(this, options);
    // remove password hash for security reasons
    delete attrs.password;

    if (!options || !options.context || (!options.context.user && !options.context.internal)) {
      delete attrs.email;
    }

    return attrs;
  }
});

export default User;
