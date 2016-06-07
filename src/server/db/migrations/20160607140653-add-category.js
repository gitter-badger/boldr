module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'categories', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        categoryName: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        image: {
          type: DataTypes.STRING(256),
          allowNull: true
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('categories');
  }
};
