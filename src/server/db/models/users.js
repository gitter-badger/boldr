import bcrypt from 'bcryptjs';
import logger from 'server/lib/logger';
import crypto from 'crypto';
const authTypes = ['github', 'twitter', 'facebook', 'google'];
const validatePresenceOf = (value) => {
  return value && value.length;
};

export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    salt: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING(256),
      defaultValue: '',
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(256),
      defaultValue: '',
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(256),
      defaultValue: '',
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(256),
      defaultValue: '',
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(256),
      defaultValue: '',
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING
    },
    google: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    tableName: 'users',
    classMethods: {
      associate(models) {
        User.hasMany(models.Article, {
          foreignKey: 'authorId'
        });
        User.hasOne(models.VerificationToken, {
          foreignKey: 'userId'
        });
        User.hasOne(models.ResetToken, {
          foreignKey: 'userId'
        });
        User.belongsToMany(models.Group, {
          through: models.UserGroup,
          foreignKey: 'userId'
        });
        User.hasMany(models.Upload, {
          foreignKey: 'userId'
        });
      },

      /**
       * Finds a user by its email
       * returns the model of the  user
       *
       * @param {String} email - the user's email address
       *
       * @returns {Promise} Promise user model
      */
      findByEmail(email) {
        return this.find({ where: { email } });
      },
      /**
       * Finds a user by userid
       * returns the model of the  user
       *
       * @param {String} userid - userid of the user to find
       *
       * @returns {Promise} Promise user model
      */
      findByUserId(userid) {
        return this.find({ where: { id: userid } });
      },
      /**
       * Creates a user given a json representation and adds it to the group GroupName,
       * returns the model of the created user
       *
       * @param {Object} userJson  -   User in json format
       * @param {Array} groups - the groups to add the user in
       *
       * @returns {Promise}  Promise user created model
       */
      createUserInGroups: async function(userJson, groups) { // eslint-disable-line
        logger.debug(`createUserInGroups user: %s, group: , ${userJson}, ${groups}`);
        return sequelize.transaction(async function(t) {
          logger.info('creating user');
          const userCreated = await models.User.create(userJson, { transaction: t });
          await models.UserGroup.addUserIdInGroups(groups, userCreated.get().id, t);
          return userCreated;
        })
        .catch(err => {
          logger.error('createUserInGroups: rolling back', err);
          throw err;
        });
      },
      /**
       * Checks whether a user is able to perform an action on a resource
       * Equivalent to: select name from permissions p join group_permissions g on
       * p.id=g.permission_id where g.group_id=(select group_id from users where
       * email='test@example.com') AND p.resource='user' and p.create=true;
       * @param {String} resource  -The resource name to search
       * @param {String} action  - The action , "create,read,update,delete"
       *
       * @returns {Boolean} True if the user can perform the action on the resource otherwise false
       */

      checkUserPermission: async function(userId,resource,action) { // eslint-disable-line
        logger.debug('Checking %s permission for %s on %s', action, userId, resource);
        const where = {
          resource
        };
        where[action.toUpperCase()] = true;
        const res = await this.find({
          include: [
            {
              model: models.Group,
              include: [
                {
                  model: models.Permission,
                  where
                }]
            }],
          where: {
            id: userId
          }
        });
        const authorized = res ? true: false; // eslint-disable-line
        return authorized;
      },
      /**
       * Returns all permissions associated with a user
       *
       * @param {String} email - The email to search permissions for
       *
       * @returns {Promise} a Promise containing array of permission results
       */
      getPermissions(userId) {
        return this.find({
          include: [
            {
              model: models.Group,
              include: [
                {
                  model: models.Permission
                }]
            }],
          where: {
            id: userId
          }
        });
      }
    },
    /**
     * Pre-save hooks
     */
    hooks: {
      beforeBulkCreate(users, fields, fn) {
        let totalUpdated = 0;
        users.forEach(user => {
          user.updatePassword(err => {
            if (err) {
              return fn(err);
            }
            totalUpdated += 1;
            if (totalUpdated === users.length) {
              return fn();
            }
          });
        });
      },
      beforeCreate(user, fields, fn) {
        user.updatePassword(fn);
      },
      beforeUpdate(user, fields, fn) {
        if (user.changed('password')) {
          return user.updatePassword(fn);
        }
        fn();
      }
    },
    instanceMethods: {
      comparePassword,
      toJSON,
      updatePassword,
      makeSalt,
      encryptPassword,
      authenticate
    }
  });

  /**
   * Creates an object from user which
   * not includes sensitive data.
   * @return {Object} Returns a user object without password
   */
  function toJSON() {
    return {
      id: this.id,
      email: this.email,
      profile: {
        firstname: this.firstname,
        lastname: this.lastname,
        location: this.location,
        website: this.website,
        avatar: this.avatar,
        bio: this.bio
      }
    };
  }

  function comparePassword(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }
    /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  function makeSalt(byteSize, callback) {
    const defaultByteSize = 16;
    /* eslint-disable */
    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }
    /* eslint-enable */
    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        throw err;
      }
      return callback(null, salt.toString('base64'));
    });
  }
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  function authenticate(password, done) {
    if (!done) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        throw err;
      }

      if (this.password === pwdGen) {
        return true;
      } else {
        return false;
      }
    });
  }
  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  function encryptPassword(password, callback) {
    if (!password || !this.salt) {
      return callback ? callback(null) : null;
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    const salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                   .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'SHA1',
      (err, key) => {
        if (err) {
          callback(err);
        }
        return callback(null, key.toString('base64'));
      });
  }
  /**
   * Update password field
   *
   * @param {Function} fn
   * @return {String}
   * @api public
   */
  function updatePassword(fn) {
    // Handle new/update passwords
    if (!this.password) return fn(null);

    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
      fn(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return fn(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          fn(encryptErr);
        }
        this.password = hashedPassword;
        fn(null);
      });
    });
  }
  return User;
};

