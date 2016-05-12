/**
 * boldr/server/db/models/tag
 * Tag model for Thinky ORM
 *
 * @exports {Object} - Tag model
 */

import thinky from '../thinky';
const type = thinky.type;
const r = thinky.r;

const Tag = thinky.createModel('Tag', {
  id: type.string(),
  name: type.string(),
  description: type.string().optional()
});

Tag.ensureIndex('id');
Tag.ensureIndex('name');

Tag.relationship = () => {
  Tag.hasAndBelongsToMany(thinky.models.Article, 'articles', 'id', 'id');
};

export default Tag;
