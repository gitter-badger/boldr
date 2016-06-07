module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'tags', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tagname: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(256),
          allowNull: true
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('tags');
  }
};
