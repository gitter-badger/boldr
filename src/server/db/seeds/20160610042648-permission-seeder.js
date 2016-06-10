module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [
      {
        name: 'Test',
        description: 'Test',
        editContent: true,
        publishContent: true,
        deleteContent: true,
        manageMedia: true,
        manageExtensions: true,
        manageUsers: true,
        manageGroups: true,
        changeSiteSettings: true,
        importExportData: true,
        allPrivilages: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Foo',
        description: 'Foo',
        editContent: true,
        publishContent: false,
        deleteContent: true,
        manageMedia: true,
        manageExtensions: true,
        manageUsers: true,
        manageGroups: true,
        changeSiteSettings: false,
        importExportData: false,
        allPrivilages: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
