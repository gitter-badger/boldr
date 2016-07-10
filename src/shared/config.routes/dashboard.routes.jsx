import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import DashboardLayout from 'scenes/Dashboard/components/tpl.DashboardLayout';
import Dashboard from 'scenes/Dashboard/Dashboard';

function handleError(err) {
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function resolveArticlesComponent(nextState, cb) {
  System.import('scenes/Dashboard/Articles')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
function resolveArticleListComponent(nextState, cb) {
  System.import('scenes/Dashboard/components/pg.ArticleList')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
function resolveArticleEditorComponent(nextState, cb) {
  System.import('scenes/Dashboard/components/pg.ArticleEditor')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
function resolveMediaComponent(nextState, cb) {
  System.import('scenes/Dashboard/Media')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
function resolvePagesComponent(nextState, cb) {
  System.import('scenes/Dashboard/Pages')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
function resolveSettingsComponent(nextState, cb) {
  System.import('scenes/Dashboard/Settings')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
function resolveUsersComponent(nextState, cb) {
  System.import('scenes/Dashboard/Users')
    .then(module => cb(null, module.default))
    .catch(handleError);
}
export default (
  <Route path="/dashboard" component={ DashboardLayout }>
    <IndexRoute component={ Dashboard } />
    <Route path="articles" getComponent={ resolveArticlesComponent }>
      <IndexRoute getComponent={ resolveArticleListComponent } />
      <Route path="editor" getComponent={ resolveArticleEditorComponent } />
    </Route>
    <Route path="media" getComponent={ resolveMediaComponent } />
    <Route path="pages" getComponent={ resolvePagesComponent } />
    <Route path="settings" getComponent={ resolveSettingsComponent } />
    <Route path="users" getComponent={ resolveUsersComponent } />
  </Route>
);
