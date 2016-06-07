module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'uploads', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        filename: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        originalname: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        mimetype: {
          type: DataTypes.STRING(56),
          allowNull: true
        },
        key: {
          type: DataTypes.STRING(56),
          allowNull: true
        },
        meta: {
          type: DataTypes.JSONB
        },
        size: {
          type: DataTypes.INTEGER
        },
        s3url: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER
        },
        categoryId: {
          type: DataTypes.INTEGER
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
    return queryInterface.dropTable('uploads');
  }
};
