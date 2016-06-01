module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'articles', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        featureImage: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        content: {
          type: DataTypes.JSONB,
          defaultValue: ''
        },
        markup: {
          type: DataTypes.JSONB,
          defaultValue: '',
          allowNull: true
        },
        authorId: {
          type: DataTypes.INTEGER
        },
        status: {
          type: DataTypes.ENUM('published', 'draft', 'archived'),
          allowNull: false
        },
        views: {
          type: DataTypes.INTEGER,
          defaultValue: 0
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
    return queryInterface.dropTable('articles');
  }
};
