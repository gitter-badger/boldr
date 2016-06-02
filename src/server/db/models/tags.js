import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagname: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false,
    tableName: 'tags',
    classMethods: {
      associate(models) {
        Tag.belongsToMany(models.Article,
          { through: {
            model: models.ArticlesTags,
            unique: false
          },
          foreignKey: {
            name: 'tagId',
            type: DataTypes.INTEGER,
            allowNull: true
          },
          constraints: false,
          onDelete: 'cascade'
        });
      }
    }
  });

  return Tag;
};
