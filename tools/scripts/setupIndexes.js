const async = require('async');
const r = require('server/db');
const config = require('config');

const setupIndexes = () => {
  async.series([
    function buildUserIndexes(callback) {
      r.table('users').indexCreate('email').run();
      r.table('users').indexCreate('username').run();
      r.table('users').indexCreate('roleId').run();
      r.table('users').indexCreate('createdAt').run();
      r.table('users').indexCreate('updatedAt').run();
      callback();
    },
    function buildRoleIndexes(callback) {
      r.table('roles').indexCreate('name').run();
      r.table('roles').indexCreate('members').run();
      callback();
    },
    function buildArticleIndexes(callback) {
      r.table('articles').indexCreate('title').run();
      r.table('articles').indexCreate('slug').run();
      r.table('articles').indexCreate('authorId').run();
      r.table('articles').indexCreate('isDraft').run();
      r.table('articles').indexCreate('createdAt').run();
      r.table('articles').indexCreate('updatedAt').run();
      r.table('articles').indexCreate('tags', {
        multi: true
      }).run();
      callback();
    },
    function buildTagIndexes(callback) {
      r.table('tags').indexCreate('name').run();
      callback();
    },
    function buildArticleTagIndexes(callback) {
      r.table('articles_tags').indexCreate('articleId').run();
      r.table('articles_tags').indexCreate('tagId').run();
      callback();
    },
    function buildMenusIndexes(callback) {
      r.table('menus').indexCreate('name').run();
      r.table('menus').indexCreate('location').run();
      r.table('menus').indexCreate('links').run();
      callback();
    },
    function buildSettingsIndexes(callback) {
      r.table('settings').indexCreate('name').run();
      r.table('settings').indexCreate('global').run();
      callback();
    },
    function buildPagesIndexes(callback) {
      r.table('pages').indexCreate('name').run();
      r.table('pages').indexCreate('slug').run();
      r.table('pages').indexCreate('visibility').run();
      callback();
    },
    function buildCollectionsIndexes(callback) {
      r.table('collections').indexCreate('name').run();
      r.table('collections').indexCreate('slug').run();
      r.table('collections').indexCreate('authorId').run();
      r.table('collections').indexCreate('mediaType').run();
      callback();
    },
    function exit_node(callback) {
      process.exit();
      callback();
    }
  ]);
};
setupIndexes();
