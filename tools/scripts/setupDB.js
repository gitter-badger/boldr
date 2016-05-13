/* eslint-disable no-console */
import async, { eachSeries } from 'async';
import r from 'server/db';
import config from 'config';

const setupDB = () => {
  async.series([
    function initDB(callback) {
      r.dbCreate('boldr_dev').run();
      callback();
    },
    function initUser(callback) {
      r.tableCreate('users').run();
      callback();
    },

    function initRoles(callback) {
      r.tableCreate('roles').run();
      callback();
    },

    function initArticle(callback) {
      r.tableCreate('articles').run();
      callback();
    },

    function initTag(callback) {
      r.tableCreate('tags').run();
      callback();
    },

    function initArticleTags(callback) {
      r.tableCreate('articles_tags').run();
      callback();
    },


    function initMenus(callback) {
      r.tableCreate('menus').run();
      callback();
    },

    function initSettings(callback) {
      r.tableCreate('settings').run();
      callback();
    },
    function initPages(callback) {
      r.tableCreate('pages').run();
      callback();
    },

    function initCollections(callback) {
      r.tableCreate('collections').run();
      callback();
    },
    function exit_node(callback) {
      process.exit();
      callback();
    }
  ]);
};

setupDB();
