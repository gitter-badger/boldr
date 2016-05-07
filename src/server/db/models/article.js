import thinky from '../thinky';
import shortid from 'shortid';
const { type, r } = thinky;

const Article = thinky.createModel('Article', {
  id: type.string().optional().default(shortid.generate),
  title: type.string(),
  categoryId: type.string().optional(),
  markup: type.string(),
  slug: type.string().min(2),
  featureImage: type.string(),
  tags: [type.string().optional()],
  content: type.string(),
  createdAt: type.date().default(r.now().toEpochTime().mul(1000)),
  updatedAt: type.date().default(r.now().toEpochTime().mul(1000)),
  views: type.number(),
  authorId: type.string(),
  isDraft: type.boolean().default(true)
});

Article.ensureIndex('title');
Article.ensureIndex('createdAt');

export default Article;

const User = require('./user').default;
const Tag = require('./tag').default;

Article.belongsTo(User, 'user', 'authorId', 'id');
Article.hasAndBelongsToMany(Tag, 'tag', 'tags', 'id');
