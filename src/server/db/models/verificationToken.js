export default (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expiresAt: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'verificationTokens',
    classMethods: {
      associate(models) {
        VerificationToken.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'userId',
            allowNull: false
          }
        });
      }
    }
  });
  return VerificationToken;
};
