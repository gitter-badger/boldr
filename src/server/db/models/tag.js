import thinky from '../thinky';
const { type, r } = thinky;

const Tag = thinky.createModel('tags', {
  id: type.string().optional(),
  name: type.string(),
  description: type.string().optional()
});

Tag.ensureIndex('name');

export default Tag;

const Article = require('./article').default;
Tag.hasAndBelongsToMany(Article, 'articles', 'id', 'id');
