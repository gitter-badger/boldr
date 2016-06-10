module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      editContent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      publishContent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deleteContent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      manageMedia: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      manageExtensions: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      manageUsers: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      manageGroups: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      changeSiteSettings: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      importExportData: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      allPrivilages: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('permissions');
  }
};
