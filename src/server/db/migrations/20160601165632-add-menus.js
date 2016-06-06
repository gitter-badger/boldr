module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'menus', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.TEXT
        },
        description: {
          type: DataTypes.TEXT
        },
        position: {
          type: DataTypes.TEXT
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('menus');
  }
};
