import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    featureImage: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    content: {
      type: DataTypes.JSONB,
      defaultValue: ''
    },
    markup: {
      type: DataTypes.JSONB,
      defaultValue: '',
      allowNull: true
    },
    authorId: {
      type: DataTypes.INTEGER
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'articles',
    classMethods: {
      associate(models) {
        Article.belongsToMany(models.Tag,
          { through: {
            model: models.ArticlesTags,
            unique: false
          },
          foreignKey: {
            name: 'articleId',
            type: DataTypes.INTEGER,
            allowNull: true
          },
          constraints: false,
          onDelete: 'cascade'
        });
        Article.belongsTo(models.User, {
          foreignKey: 'authorId'
        });
      }
    }
  });

  return Article;
};
