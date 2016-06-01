module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'pages', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('pages');
  }
};
