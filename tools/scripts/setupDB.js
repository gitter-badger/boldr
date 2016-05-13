/* eslint-disable no-console */
import r from 'server/db';
import config from 'config';

function initDB() {
  r.dbCreate(config.RDB_DB).run();
}

function initUser() {
  r.tableCreate('users').run().then(() => buildUserIndexes());
}
function buildUserIndexes() {
  r.table('users').indexCreate('email').run();
  r.table('users').indexCreate('username').run();
  r.table('users').indexCreate('createdAt').run();
}

function initArticle() {
  r.tableCreate('articles').run()
  .then(() => buildArticleIndexes());
}

function buildArticleIndexes() {
  r.table('articles').indexCreate('title').run();
  r.table('articles').indexCreate('slug').run();
  r.table('articles').indexCreate('authorId').run();
  r.table('articles').indexCreate('isDraft').run();
  r.table('articles').indexCreate('createdAt').run();
  r.table('articles').indexCreate('updatedAt').run();
  r.table('articles').indexCreate('tags', { multi: true }).run();
  buildArticleRelations();
}

function buildArticleRelations() {
  r.table('articles').eqJoin('authorId', r.table('users')).run();
}

function initTag() {
  r.tableCreate('tags').run().then(() => buildTagIndexes());
}

function buildTagIndexes() {
  r.table('tags').indexCreate('name').run();
}

function initArticleTags() {
  r.tableCreate('articles_tags').run();
}

function initMenus() {
  r.tableCreate('menus').run()
  .then(() => buildMenusIndexes());
}

function buildMenusIndexes() {
  r.table('menus').indexCreate('name').run();
  r.table('menus').indexCreate('location').run();
  r.table('menus').indexCreate('links').run();
}

function initSettings() {
  r.tableCreate('settings').run()
  .then(() => buildSettingsIndexes());
}

function buildSettingsIndexes() {
  r.table('settings').indexCreate('name').run();
  r.table('settings').indexCreate('global').run();
}

function initPages() {
  r.tableCreate('pages').run()
  .then(() => buildPagesIndexes());
}

function buildPagesIndexes() {
  r.table('pages').indexCreate('name').run();
  r.table('pages').indexCreate('slug').run();
  r.table('pages').indexCreate('visibility').run();
}

function initCollections() {
  r.tableCreate('collections').run()
  .then(() => buildCollectionsIndexes());
}

function buildCollectionsIndexes() {
  r.table('collections').indexCreate('name').run();
  r.table('collections').indexCreate('slug').run();
  r.table('collections').indexCreate('authorId').run();
  r.table('collections').indexCreate('mediaType').run();
}

initDB();
initUser();
initArticle();
initTag();
initArticleTags();
initMenus();
initSettings();
initPages();
