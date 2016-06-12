import assert from 'assert';
import logger from 'server/lib/logger';

export default (sequelize, DataTypes) => {
  const models = sequelize.models;
  assert(models);

  const UserGroup = sequelize.define('UserGroup', {
    name: DataTypes.TEXT
  }, {
    tableName: 'userGroups',
    classMethods: {
      addUserIdInGroup,
      addUserIdInGroups
    }
  });

  /**
    * Creates in the db userGroup association between group name and userId
    * @param {Array} groups  - Name of the group for which we want to add the user
    * @param {String} userId   -   userId to be added to the group   *
    * @returns {Promise} returns a  Promise containing the results of the upsert
    */
  async function addUserIdInGroups(groups, userId) {
    logger.debug(`addUserIdInGroups user:${userId}, #groups ${groups.length}`);
    for (let group of groups) {// eslint-disable-line
      await UserGroup.addUserIdInGroup(group, userId);
    }
  }
   /**
    * Creates in the db userGroup association between groupname and userId
    * @param {String} groupName  - Name of the group for which we want to add the user
    * @param {String} userId   -   userId to be added to the group   *
    * @returns {Promise} returns a  Promise containing the results of the upsert
    */
  async function addUserIdInGroup(groupName, userId) {
    logger.debug(`addUserIdInGroup user:${userId}, group: ${groupName}`);
    const group = await models.Group.find({
      where: { name: groupName }
    });
    if (!group) {
      const err = { name: 'Group Not Found', message: groupName };
      throw err;
    }
    return UserGroup.upsert({
      groupId: group.get().id,
      userId
    });
  }

  return UserGroup;
};
