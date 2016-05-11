/**
 * boldr/server/db/models
 * Definition of secondary indexes and relationships.
 *
 * @exports {Object} - Article model
 * @exports {Object} - Collection model
 * @exports {Object} - Group model
 * @exports {Object} - Page model
 * @exports {Object} - Setting model
 * @exports {Object} - Tag model
 * @exports {Object} - User model
 */

import Article from './article';
import Collection from './collection';
import Group from './group';
import Page from './page';
import Setting from './setting';
import Tag from './tag';
import User from './user';

Article.ensureIndex('title');
Article.ensureIndex('isDraft');
Article.ensureIndex('authorId');
Article.ensureIndex('createdAt');
Article.ensureIndex('slug');

Collection.ensureIndex('name');
Collection.ensureIndex('contentType');

Group.ensureIndex('name');

Tag.ensureIndex('id');
Tag.ensureIndex('name');

User.ensureIndex('id');
User.ensureIndex('email');
User.ensureIndex('username');
User.ensureIndex('createdAt');

Article.belongsTo(User, 'user', 'authorId', 'id');
Article.hasAndBelongsToMany(Tag, 'tag', 'id', 'id');

Group.hasAndBelongsToMany(User, 'users', 'id', 'id');

Tag.hasAndBelongsToMany(Article, 'articles', 'id', 'id');

User.hasMany(Article, 'articles', 'id', 'authorId');
User.hasAndBelongsToMany(Group, 'groups', 'id', 'id');
