/**
 * boldr/server/db/models/group
 * Group model for Thinky ORM
 *
 * @exports {Object} - Group model
 */

import shortid from 'shortid';
import thinky from '../thinky';
const { type, r } = thinky;

const Group = thinky.createModel('groups', {
  id: type.string().optional(),
  name: type.string(),
  description: type.string().optional(),
  createdAt: type.date().default(new Date())
});

export default Group;
