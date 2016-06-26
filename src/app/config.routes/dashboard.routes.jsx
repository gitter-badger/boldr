import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import DashboardLayout from 'scenes/Dashboard/components/tpl.DashboardLayout';
import DashboardContainer from 'scenes/Dashboard/DashboardContainer';
import ArticlesContainer from 'scenes/Dashboard/Articles/ArticlesContainer';
import CreateArticle from 'scenes/Dashboard/Articles/CreateArticle';
import ArticleList from 'scenes/Dashboard/Articles/ArticleList';
import SettingsContainer from 'scenes/Dashboard/Settings/SettingsContainer';
import PagesContainer from 'scenes/Dashboard/Pages/PagesContainer';
import UsersContainer from 'scenes/Dashboard/Users/UsersContainer';
import CollectionsContainer from 'scenes/Dashboard/Collections/CollectionsContainer';
import UploaderContainer from 'scenes/Dashboard/Uploader/UploaderContainer';

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
