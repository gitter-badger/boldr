import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collections', {
    name: {
      type: DataTypes.STRING(20)
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['draft', 'published', 'archived'],
      defaultValue: 'draft'
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
