module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('resetPasswordTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('resetPasswordTokens');
  }
};
