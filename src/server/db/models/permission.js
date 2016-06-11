import logger from 'server/lib/logger';

module.exports = function(sequelize, DataTypes) {
  const Permission = sequelize.define('Permission', {
    name: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    editContent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publishContent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deleteContent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    manageMedia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    manageExtensions: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    manageUsers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    manageGroups: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    changeSiteSettings: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    importExportData: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allPrivilages: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'permissions',
    classMethods: {
      associate(models) {
        Permission.belongsToMany(models.Group, {
          through: models.GroupPermission,
          foreignKey: 'permissionId'
        });
      },
      findByName
    }
  });

  function findByName(permissionName) {
    return Permission.find({
      where: {
        name: permissionName
      }
    });
  }
  return Permission;
};
