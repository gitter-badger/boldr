module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'collections', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM,
          allowNull: false,
          values: ['draft', 'published', 'archived'],
          defaultValue: 'draft'
        },
        showInMenu: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('collections');
  }
};
