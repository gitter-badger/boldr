import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Pages', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('published', 'draft', 'archived'),
      allowNull: false
    },
    showInMenu: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'pages',
    classMethods: {
      associate(models) {
      }
    }
  });

  return Page;
};
