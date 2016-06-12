export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'groups',
    classMethods: {
      findByName,
      getPermissions,
      associate(models) {
        models.User.belongsToMany(Group, {
          through: models.UserGroup,
          foreignKey: 'userId'
        });
        Group.belongsToMany(models.Permission, {
          through: models.GroupPermission,
          foreignKey: 'groupId'
        });
        Group.belongsToMany(models.User, {
          through: models.UserGroup,
          foreignKey: 'groupId'
        });
      }
    }
  });

  const models = sequelize.models;

  function findByName(groupName) {
    return models.Group.find({
      where: {
        name: groupName
      }
    });
  }

  /**
   * Returns all the  permission associated with a group
   *
   * @param {String} groupName  - The name of the group to search
   * @returns {Promise}  a Promise containing permission results
   */
  function getPermissions(groupName) {
    return models.Group.find({
      include: [
        {
          model: models.Permission
        }],
      where: {
        name: groupName
      }
    });
  }
  return Group;
};
