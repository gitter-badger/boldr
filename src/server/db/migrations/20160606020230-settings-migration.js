module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'settings', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        sitename: {
          type: DataTypes.STRING,
          allowNull: true
        },
        url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        logo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        analyticsId: {
          type: DataTypes.STRING,
          allowNull: true
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('settings');
  }
};
