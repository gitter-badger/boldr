module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Tags', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tagname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Tags');
  }
};
