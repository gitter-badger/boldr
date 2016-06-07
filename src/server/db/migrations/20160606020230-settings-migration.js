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
          type: DataTypes.STRING(256),
          allowNull: true
        },
        url: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        logo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        analyticsId: {
          type: DataTypes.STRING(256),
          allowNull: true
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('settings');
  }
};
