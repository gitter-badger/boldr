export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tags',
    classMethods: {
      associate(models) {
        Tag.belongsToMany(models.Article,
          { through: {
            model: models.ArticlesTags,
            unique: true
          },
          foreignKey: {
            name: 'tagId',
            type: DataTypes.INTEGER,
            allowNull: true
          },
          constraints: false,
          onDelete: 'cascade'
        });
      }
    },
    indexes: [
      {
        fields: ['tagname'], unique: true
      }
    ]
  });

  return Tag;
};
