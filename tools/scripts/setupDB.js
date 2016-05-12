/* eslint-disable no-console */
import r from 'server/db';
import config from 'config';

function initDB() {
  r.dbCreate('boldr_dev').run();
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

initDB();
initUser();
initArticle();
initTag();
initArticleTags();
