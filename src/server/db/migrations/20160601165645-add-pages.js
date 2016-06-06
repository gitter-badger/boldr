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
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
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
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('pages');
  }
};
