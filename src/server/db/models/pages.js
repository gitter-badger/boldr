export default (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['draft', 'published', 'archived'],
      defaultValue: 'draft'
    },
    showInMenu: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'pages',
    classMethods: {
      associate(models) {
      }
    }
  });

  return Page;
};
