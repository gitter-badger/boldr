module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'articles', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        title: {
          type: DataTypes.STRING(256),
          allowNull: false
        },
        slug: {
          type: DataTypes.STRING(256),
          allowNull: false,
          unique: true
        },
        featureImage: {
          type: DataTypes.STRING(256),
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
          type: DataTypes.ENUM,
          allowNull: false,
          values: ['draft', 'published', 'archived'],
          defaultValue: 'draft'
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
