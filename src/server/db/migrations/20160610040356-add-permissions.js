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
        allowNull: false
      },
      resource: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT
      },
      POST: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      GET: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      PUT: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      PATCH: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      DELETE: {
        type: Sequelize.BOOLEAN,
        allowNull: true
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
