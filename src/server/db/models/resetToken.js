export default (sequelize, DataTypes) => {
  const ResetToken = sequelize.define('ResetToken', {
    token: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'resetPasswordTokens',
    classMethods: {
      associate(models) {
        ResetToken.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'userId',
            allowNull: false
          }
        });
      }
    }
  });
  return ResetToken;
};
