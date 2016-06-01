import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    tagname: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false,
    tableName: 'menus',
    classMethods: {
      associate(models) {
      }
    }
  });

  return Menu;
};
