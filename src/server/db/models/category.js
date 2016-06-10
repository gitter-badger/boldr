import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'categories',
    indexes: [
      {
        fields: ['name']
      }
    ],
    classMethods: {
      associate(models) {
        Category.hasMany(models.Upload, {
          foreignKey: 'categoryId'
        });
        Category.hasMany(models.Collection, {
          foreignKey: 'categoryId'
        });
      }
    }
  });

  return Category;
};
