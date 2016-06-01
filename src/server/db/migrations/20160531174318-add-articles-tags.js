module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'ArticlesTags', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        tagId: {
          type: DataTypes.INTEGER
        },
        articleId: {
          type: DataTypes.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('ArticlesTags');
  }
};
