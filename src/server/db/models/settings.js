import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    name: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
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
