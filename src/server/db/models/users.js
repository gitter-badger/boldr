import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    },
    acl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    google: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
      }
    },

    instanceMethods: {
      comparePassword,
      toJSON,
      checkACL,
      isMod,
      isAdmin,
      isBasic
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

  /**
   * True if user is admin
   */
  function isAdmin() {
    return this.checkACL(User.ACL_ADMIN);
  }

  /**
   * True if user is mod
   */
  function isMod() {
    return this.checkACL(User.ACL_MOD);
  }

  /**
   * True if user is user
   */
  function isBasic() {
    return this.checkACL(User.ACL_BASIC);
  }

  /**
   * Check Users ACL level
   */
  function checkACL(min_acl_level) {
    return this.acl >= min_acl_level;
  }

  return User;
};
