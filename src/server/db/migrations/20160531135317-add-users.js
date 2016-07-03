module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING
        },
        salt: {
          type: DataTypes.STRING
        },
        firstname: {
          type: DataTypes.STRING(256),
          defaultValue: '',
          allowNull: true
        },
        lastname: {
          type: DataTypes.STRING(256),
          defaultValue: '',
          allowNull: true
        },
        location: {
          type: DataTypes.STRING(256),
          defaultValue: '',
          allowNull: true
        },
        website: {
          type: DataTypes.STRING(256),
          defaultValue: '',
          allowNull: true
        },
        avatar: {
          type: DataTypes.STRING(256),
          defaultValue: '',
          allowNull: true
        },
        bio: {
          type: DataTypes.STRING(512),
          defaultValue: '',
          allowNull: true
        },
        provider: DataTypes.STRING,
        google: {
          type: DataTypes.STRING,
          allowNull: true
        },
        facebook: {
          type: DataTypes.STRING,
          allowNull: true
        },
        twitter: {
          type: DataTypes.STRING,
          allowNull: true
        },
        github: {
          type: DataTypes.STRING,
          allowNull: true
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
