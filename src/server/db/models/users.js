import Promise from 'bluebird';
import bcrypt from 'bcryptjs';
import logger from 'server/lib/logger';
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.models;
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING(256),
      defaultValue: '',
      allowNull: true
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
    google: {
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
      getPermissions(email) {
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
            email
          }
        });
      }
    },

    instanceMethods: {
      comparePassword,
      toJSON
    }
  });

  // ACL Enums
  User.ACL_ADMIN = 99; // CRUD all Orgs, CRUD all Users
  User.ACL_MOD = 50; // Edit own Org, CRUD Org Users
  User.ACL_BASIC = 0; // View own Org, View Org Users, Edit Own User

  function toJSON() {
    return {
      id: this.id,
      email: this.email,
      profile: {
        firstName: this.firstName,
        lastName: this.lastName,
        location: this.location,
        website: this.website,
        avatar: this.avatar
      }
    };
  }

  function comparePassword(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }

  return User;
};
