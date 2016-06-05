module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tags', [
      {
        id: 1,
        tagname: 'foo',
        description: 'foo tag'
      },
      {
        id: 2,
        tagname: 'bar',
        description: 'bar tag'
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
