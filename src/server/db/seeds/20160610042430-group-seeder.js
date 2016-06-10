module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('groups', [
      {
        id: 1,
        name: 'Admin',
        description: 'Administrator, can perform any actions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Editor',
        description: 'Not quite an Admin, but a part of the staff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'User',
        description: 'An authenticated user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('groups', null, {});
  }
};
