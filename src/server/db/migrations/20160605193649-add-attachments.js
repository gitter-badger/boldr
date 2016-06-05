module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'attachments', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        s3Url: {
          type: DataTypes.STRING,
          allowNull: false
        },
        s3Filename: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        filename: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        s3Metadata: {
          type: DataTypes.JSONB,
          defaultValue: ''
        },
        more: {
          type: DataTypes.JSONB,
          defaultValue: '',
          allowNull: true
        },
        userId: {
          type: DataTypes.INTEGER
        },
        size: {
          type: DataTypes.INTEGER
        },
        mime_type: {
          type: DataTypes.STRING
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('attachments');
  }
};
