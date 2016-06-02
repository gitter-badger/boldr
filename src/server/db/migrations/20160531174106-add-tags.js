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
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('tags');
  }
};
