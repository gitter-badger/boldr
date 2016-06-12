module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userGroups', [
      {
        id: 1,
        userId: 1,
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userGroups', null, {});
  }
};
