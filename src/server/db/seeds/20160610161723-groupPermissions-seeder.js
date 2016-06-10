module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('groupPermissions', [
      {
        id: 1,
        groupId: 1,
        permissionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        groupId: 2,
        permissionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('groupPermissions', null, {});
  }
};
