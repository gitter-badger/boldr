module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'collections', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('collections');
  }
};
