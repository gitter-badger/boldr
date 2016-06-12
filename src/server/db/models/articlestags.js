export default (sequelize, DataTypes) => {
  const ArticlesTags = sequelize.define('ArticlesTags', {
    tagId: {
      type: DataTypes.INTEGER
    },
    articleId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    tableName: 'articlesTags'
  });

  return ArticlesTags;
};
