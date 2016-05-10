import Account from './account';
import Article from './article';
import Profile from './profile';
import Group from './group';
import Tag from './tag';

Account.ensureIndex('id');
Account.ensureIndex('email');
Account.ensureIndex('username');

Article.ensureIndex('title');
Article.ensureIndex('isDraft');
Article.ensureIndex('authorId');
Article.ensureIndex('createdAt');
Article.ensureIndex('slug');

Group.ensureIndex('name');

Profile.ensureIndex('accountId');
Profile.ensureIndex('id');

Tag.ensureIndex('id');
Tag.ensureIndex('name');

Account.hasOne(Profile, 'profile', 'id', 'accountId');
Account.hasMany(Article, 'articles', 'id', 'authorId');
Account.hasAndBelongsToMany(Group, 'groups', 'id', 'id');

Article.belongsTo(Account, 'account', 'authorId', 'id');
Article.hasAndBelongsToMany(Tag, 'tag', 'id', 'id');

Group.hasAndBelongsToMany(Account, 'accounts', 'id', 'id');

Profile.belongsTo(Account, 'account', 'accountId', 'id');

Tag.hasAndBelongsToMany(Article, 'articles', 'id', 'id');
