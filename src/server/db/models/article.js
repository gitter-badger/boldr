/**
 * boldr/server/db/models/article
 * Article model for Thinky ORM
 *
 * @exports {Object} - Article model
 */

import thinky from '../thinky';
import shortid from 'shortid';
const type = thinky.type;
const r = thinky.r;

const Article = thinky.createModel('Article', {
  id: type.string().default(shortid.generate),
  title: type.string(),
  categoryId: type.string().optional(),
  markup: type.string(),
  slug: type.string().min(2),
  featureImage: type.string(),
  content: type.string(),
  createdAt: type.date().default(r.now().toEpochTime().mul(1000)),
  updatedAt: type.date().default(r.now().toEpochTime().mul(1000)),
  views: type.number(),
  userId: type.string().allowNull(false).required(),
  isDraft: type.boolean().default(true)
});

Article.ensureIndex('title');
Article.ensureIndex('isDraft');
Article.ensureIndex('userId');
Article.ensureIndex('createdAt');
Article.ensureIndex('slug');
Article.pre('save', function(next) {
  if (this.isSaved()) {
    return next();
  }
  this.createdAt = thinky.r.now();
  next();
});

Article.relationship = () => {
  Article.belongsTo(thinky.models.User, 'user', 'userId', 'id');
  Article.hasAndBelongsToMany(thinky.models.Tag, 'tags', 'id', 'id');
};

export default Article;
