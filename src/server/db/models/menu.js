export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    position: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false,
    tableName: 'menus',
    classMethods: {
      associate(models) {
      }
    }
  });

  return Menu;
};
