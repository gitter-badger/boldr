export default (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      type: DataTypes.STRING(20)
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['draft', 'published', 'archived'],
      defaultValue: 'draft'
    },
    categoryId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    tableName: 'collections',
    classMethods: {
      associate(models) {
        Collection.belongsTo(models.Category, {
          foreignKey: 'categoryId'
        });
      }
    }
  });

  return Collection;
};
