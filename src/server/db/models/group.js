/**
 * boldr/server/db/models/group
 * Group model for Thinky ORM
 *
 * @exports {Object} - Group model
 */

import shortid from 'shortid';
import thinky from '../thinky';
const type = thinky.type;
const r = thinky.r;

const Group = thinky.createModel('Group', {
  id: type.string().optional(),
  name: type.string(),
  description: type.string().optional(),
  createdAt: type.date().default(new Date())
});

Group.ensureIndex('name');

Group.relationship = () => {
  Group.belongsTo(thinky.models.User, 'user', 'userId', 'id');
};

export default Group;
