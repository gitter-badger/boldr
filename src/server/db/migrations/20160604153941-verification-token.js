module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'verificationTokens', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false
        },
        expiresAt: DataTypes.DATE,
        userId: {
          type: DataTypes.INTEGER
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('verificationTokens');
  }
};
