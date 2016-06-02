module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING
        },
        firstName: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        lastName: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        location: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        website: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        avatar: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        acl: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        resetPasswordToken: {
          type: DataTypes.STRING
        },
        resetPasswordExpires: {
          type: DataTypes.DATE
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      }
    ).then(() =>
      queryInterface.addIndex(
        'users',
        [DataTypes.fn('lower', DataTypes.col('email'))],
        {
          indexName: 'users_email',
          indicesType: 'unique'
        }
      )
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
