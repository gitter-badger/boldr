module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'articlesTags', {
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
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('articlesTags');
  }
};
