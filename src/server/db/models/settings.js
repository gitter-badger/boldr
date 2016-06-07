import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    sitename: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    analyticsId: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'settings',
    classMethods: {
      associate(models) {
      }
    }
  });

  return Settings;
};
