import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import DashboardLayout from 'app/layouts/DashboardLayout';
import DashboardContainer from 'app/scenes/Dashboard';
import ArticlesContainer from 'app/scenes/Dashboard/Articles/ArticlesContainer';
import CreateArticle from 'app/scenes/Dashboard/Articles/CreateArticle';
import ArticleList from 'app/scenes/Dashboard/Articles/ArticleList';
import SettingsContainer from 'app/scenes/Dashboard/Settings/SettingsContainer';
import PagesContainer from 'app/scenes/Dashboard/Pages/PagesContainer';
import UsersContainer from 'app/scenes/Dashboard/Users/UsersContainer';
import CollectionsContainer from 'app/scenes/Dashboard/Collections/CollectionsContainer';
import UploaderContainer from 'app/scenes/Dashboard/Uploader/UploaderContainer';
export default (
  <Route path="/dashboard" component={ DashboardLayout }>
    <IndexRoute component={ DashboardContainer } />
    <Route path="articles" component={ ArticlesContainer }>
      <IndexRoute component={ ArticleList } />
      <Route path="create" component={ CreateArticle } />
    </Route>
    <Route path="settings" component={ SettingsContainer } />
    <Route path="pages" component={ PagesContainer } />
    <Route path="users" component={ UsersContainer } />
    <Route path="collections" component={ CollectionsContainer } />
    <Route path="uploader" component={ UploaderContainer } />
  </Route>
);
