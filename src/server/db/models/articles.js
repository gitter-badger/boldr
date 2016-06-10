import Promise from 'bluebird';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    featureImage: {
      type: DataTypes.STRING(256),
      defaultValue: ''
    },
    content: {
      type: DataTypes.JSON,
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
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['draft', 'published', 'archived'],
      defaultValue: 'draft'
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
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
    },
    indexes: [
      {
        fields: ['slug', 'createdAt', 'status']
      }
    ]
  });

  return Article;
};
