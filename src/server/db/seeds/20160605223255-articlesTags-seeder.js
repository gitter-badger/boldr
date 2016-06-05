module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('articlesTags', [
      {
        id: 1,
        articleId: 1,
        tagId: 1
      },
      {
        id: 2,
        articleId: 1,
        tagId: 2
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('articlesTags', null, {});
  }
};
