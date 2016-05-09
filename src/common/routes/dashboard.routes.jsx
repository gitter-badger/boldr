import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardContainer from '../scenes/Dashboard';
import ArticlesContainer from '../scenes/Dashboard/Articles/ArticlesContainer';
import CreateArticle from '../scenes/Dashboard/Articles/CreateArticle';
import ArticleList from '../scenes/Dashboard/Articles/ArticleList';
import SettingsContainer from '../scenes/Dashboard/Settings/SettingsContainer';

export default (
  <Route path="/dashboard" component={ DashboardLayout }>
    <IndexRoute component={ DashboardContainer} />
    <Route path="articles" component={ ArticlesContainer }>
      <IndexRoute component={ ArticleList} />
      <Route path="create" component={ CreateArticle } />
    </Route>
    <Route path="settings" component={ SettingsContainer } />
  </Route>
);
