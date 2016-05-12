/**
 * boldr/server/db/models/collection
 * Collection model for Thinky ORM
 *
 * @exports {Object} - Collection model
 */

import shortid from 'shortid';
import thinky from '../thinky';
const type = thinky.type;
const r = thinky.r;

const Collection = thinky.createModel('Collection', {
  id: type.string().optional().default(shortid.generate),
  name: type.string(),
  description: type.string().optional(),
  contentType: type.string(),
  content: type.string(),
  media: type.string()
});

Collection.ensureIndex('name');
Collection.ensureIndex('contentType');

export default Collection;
