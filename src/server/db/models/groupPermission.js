import _ from 'lodash';
import logger from 'server/lib/logger';
module.exports = function(sequelize) {
  const models = sequelize.models;
  const GroupPermission = sequelize.define('GroupPermission', {},
    {
      tableName: 'groupPermissions',
      classMethods: {
        add
      }
    });

  /**
   * Creates in the db all the groupPermissions within permissionsNames associated with the groupName
   *
   * @param {String} groupName  - Name of the group for which we want to add permissions
   * @param {Array} permissionsNames - Array of permissions names linked with the group
   *
   * @returns {Promise} returns a list of Promises results
   */
  async function add(groupName, permissionsNames) {
    logger.debug(`add: group ${groupName}, permissionsNames ${permissionsNames}`);
    const group = await models.Group.findByName(groupName);
    if (!group) {
      const err = {
        name: 'Group Not Found',
        message: groupName
      };
      throw err;
    }
    for (const permission of permissionsNames) {
      logger.debug(`check permission: ${permission}`);
      const permissionFound = await models.Permission.findByName(permission);
      if (!permissionFound) {
        logger.debug('Permission Not Found');
        const err = {
          name: 'Permission Not Found',
          message: permission
        };
        throw err;
      }
      logger.debug(`add: groupId: ${group.get().id}, permissionsId: ${permissionFound.get().id}`);

      await GroupPermission.create({
        groupId: group.get().id,
        permissionId: permissionFound.get().id
      });
    }
  }
  return GroupPermission;
};
