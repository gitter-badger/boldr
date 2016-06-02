import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collections', {
    tagname: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false,
    tableName: 'collections',
    classMethods: {
      associate(models) {
      }
    }
  });

  return Collection;
};
