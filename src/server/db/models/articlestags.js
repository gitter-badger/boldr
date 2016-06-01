import Promise from 'bluebird';
import bcrypt from 'bcryptjs';


module.exports = (sequelize, DataTypes) => {
  const ArticlesTags = sequelize.define('ArticlesTags', {
    tagId: {
      type: DataTypes.INTEGER
    },
    articleId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true
  });

  return ArticlesTags;
};
